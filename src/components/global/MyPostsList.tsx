import React from "react"
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native"
import { useMyInfinitePosts } from "@/lib/react-query/queries"
import { useSelector } from "react-redux"
import { RootState } from "@/store"
import { useNavigation } from "@react-navigation/native"
import { PostCard } from "./PostCard"

const MyPostsList = () => {
  const navigation = useNavigation<any>()

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useMyInfinitePosts()

  const { user } = useSelector((state: RootState) => state.auth)

  const posts =
    data?.pages.flatMap((page) => page?.posts ?? []) ?? []

  const isEmpty = posts.length === 0

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }

  return (
    <View style={styles.container}>
      {isEmpty && !isFetchingNextPage ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyTitle}>No Posts Yet!</Text>
          <Text style={styles.emptyText}>
            Start by creating your first post to share with the community.
          </Text>
        </View>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.4}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <PostCard
                isListItem
                post={item}
                currentUser={{
                  id: user?.id!,
                  fullName: user?.fullName!,
                  image: user?.image!,
                }}
                onContentClick={() =>
                  navigation.navigate("PostDetails", {
                    postId: item.id,
                  })
                }
              />
            </View>
          )}
          ListFooterComponent={
            hasNextPage ? (
              <View style={styles.footer}>
                {isFetchingNextPage ? (
                  <>
                    <ActivityIndicator size="small" />
                    <Text style={styles.footerText}>
                      Loading your posts...
                    </Text>
                  </>
                ) : (
                  <Text style={styles.footerText}>
                    Scroll to load more
                  </Text>
                )}
              </View>
            ) : posts.length > 0 ? (
              <View style={styles.endBox}>
                <Text style={styles.endTitle}>
                  That's all your posts!
                </Text>
                <Text style={styles.endText}>
                  You've reached the end of your posts.
                </Text>
              </View>
            ) : null
          }
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
  },
  listContent: {
    paddingHorizontal: 12,
    paddingBottom: 20,
    gap: 12,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    overflow: "hidden",
  },
  footer: {
    paddingVertical: 20,
    alignItems: "center",
    gap: 6,
  },
  footerText: {
    fontSize: 14,
    color: "#6b7280",
  },
  emptyBox: {
    margin: 16,
    padding: 24,
    borderRadius: 6,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    alignItems: "center",
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
  },
  endBox: {
    marginVertical: 20,
    padding: 16,
    borderRadius: 6,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    alignItems: "center",
  },
  endTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
  endText: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 4,
  },
})

export default MyPostsList