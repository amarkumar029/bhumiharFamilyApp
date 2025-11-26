import React, { useEffect, useMemo, useState } from "react"
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Linking,
  LayoutAnimation,
} from "react-native"
import { formatDistanceToNow } from "date-fns"
import {
  Heart,
  MessageCircle,
  Share2,
  MoreVertical,
  ChevronDown,
  ChevronUp,
} from "lucide-react-native"
import { useSelector } from "react-redux"
import { RootState } from "@/store"
import { API_BASE_URL } from "@/constants"
import { Post } from "@/types"
import ProfileImage from "./ProfileImage"
import { useNavigation } from "@react-navigation/native"

interface PostCardProps {
  post: Post
  isListItem?: boolean
  onContentClick?: () => void
  onLike?: () => void
  showActions?: boolean
  onDelete?: (postId: string) => void
}

export const PostCard = ({
  post,
  isListItem = false,
  onContentClick,
  onLike,
  showActions = true,
  onDelete,
}: PostCardProps) => {
  const navigation = useNavigation<any>()
  const { user } = useSelector((state: RootState) => state.auth)

  const isAuthor = user?.id === post.author?.id
  const [expanded, setExpanded] = useState(false)

  const imageUrl = post.image
    ? `${API_BASE_URL}/${post.image.replace(/\\/g, "/")}`
    : null

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setExpanded(!expanded)
  }

  const renderTextWithLinks = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g
    return text.split(urlRegex).map((part, index) =>
      urlRegex.test(part) ? (
        <Text
          key={index}
          style={styles.link}
          onPress={() => Linking.openURL(part)}>
          {part}
        </Text>
      ) : (
        <Text key={index}>{part}</Text>
      )
    )
  }

  return (
    <View style={styles.card}>
      {/* Header */}
      <Pressable
        style={styles.header}
        onPress={() =>
          navigation.navigate("Profile", { userId: post.author?.id })
        }>
        <ProfileImage
          fullName={post.author?.fullName ?? "User"}
          image={post.author?.image}
          size={40}
        />

        <View style={styles.headerText}>
          <Text style={styles.name}>{post.author?.fullName}</Text>
          <Text style={styles.time}>
            {formatDistanceToNow(new Date(post.createdAt), {
              addSuffix: true,
            })}
          </Text>
        </View>

        {isAuthor && (
          <Pressable
            onPress={() => onDelete?.(post.id)}
            hitSlop={10}>
            <MoreVertical size={18} color="#6b7280" />
          </Pressable>
        )}
      </Pressable>

      {/* Content */}
      <Pressable onPress={onContentClick}>
        {post.content && (
          <View style={styles.content}>
            <Text
              numberOfLines={expanded ? undefined : 5}
              style={styles.text}>
              {renderTextWithLinks(post.content)}
            </Text>

            {post.content.length > 200 && (
              <Pressable onPress={toggleExpand} style={styles.expand}>
                {expanded ? (
                  <>
                    <ChevronUp size={16} />
                    <Text>Show Less</Text>
                  </>
                ) : (
                  <>
                    <ChevronDown size={16} />
                    <Text>Show More</Text>
                  </>
                )}
              </Pressable>
            )}
          </View>
        )}

        {/* Image */}
        {imageUrl && (
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
      </Pressable>

      {/* Actions */}
      {showActions && (
        <View style={styles.actions}>
          <Pressable style={styles.action} onPress={onLike}>
            <Heart
              size={16}
              color={post.isLiked ? "red" : "#374151"}
              fill={post.isLiked ? "red" : "transparent"}
            />
            <Text>{post.likesCount}</Text>
          </Pressable>

          {isListItem && (
            <Pressable
              style={styles.action}
              onPress={onContentClick}>
              <MessageCircle size={16} />
              <Text>{post.commentsCount}</Text>
            </Pressable>
          )}

          <View style={styles.action}>
            <Share2 size={16} />
            <Text>{post.sharesCount}</Text>
          </View>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginBottom: 12,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    gap: 10,
  },
  headerText: {
    flex: 1,
  },
  name: {
    fontWeight: "600",
    fontSize: 14,
  },
  time: {
    fontSize: 12,
    color: "#6b7280",
  },
  content: {
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
  },
  expand: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    gap: 4,
  },
  image: {
    width: "100%",
    height: 240,
    backgroundColor: "#f3f4f6",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  action: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  link: {
    color: "#2563eb",
  },
})
