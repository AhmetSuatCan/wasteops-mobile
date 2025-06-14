import { useState } from 'react';
import { organizationApi } from '../services/api/organization';

interface TruckData {
  license_plate: string;
  car_type: string;
  capacity: number;
  status: string;
  location: string;
}

export const useTruck = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getTrucks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await organizationApi.getTrucks();
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch trucks');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createTruck = async (truckData: TruckData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await organizationApi.createTruck(truckData);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create truck');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateTruck = async (truckId: string, truckData: TruckData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await organizationApi.updateTruck(truckId, truckData);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update truck');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteTruck = async (truckId: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await organizationApi.deleteTruck(truckId);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete truck');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    getTrucks,
    createTruck,
    updateTruck,
    deleteTruck,
    loading,
    error,
  };
};
