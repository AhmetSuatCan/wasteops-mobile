import { humanResourcesApi } from '@/services/api/human_resources';
import { useState } from 'react';

interface JoinCode {
  id: string;
  code: string;
  createdAt: Date;
  used: boolean;
  usedBy?: string;
  usedAt?: Date;
}

interface UseJoinCodeReturn {
  codes: JoinCode[];
  loading: boolean;
  error: string | null;
  generateCode: () => Promise<void>;
  getCodes: () => Promise<void>;
  useCode: (code: string) => Promise<void>;
}

export const useJoinCode = (): UseJoinCodeReturn => {
  const [codes, setCodes] = useState<JoinCode[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateCode = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await humanResourcesApi.generateCode();
      setCodes(prev => [...prev, response.data]);
    } catch (err) {
      setError('Failed to generate code');
    } finally {
      setLoading(false);
    }
  };

  const getCodes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await humanResourcesApi.getCodes();
      setCodes(response.data);
    } catch (err) {
      setError('Failed to fetch codes');
    } finally {
      setLoading(false);
    }
  };

  const useCode = async (code: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await humanResourcesApi.useCode(code);
      console.log(response)
      // Update the code status in the list
      setCodes(prev => prev.map(c => 
        c.code === code ? { ...c, used: true, usedAt: new Date() } : c
      ));
    } catch (err) {
      setError('Failed to use join code');
    } finally {
      setLoading(false);
    }
  };

  return {
    codes,
    loading,
    error,
    generateCode,
    getCodes,
    useCode,
  };
}; 