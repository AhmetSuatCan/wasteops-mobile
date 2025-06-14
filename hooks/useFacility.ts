import { useState } from 'react';
import { organizationApi } from '../services/api/organization';

export interface Facility {
  id: string;
  name: string;
  facility_type: 'recycling' | 'treatment';
  address: string;
  capacity: number;
  contact_info?: string;
  operating_hours?: string;
  organization: string;
}

export const useFacility = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createFacility = async (facilityData: {
    name: string;
    facility_type: 'recycling' | 'treatment';
    address: string;
    capacity: number;
    contact_info?: string;
    operating_hours?: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await organizationApi.createFacility({
        name: facilityData.name,
        address: facilityData.address,
        facility_type: facilityData.facility_type,
        capacity: facilityData.capacity,
        contact_info: facilityData.contact_info,
        operating_hours: facilityData.operating_hours
      });
      return response;
    } catch (err) {
      setError('Failed to create facility');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateFacility = async (id: string, facilityData: {
    name: string;
    facility_type: 'recycling' | 'treatment';
    address: string;
    capacity: number;
    contact_info?: string;
    operating_hours?: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await organizationApi.updateFacility(id, {
        name: facilityData.name,
        address: facilityData.address,
        facility_type: facilityData.facility_type,
        capacity: facilityData.capacity,
        contact_info: facilityData.contact_info,
        operating_hours: facilityData.operating_hours
      });
      return response;
    } catch (err) {
      setError('Failed to update facility');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteFacility = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await organizationApi.deleteFacility(id);
    } catch (err) {
      setError('Failed to delete facility');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getFacilities = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await organizationApi.getFacilities();
      return response;
    } catch (err) {
      setError('Failed to fetch facilities');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    createFacility,
    updateFacility,
    deleteFacility,
    getFacilities,
    loading,
    error,
  };
};
