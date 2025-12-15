import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { API_BASE_URL } from "../../constants";
import { calculateAge } from "../../lib/utils";

const ProfileDetails = ({ profile }: { profile: any }) => {

  const parseJSON = (field: string | null) => {
    if (!field) return null;
    try {
      return typeof field === "string" ? JSON.parse(field) : field;
    } catch {
      return null;
    }
  };

  const formatDate = (date: string | null) => {
    if (!date) return null;
    return new Date(date).toDateString();
  };

  const renderChips = (items: any[]) => {
    if (!items || !Array.isArray(items)) return null;
    return (
      <View style={styles.chipContainer}>
        {items.map((item, index) => (
          <View key={index} style={styles.chip}>
            <Text style={styles.chipText}>
              {typeof item === "object"
                ? `${item.gender} - ${item.maritalStatus}`
                : item}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  const currentLocation = parseJSON(profile.currentLocation);
  const hobbies = parseJSON(profile.hobbies);
  const skills = parseJSON(profile.skills);
  const matrimonialImages = parseJSON(profile.matrimonialImages);

  const InfoRow = ({ label, value }: { label: string; value: string | null }) =>
    value ? (
      <View style={styles.row}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    ) : null;

  const InfoCard = ({
    title,
    icon,
    children,
  }: {
    title: string;
    icon: string;
    children: React.ReactNode;
  }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Icon name={icon} size={18} color="#2563EB" />
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
      {children}
    </View>
  );

  return (
    <ScrollView style={styles.container}>

      {/* Header */}
      <View style={styles.headerCard}>
        <View style={styles.cover} />
        <View style={styles.profileRow}>
          {profile.image ? (
            <Image
              source={{
                uri: `${API_BASE_URL}/${profile.image.replace(/\\/g, "/")}`,
              }}
              style={styles.avatar}
            />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>
                {profile.fullName?.[0] ?? "U"}
              </Text>
            </View>
          )}

          <View style={{ flex: 1 }}>
            <Text style={styles.name}>
              {profile.fullName || "Anonymous User"}
            </Text>

            <View style={styles.inline}>
              {profile.email && (
                <Text style={styles.inlineText}>
                  <Icon name="mail" size={14} /> {profile.email}
                </Text>
              )}
            </View>

            {currentLocation && (
              <Text style={styles.inlineText}>
                <Icon name="map-pin" size={14} />{" "}
                {currentLocation.city || "Location"}
              </Text>
            )}
          </View>
        </View>
      </View>

      {/* Personal Info */}
      <InfoCard title="Personal Information" icon="user">
        <InfoRow label="DOB" value={formatDate(profile.dateOfBirth)} />
        {profile.dateOfBirth && (
          <InfoRow
            label="Age"
            value={`${calculateAge(profile.dateOfBirth)} years`}
          />
        )}
        <InfoRow label="Gender" value={profile.gender} />
        <InfoRow label="Caste" value={profile.caste} />
      </InfoCard>

      {/* Professional Info */}
      <InfoCard title="Professional Information" icon="briefcase">
        <InfoRow label="Profession" value={profile.profession} />
        <InfoRow label="Role" value={profile.currentJobRole} />
        <InfoRow label="Experience" value={profile.workExperience} />
      </InfoCard>

      {/* Interests */}
      {(hobbies || skills) && (
        <InfoCard title="Community & Interests" icon="users">
          {hobbies && (
            <>
              <Text style={styles.sectionTitle}>Hobbies</Text>
              {renderChips(hobbies)}
            </>
          )}
          {skills && (
            <>
              <Text style={styles.sectionTitle}>Skills</Text>
              {renderChips(skills)}
            </>
          )}
        </InfoCard>
      )}

      {/* Matrimonial Images */}
      {matrimonialImages?.length > 0 && (
        <InfoCard title="Additional Photos" icon="heart">
          <FlatList
            data={matrimonialImages}
            numColumns={3}
            scrollEnabled={false}
            keyExtractor={(_, i) => String(i)}
            renderItem={({ item }) => (
              <Image
                source={{
                  uri: `${API_BASE_URL}/${item.replace(/\\/g, "/")}`,
                }}
                style={styles.photo}
              />
            )}
          />
        </InfoCard>
      )}

      {/* Bio */}
      {profile.bioData && (
        <InfoCard title="Bio" icon="file-text">
          <Text style={styles.bio}>{profile.bioData}</Text>
        </InfoCard>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    padding: 12,
  },
  headerCard: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    marginBottom: 12,
    overflow: "hidden",
  },
  cover: {
    height: 100,
    backgroundColor: "#2563EB",
  },
  profileRow: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginRight: 16,
  },
  avatarPlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#CBD5E1",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "700",
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 6,
  },
  inlineText: {
    fontSize: 13,
    color: "#4B5563",
    marginTop: 2,
  },
  card: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  row: {
    marginBottom: 8,
  },
  label: {
    fontWeight: "600",
    color: "#374151",
  },
  value: {
    color: "#6B7280",
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  chip: {
    backgroundColor: "#E5E7EB",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 6,
    marginBottom: 6,
  },
  chipText: {
    fontSize: 12,
    color: "#374151",
  },
  sectionTitle: {
    fontWeight: "600",
    marginBottom: 6,
  },
  photo: {
    width: "30%",
    aspectRatio: 1,
    borderRadius: 6,
    margin: "1.5%",
  },
  bio: {
    color: "#4B5563",
    lineHeight: 20,
  },
});

export default ProfileDetails;