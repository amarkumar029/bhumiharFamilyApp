import React from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

import { PostCard } from "../../components/global/PostCard";
import PostComment from "../../components/global/PostComment";
import { Comments } from "../../components/global/Comments";

import {
  useCommentOnPost,
  useLikePost,
  useDeletePost,
} from "../../lib/react-query/mutation";
import { usePostById } from "../../lib/react-query/queries";
import { RootState } from "../../store";

export default function Post() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { id } = route.params || {};

  const { user } = useSelector((state: RootState) => state.auth);

  const { data, error, isLoading } = usePostById(id);

  const { mutate: likePost } = useLikePost();
  const { mutate: commentOnPost, isLoading: commenting } = useCommentOnPost();
  const { mutate: deletePost } = useDeletePost();

  if (!id) return null;

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error || !data?.post) {
    return (
      <View style={styles.container}>
        <Alert
          title="Post Not Found"
          message="Invalid Post ID. Please go back."
          buttons={[
            {
              text: "Go Back",
              onPress: () => navigation.goBack(),
            },
          ]}
        />
      </View>
    );
  }

  const onSubmit = (content: string) => {
    commentOnPost({
      content,
      postId: data.post.id,
    });
  };

  const onLike = () => {
    likePost(data.post.id);
  };

  const onDelete = () => {
    Alert.alert(
      "Delete Post",
      "Are you sure you want to delete this post?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deletePost(data.post.id);
            navigation.goBack();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <PostCard
        post={data.post}
        onLike={onLike}
        showActions
        onDelete={onDelete}
      />

      <PostComment
        id={data.post.id}
        image={user?.image || ""}
        fullName={user?.fullName || user?.email || "N/A"}
        onSubmit={onSubmit}
        loading={commenting}
      />

      <Comments postId={data.post.id} />
    </View>
  );
}

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});