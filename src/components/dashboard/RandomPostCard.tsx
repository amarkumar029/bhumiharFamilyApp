import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { formatDistanceToNow } from "date-fns";
import { useGetRandomPosts } from "../../lib/react-query/queries";
import ProfileImage from "../global/ProfileImage";
import { API_BASE_URL } from "../../constants";

export default function RandomPostCard() {
  const navigation = useNavigation();
  const { data: posts, isLoading } = useGetRandomPosts();

  const truncate = (txt: string, len: number) =>
    txt?.length > len ? txt.substring(0, len) + "..." : txt;

  if (isLoading)
    return (
      <View style={styles.card}>
        <Text style={styles.header}>Random Posts</Text>
        <ActivityIndicator size="large" style={{ marginTop: 20 }} />
      </View>
    );

  if (!posts || posts.length === 0)
    return (
      <View style={styles.card}>
        <Text style={styles.header}>Random Posts</Text>
        <Text style={styles.noPost}>No posts found</Text>
      </View>
    );

  return (
    <View style={styles.card}>
      <Text style={styles.header}>Random Posts</Text>

      <FlatList
        data={posts.slice(0, 4)}
        numColumns={2}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={{ gap: 10 }}
        contentContainerStyle={{ gap: 10 }}
        renderItem={({ item: post }) => (
          <TouchableOpacity
            style={styles.postBox}
            onPress={() =>
              navigation.navigate("PostDetails", { id: post.id })
            }
          >
            {/* Author */}
            <View style={styles.row}>
              <ProfileImage
                fullName={post.author.fullName}
                image={post.author.image}
              />

              <View style={{ flex: 1 }}>
                <Text style={styles.author} numberOfLines={1}>
                  {post.author.fullName}
                </Text>

                <Text style={styles.time}>
                  {formatDistanceToNow(new Date(post.createdAt), {
                    addSuffix: true,
                  })}
                </Text>
              </View>
            </View>

            {/* Image or Text */}
            {post.image || post.metaImage ? (
              <Image
                source={{
                  uri: post.image
                    ? `${API_BASE_URL}/${post.image.replace(/\\/g, "/")}`
                    : post.metaImage,
                }}
                style={styles.image}
              />
            ) : (
              <View style={styles.textBox}>
                <Text style={styles.textContent} numberOfLines={5}>
                  {truncate(post.content, 200)}
                </Text>
              </View>
            )}

            {/* Stats */}
            <View style={styles.stats}>
              <Text style={styles.statItem}>❤️ {post.likesCount}</Text>
              <Text style={styles.statItem}>💬 {post.commentsCount}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e5e5",
  },
  header: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    alignItems: "center",
  },
  noPost: {
    textAlign: "center",
    color: "#777",
    marginVertical: 30,
  },
  postBox: {
    flex: 1,
    height: 220,
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 8,
  },
  row: {
    flexDirection: "row",
    marginBottom: 6,
    alignItems: "center",
    gap: 8,
  },
  author: {
    fontWeight: "600",
    fontSize: 12,
  },
  time: {
    fontSize: 10,
    color: "#777",
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 6,
    backgroundColor: "#eee",
    marginBottom: 6,
  },
  textBox: {
    backgroundColor: "#f2f2f2",
    height: 120,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    padding: 6,
    marginBottom: 6,
  },
  textContent: {
    fontSize: 12,
    color: "#444",
    textAlign: "center",
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statItem: {
    fontSize: 12,
  },
});
