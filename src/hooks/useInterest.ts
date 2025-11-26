import { api } from '../lib/axios';
import { useState, useCallback } from 'react';

export const useInterest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendInterest = useCallback(async (receiverId: string, message: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post('/interests/send', { receiverId, message });
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error sending interest');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getReceivedInterests = useCallback(async (page = 1, limit = 10) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get('/interests/received', {
        params: { page, limit }
      });
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error getting received interests');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getSentInterests = useCallback(async (page = 1, limit = 10) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get('/interests/sent', {
        params: { page, limit }
      });
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error getting sent interests');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const respondToInterest = useCallback(async (interestId: string, status: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.put(`/interests/${interestId}/respond`, { status });
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error responding to interest');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const withdrawInterest = useCallback(async (interestId: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.delete(`/interests/${interestId}`);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error withdrawing interest');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    sendInterest,
    getReceivedInterests,
    getSentInterests,
    respondToInterest,
    withdrawInterest
  };
};