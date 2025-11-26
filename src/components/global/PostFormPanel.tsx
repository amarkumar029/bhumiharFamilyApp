import React, { useState, useMemo, useCallback, useEffect } from "react"
import {
  Modal,
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native"
import * as ImagePicker from "expo-image-picker"
import { X } from "lucide-react-native"
import ProfileImage from "./ProfileImage"
import { LinkPreview } from "./LinkPreview"
import { useCreatePost, useUpdatePost } from "@/lib/react-query/mutation"
import { IMetaData } from "@/types/meta"
import { Post } from "@/types"
import { toast } from "@/hooks/use-toast"

interface Props {
  fullName: string
  imageUrl?: string
  isOpen: boolean
  onClose: () => void
  post?: Post
  mode: "create" | "edit"
}

const CONTENT_LIMIT = 5000

export function PostFormPanel({
  fullName,
  imageUrl,
  isOpen,
  onClose,
  post,
  mode,
}: Props) {
  const [content, setContent] = useState("")
  const [image, setImage] = useState<any>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [metadata, setMetadata] = useState<IMetaData | null>(null)
  const [loading, setLoading] = useState(false)

  const { mutate: createPost, isPending: isCreating } = useCreatePost()
  const { mutate: updatePost, isPending: isUpdating } = useUpdatePost()
  const isPending = mode === "create" ? isCreating : isUpdating

  // Extract first link
  const extractLink = useCallback((text: string) => {
    const match = text.match(/https?:\/\/[^\s]+/)
    return match ? match[0] : null
  }, [])

  const link = useMemo(() => extractLink(content), [content, extractLink])

  useEffect(() => {
    if (mode === "edit" && post) {
      setContent(post.content ?? "")
      setImagePreview(post.image || post.metaImage || null)
    } else {
      setContent("")
      setImage(null)
      setImagePreview(null)
      setMetadata(null)
    }
  }, [mode, post, isOpen])

  // Image Picker
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    })

    if (!result.canceled) {
      const asset = result.assets[0]
      setImage({
        uri: asset.uri,
        name: "post.jpg",
        type: "image/jpeg",
      })
      setImagePreview(asset.uri)
    }
  }

  const handleSubmit = () => {
    if (!content.trim() && !image) return
    if (content.length > CONTENT_LIMIT) {
      toast({
        title: "Content too long",
        description: `Limit is ${CONTENT_LIMIT} characters`,
        variant: "warning",
      })
      return
    }

    setLoading(true)

    const payload = {
      content: content.trim(),
      image,
      metaImage: metadata?.og?.image || null,
      metaUrl: metadata?.og?.url || null,
    }

    if (mode === "create") {
      createPost(payload)
    } else if (mode === "edit" && post) {
      updatePost({ id: post.id, data: payload })
    }

    setLoading(false)
    onClose()
  }

  return (
    <Modal visible={isOpen} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>
              {mode === "create" ? "Create Post" : "Edit Post"}
            </Text>
            <Pressable onPress={onClose}>
              <X size={22} />
            </Pressable>
          </View>

          {/* User */}
          <View style={styles.userRow}>
            <ProfileImage fullName={fullName} image={imageUrl} size={40} />
            <Text style={styles.userName}>{fullName}</Text>
          </View>

          {/* Content */}
          <ScrollView contentContainerStyle={styles.content}>
            <TextInput
              multiline
              placeholder={`What's on your mind, ${fullName.split(" ")[0]}?`}
              value={content}
              onChangeText={setContent}
              style={styles.textarea}
            />

            <Text style={styles.counter}>
              {content.length}/{CONTENT_LIMIT}
            </Text>

            {/* Image preview */}
            {imagePreview && (
              <View style={styles.imageWrapper}>
                <Image source={{ uri: imagePreview }} style={styles.image} />
                <Pressable
                  onPress={() => {
                    setImage(null)
                    setImagePreview(null)
                  }}
                  style={styles.imageRemove}>
                  <X size={16} color="#fff" />
                </Pressable>
              </View>
            )}

            {/* Link Preview */}
            {link && !imagePreview && (
              <LinkPreview
                url={link}
                metadata={metadata}
                setMetaData={setMetadata}
              />
            )}

            {!imagePreview && (
              <Pressable style={styles.imageBtn} onPress={pickImage}>
                <Text style={styles.imageBtnText}>Add Image</Text>
              </Pressable>
            )}
          </ScrollView>

          {/* Footer */}
          <Pressable
            onPress={handleSubmit}
            disabled={loading || (!content && !image)}
            style={styles.submitBtn}>
            {isPending ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.submitText}>
                {mode === "create" ? "Post" : "Update"}
              </Text>
            )}
          </Pressable>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
  },
  container: {
    backgroundColor: "#fff",
    margin: 12,
    borderRadius: 8,
    maxHeight: "90%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 14,
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
  },
  title: { fontSize: 18, fontWeight: "600" },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    gap: 10,
  },
  userName: { fontSize: 16 },
  content: { padding: 14 },
  textarea: {
    fontSize: 16,
    minHeight: 120,
    textAlignVertical: "top",
  },
  counter: {
    alignSelf: "flex-end",
    fontSize: 12,
    color: "#6b7280",
  },
  imageWrapper: {
    marginTop: 12,
    position: "relative",
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 8,
  },
  imageRemove: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 6,
    borderRadius: 20,
  },
  imageBtn: {
    marginTop: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 6,
    alignItems: "center",
  },
  imageBtnText: {
    color: "#2563eb",
    fontWeight: "500",
  },
  submitBtn: {
    backgroundColor: "#2563eb",
    padding: 14,
    alignItems: "center",
    borderRadius: 6,
    margin: 14,
  },
  submitText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
})
