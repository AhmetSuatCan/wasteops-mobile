// hooks/useOrganization.ts
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { organizationApi } from '../services/api/organization';


interface OrganizationFormData {
  name: string;
  address: string;
  organization_type: 'government' | 'private';
  num_of_facilities: number;
  num_of_cars: number;
  num_of_containers: number;
}

export const useOrganization = () => {
  const [formData, setFormData] = useState<OrganizationFormData>({
    name: '',
    address: '',
    organization_type: 'government', // Default to government
    num_of_facilities: 0,
    num_of_cars: 0,
    num_of_containers: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

   const router = useRouter();
  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await organizationApi.createOrganization(formData);
      // Handle success, for example, navigate to another screen or show a success message
      router.replace('/panel')
      console.log('Organization created:', response);
    } catch (error) {
      setError('Failed to create organization');
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    error,
    handleInputChange,
    handleSubmit,
  };
};

