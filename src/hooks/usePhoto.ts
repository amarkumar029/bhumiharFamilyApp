import { api } from '@/lib/axios';
import { useState, useCallback } from 'react';

export const usePhoto = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadPhotos = useCallback(async (files: { uri: string; name: string; type: string }[], isPrivate: boolean = false) => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();

      files.forEach(file => {
        formData.append('photos', {
          uri: file.uri,
          name: file.name,
          type: file.type,
        } as any);
      });

      formData.append('isPrivate', String(isPrivate));

      const response = await api.post('/photos', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error uploading photos');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getUserPhotos = useCallback(async (userId: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get(`/photos/${userId}`);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error getting user photos');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updatePhotoPrivacy = useCallback(async (photoId: string, isPrivate: boolean) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.put(`/photos/${photoId}/privacy`, { isPrivate });
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error updating photo privacy');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const deletePhoto = useCallback(async (photoId: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.delete(`/photos/${photoId}`);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error deleting photo');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const setProfilePicture = useCallback(async (photoId: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.put(`/photos/${photoId}/profile-picture`);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error setting profile picture');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    uploadPhotos,
    getUserPhotos,
    updatePhotoPrivacy,
    deletePhoto,
    setProfilePicture,
  };
};
