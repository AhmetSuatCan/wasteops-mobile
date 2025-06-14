import { useState } from 'react';
import { humanResourcesApi } from '../services/api/human_resources';

interface User {
  id: string;
  name: string;
  gender: 'M' | 'F' | 'O';
  email: string;
  age: number;
  phone_number: string;
  address: string;
}

interface Employee {
  id: number;
  user: User;
  start_date: string;
  created_at: string;
}

interface UseEmploymentReturn {
  employees: Employee[];
  loading: boolean;
  error: string | null;
  getEmployees: () => Promise<void>;
  terminateEmployment: (employeeId: string) => Promise<void>;
}

export const useEmployment = (): UseEmploymentReturn => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getEmployees = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await humanResourcesApi.getEmployees();
      setEmployees(response);
    } catch (err) {
      setError('Failed to fetch employees');
    } finally {
      setLoading(false);
    }
  };

  const terminateEmployment = async (employeeId: string) => {
    setLoading(true);
    setError(null);
    try {
      await humanResourcesApi.endEmployment(employeeId);
      setEmployees(prev => prev.filter(emp => emp.user.id !== employeeId));
    } catch (err) {
      setError('Failed to terminate employment');
    } finally {
      setLoading(false);
    }
  };

  return {
    employees,
    loading,
    error,
    getEmployees,
    terminateEmployment,
  };
};
