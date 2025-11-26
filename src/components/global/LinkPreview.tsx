import React, { useState, useEffect, useCallback } from "react";
import { View, Text, Image, ActivityIndicator, StyleSheet } from "react-native";
import { api } from "../../lib/axios";
import type { IMetaData } from "../../types/meta";

interface LinkPreviewProps {
  url: string;
  hideImage?: boolean;
  setMetaData: (data: IMetaData) => void;
  metadata: IMetaData | null;
}

export function LinkPreview({ url, hideImage = false, metadata, setMetaData }: LinkPreviewProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMetadata = useCallback(async (url: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api(`/url?url=${url}`);
      if (!response.data.success) {
        throw new Error("Failed to fetch link preview");
      }
      setMetaData(response.data.data);
    } catch (err) {
      setError("Failed to load link preview");
    } finally {
      setLoading(false);
    }
  }, [setMetaData]);

  useEffect(() => {
    if (url) {
      fetchMetadata(url);
    }
  }, [url, fetchMetadata]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="small" color="#6B7280" style={{ marginBottom: 8 }} />
        <ActivityIndicator size="small" color="#6B7280" style={{ marginBottom: 8 }} />
        {!hideImage && <ActivityIndicator size="large" color="#6B7280" style={{ height: 128, width: "100%" }} />}
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!metadata) return null;

  const imageUrl = metadata.og?.image || metadata.twitter?.image;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{metadata.title}</Text>
      <Text style={styles.description}>{metadata.description}</Text>
      {!hideImage && imageUrl && (
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff",
  },
  title: {
    fontWeight: "600",
    marginBottom: 6,
    fontSize: 16,
    color: "#111827",
  },
  description: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 6,
  },
  image: {
    width: "100%",
    height: 128,
    borderRadius: 8,
  },
  errorText: {
    color: "#EF4444",
  },
});