import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Heart, Reply } from "lucide-react-native";
import ProfileImage from "./ProfileImage";
import PostComment from "./PostComment";
import { CommentReplies } from "./CommentReplies";
import { formatDistanceToNow } from "date-fns";
import { getInfiniteComments } from "../../lib/react-query/queries";
import { useLikeComment, useReplyToComment } from "../../lib/react-query/mutation";

interface CommentsProps {
  postId: string;
}

export const Comments: React.FC<CommentsProps> = ({ postId }) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    getInfiniteComments(postId);

  const { isPending: isReplying, mutate: mutateCommentReply } =
    useReplyToComment();
  const { isPending: isLiking, mutate: mutateLikeComment } = useLikeComment();

  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [expandedCommentIds, setExpandedCommentIds] = useState<string[]>([]);

  const comments = data?.pages.flatMap((page) => page.comments) || [];

  const handleLikeComment = (commentId: string) => {
    mutateLikeComment(commentId);
  };

  const handleReply = (commentId: string, content: string) => {
    mutateCommentReply({ commentId, content });
    setReplyingTo(null);
  };

  const toggleReply = (commentId: string) => {
    setReplyingTo((prev) => (prev === commentId ? null : commentId));
  };

  const toggleReplies = (commentId: string) => {
    setExpandedCommentIds((prev) =>
      prev.includes(commentId)
        ? prev.filter((id) => id !== commentId)
        : [...prev, commentId]
    );
  };

  const renderComment = useCallback(
    ({ item: comment }) => {
      const isExpanded = expandedCommentIds.includes(comment.id);

      return (
        <View style={styles.commentContainer}>
          <View style={styles.row}>
            <ProfileImage fullName={comment.author.fullName} image={comment.author.image} />
            <View style={styles.contentWrapper}>
              <Text style={styles.authorName}>{comment.author.fullName}</Text>
              <Text style={styles.commentText}>{comment.content}</Text>

              <View style={styles.actionsRow}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleLikeComment(comment.id)}
                  disabled={isLiking}
                >
                  <Heart size={16} color={comment.isLiked ? "red" : "gray"} fill={comment.isLiked ? "red" : "none"} />
                  <Text style={styles.actionText}>{comment.likesCount}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => toggleReply(comment.id)}
                >
                  <Reply size={16} color="gray" />
                  <Text style={styles.actionText}>Reply</Text>
                </TouchableOpacity>

                {comment.repliesCount > 0 && (
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => toggleReplies(comment.id)}
                  >
                    <Text style={styles.actionText}>
                      {comment.repliesCount} Replies
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              {replyingTo === comment.id && (
                <PostComment
                  onSubmit={(content) => handleReply(comment.id, content)}
                  loading={isReplying}
                  placeholder={`Reply to ${comment.author.fullName}...`}
                />
              )}

              {isExpanded && (
                <View style={styles.repliesWrapper}>
                  {comment.replies && comment.replies.length > 0 ? (
                    comment.replies.map((reply: any) => (
                      <CommentReplies
                        key={reply.id}
                        comment={reply}
                        onLike={() => handleLikeComment(reply.id)}
                        loading={isLiking}
                      />
                    ))
                  ) : (
                    <Text style={styles.noRepliesText}>No replies yet</Text>
                  )}
                </View>
              )}
            </View>

            <Text style={styles.timeText}>
              {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
            </Text>
          </View>
        </View>
      );
    },
    [replyingTo, expandedCommentIds, isLiking, isReplying]
  );

  if (comments.length === 0 && !hasNextPage) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>No Comments Yet!</Text>
        <Text style={styles.emptyText}>
          Be the first to comment on this post.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={comments}
      keyExtractor={(item) => item.id}
      renderItem={renderComment}
      onEndReached={() => {
        if (hasNextPage) fetchNextPage();
      }}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        isFetchingNextPage ? <ActivityIndicator size="small" /> : null
      }
      contentContainerStyle={{ paddingBottom: 16 }}
    />
  );
};

const styles = StyleSheet.create({
  commentContainer: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginVertical: 4,
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
  actionsRow: {
    flexDirection: "row",
    marginTop: 6,
    gap: 12,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  actionText: {
    fontSize: 12,
    color: "#4B5563",
  },
  repliesWrapper: {
    marginTop: 8,
    paddingLeft: 16,
  },
  noRepliesText: {
    fontSize: 12,
    color: "#6B7280",
  },
  timeText: {
    fontSize: 10,
    color: "#6B7280",
    marginLeft: 4,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1D4ED8",
  },
  emptyText: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 4,
  },
});
