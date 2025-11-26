import { useState, useCallback } from 'react';
import { api } from '@/lib/axios'; // Make sure your axios instance works in RN

export const useReport = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createReport = useCallback(async (reportedId: string, reason: string, description: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/reports', {
        reportedId,
        reason,
        description,
      });
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error creating report');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getUserReports = useCallback(async (page = 1, limit = 10) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/reports', {
        params: { page, limit },
      });
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error getting user reports');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateReportStatus = useCallback(async (reportId: string, status: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.put(`/reports/${reportId}/status`, { status });
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error updating report status');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getReportsByStatus = useCallback(async (status: string, page = 1, limit = 10) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/reports/status/${status}`, {
        params: { page, limit },
      });
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error getting reports by status');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    createReport,
    getUserReports,
    updateReportStatus,
    getReportsByStatus,
  };
};
