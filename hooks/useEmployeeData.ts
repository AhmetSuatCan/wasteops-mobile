import { useEffect, useState } from 'react';
import { humanResourcesApi } from '../services/api/human_resources';
import { teamsApi } from '../services/api/teams';
import { shiftApi } from '../services/shifts';
import { useAuthStore } from '../store/authStore';

interface TeamMember {
  id: string;
  assigned_at: string;
  employment_id: number;
  removed_at: string | null;
  role: 'Driver' | 'Collector';
  team_id: number;
  user: {
    id: string;
    name: string;
    email: string;
    gender: 'M' | 'F' | 'O';
    age: number;
    phone_number: string;
    address: string;
    role: 'A' | 'E';
  };
}

interface Team {
  id: string;
  name: string;
  status: string;
  members: TeamMember[];
}

interface Shift {
  id: string;
  name: string;
  route_id: number;
  team_id: number;
  start_time: string;
  end_time: string;
  status: string;
}

interface EmployeeData {
  employmentId: string | null;
  teamId: string | null;
  team: Team | null;
  shifts: Shift[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export const useEmployeeData = (): EmployeeData => {
  const { user, hasOrganization, isLoading: authLoading } = useAuthStore();
  const [employmentId, setEmploymentId] = useState<string | null>(null);
  const [teamId, setTeamId] = useState<string | null>(null);
  const [team, setTeam] = useState<Team | null>(null);
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    // Don't fetch if auth is still loading or if we don't have user/org data
    if (authLoading || !user || !hasOrganization) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // 1. Get employment ID
      const employmentResponse = await humanResourcesApi.getActiveEmploymentId(
        user.id,
        hasOrganization.id
      );
      setEmploymentId(employmentResponse.employment_id);

      // 2. Get team ID
      const teamResponse = await teamsApi.getActiveTeamId(employmentResponse.employment_id);
      setTeamId(teamResponse.team_id);

      // 3. Get team details and members
      const teamDetails = await teamsApi.getTeam(teamResponse.team_id);
      const teamMembers = await teamsApi.getTeamMembers(teamResponse.team_id);
      console.log('Team members data:', teamMembers);
      setTeam({
        ...teamDetails,
        members: teamMembers,
      });

      // 4. Get shifts for the team
      const teamShifts = await shiftApi.getShiftsForTeam(teamResponse.team_id);
      setShifts(teamShifts);

    } catch (err) {
      console.error('Error fetching employee data:', err);
      setError('Failed to fetch employee data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user, hasOrganization, authLoading]);

  return {
    employmentId,
    teamId,
    team,
    shifts,
    loading: loading || authLoading, // Consider auth loading as part of our loading state
    error,
    refresh: fetchData,
  };
}; 