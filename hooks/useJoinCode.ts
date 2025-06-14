import { humanResourcesApi } from '@/services/api/human_resources';
import { useState } from 'react';

interface JoinCode {
  id: string;
  code: string;
  createdAt: Date;
  expires_at: string;
  used: boolean;
  usedBy?: string;
  usedAt?: Date;
}

interface UseJoinCodeReturn {
  codes: JoinCode[];
  loading: boolean;
  error: string | null;
  generateCode: () => Promise<{ code: string }>;
  getCodes: () => Promise<void>;
  useCode: (code: string) => Promise<void>;
  expireCode: (code: string) => Promise<void>;
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
      console.log('Generated code response:', response);
      await getCodes();
      return response;
    } catch (err) {
      console.error('Error generating code:', err);
      setError('Failed to generate code');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getCodes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await humanResourcesApi.getCodes();
      console.log('Fetched codes:', response);
      setCodes(response);
    } catch (err) {
      console.error('Error fetching codes:', err);
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

  const expireCode = async (code: string) => {
    setLoading(true);
    setError(null);
    try {
      await humanResourcesApi.expireCode(code);
      console.log('Code expired:', code);
      await getCodes();
    } catch (err) {
      console.error('Error expiring code:', err);
      setError('Failed to expire join code');
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
    expireCode,
  };
}; 