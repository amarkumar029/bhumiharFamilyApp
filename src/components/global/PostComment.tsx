import React, { useState } from "react"
import {
  View,
  TextInput,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native"
import { SendHorizontal } from "lucide-react-native"
import { useSelector } from "react-redux"
import { RootState } from "../../store"
import ProfileImage from "./ProfileImage"

type Props = {
  fullName?: string
  image?: string | null
  id?: string
  onSubmit: (comment: string) => void
  loading: boolean
  placeholder?: string
}

const PostComment = ({
  fullName,
  image,
  onSubmit,
  loading,
  placeholder = "Comment on this post!",
}: Props) => {
  const [comment, setComment] = useState("")
  const user = useSelector((state: RootState) => state.auth.user)

  const handleSubmit = () => {
    if (!comment.trim() || loading) return

    onSubmit(comment.trim())
    setComment("")
  }

  return (
    <View style={styles.container}>
      <ProfileImage
        fullName={fullName || user?.fullName || ""}
        image={image || user?.image}
        size={36}
      />

      <TextInput
        placeholder={placeholder}
        value={comment}
        onChangeText={setComment}
        editable={!loading}
        style={styles.input}
        placeholderTextColor="#9ca3af"
        multiline
      />

      <Pressable
        onPress={handleSubmit}
        disabled={loading}
        style={styles.sendButton}>
        {loading ? (
          <ActivityIndicator size="small" color="#2563eb" />
        ) : (
          <SendHorizontal size={22} color="#2563eb" />
        )}
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 8,
    backgroundColor: "#f3f4f6",
    borderRadius: 6,
    marginVertical: 8,
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    maxHeight: 100,
  },
  sendButton: {
    padding: 6,
  },
})


export default PostComment
