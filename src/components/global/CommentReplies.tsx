import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Heart } from "lucide-react-native"; // RN-compatible icons
import ProfileImage from "./ProfileImage";
import { formatDistanceToNow } from "date-fns";

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  likesCount: number;
  isLiked: boolean;
  author: {
    fullName: string;
    image?: string | null;
  };
}

interface CommentRepliesProps {
  comment: Comment;
  onLike: (commentId: string) => void;
  loading?: boolean;
}

export const CommentReplies: React.FC<CommentRepliesProps> = ({ comment, onLike, loading }) => {
  return (
    <View style={styles.container}>
      <View style={styles.commentBox}>
        <View style={styles.row}>
          <ProfileImage fullName={comment.author.fullName} image={comment.author.image} />

          <View style={styles.contentWrapper}>
            <Text style={styles.authorName}>{comment.author.fullName}</Text>
            <Text style={styles.commentText}>{comment.content}</Text>

            <TouchableOpacity
              style={styles.likeButton}
              onPress={() => onLike(comment.id)}
              disabled={loading}
            >
              <Heart
                size={16}
                color={comment.isLiked ? "red" : "gray"}
                fill={comment.isLiked ? "red" : "none"}
              />
              <Text style={styles.likeCount}>{comment.likesCount}</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.time}>
            {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    marginTop: 8,
  },
  commentBox: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  contentWrapper: {
    flex: 1,
  },
  authorName: {
    fontWeight: "600",
    fontSize: 14,
    marginBottom: 4,
  },
  commentText: {
    color: "#4B5563",
    fontSize: 14,
  },
  likeButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    gap: 4,
  },
  likeCount: {
    fontSize: 12,
    color: "#4B5563",
  },
  time: {
    fontSize: 10,
    color: "#6B7280",
    marginLeft: 4,
  },
});