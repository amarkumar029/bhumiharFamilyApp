// postApi.ts
import { ApiResponse, CreatePostData, Post, PostCommentReplies } from "@/types";
import { api } from "../axios"; // same axios instance but configured for RN

export const postApi = {
  async getAllPost({
    pageParam = 1,
  }): Promise<{ posts: Post[]; total: number } | null> {
    const response = await api.get<
      ApiResponse<{ rows: Post[]; count: number }>
    >(`/posts?page=${pageParam}&limit=8`);

    return {
      posts: response.data.data.rows,
      total: response.data.data.count,
    };
  },

  async updatePost({ id, data }: { id: string; data: CreatePostData }) {
    try {
      const formData = new FormData();

      if (data.content) formData.append("content", data.content);

      if (data.image) {
        formData.append("image", {
          uri: data.image.uri,
          type: data.image.type,
          name: data.image.fileName,
        } as any);
      }

      if (data.metaImage) {
        formData.append("metaImage", {
          uri: data.metaImage.uri,
          type: data.metaImage.type,
          name: data.metaImage.fileName,
        } as any);
      }

      if (data.metaCaption) formData.append("metaCaption", data.metaCaption);

      const response = await api.put(`/posts/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return {
        status: 200,
        message: "Updated Successfully",
        success: true,
        data: response.data.data,
      };
    } catch (error) {
      return {
        status: 500,
        message: "Failed to update the post",
        success: false,
      };
    }
  },

  async getMyPosts({ pageParam = 1 }) {
    const response = await api.get<
      ApiResponse<{ rows: Post[]; count: number }>
    >(`/posts/my-post?page=${pageParam}&limit=8`);

    return {
      posts: response.data.data.rows,
      total: response.data.data.count,
    };
  },

  async getLikedPosts({ pageParam = 1 }) {
    const response = await api.get<
      ApiResponse<{ rows: Post[]; count: number }>
    >(`/posts/my-liked-post?page=${pageParam}&limit=8`);

    return {
      posts: response.data.data.rows,
      total: response.data.data.count,
    };
  },

  async getPostById(id: string) {
    const response = await api.get<ApiResponse<Post>>(`/posts/${id}`);

    return { post: response.data.data };
  },

  async getAllComments({ pageParam = 1, postId }) {
    const result = await api.get<
      ApiResponse<{ count: number; rows: PostCommentReplies[] }>
    >(`/comments/${postId}?page=${pageParam}&limit=8`);

    return {
      comments: result.data.data.rows,
      count: result.data.data.count,
    };
  },

  async getCommentReplies({ commentId, pageParam }) {
    const response = await api.get<
      ApiResponse<{ rows: Comment[]; count: number }>
    >(`/comments/${commentId}/replies?page=${pageParam}&limit=8`);

    return {
      replies: response.data.data.rows,
      total: response.data.data.count,
    };
  },

  async createPost(data: CreatePostData) {
    const formData = new FormData();

    if (data.content) formData.append("content", data.content);

    if (data.image) {
      formData.append("image", {
        uri: data.image.uri,
        name: data.image.fileName,
        type: data.image.type,
      } as any);
    }

    if (data.metaCaption) formData.append("metaCaption", data.metaCaption);

    if (data.metaImage) {
      formData.append("metaImage", {
        uri: data.metaImage.uri,
        name: data.metaImage.fileName,
        type: data.metaImage.type,
      } as any);
    }

    if (data.metaUrl) formData.append("metaUrl", data.metaUrl);

    if (data.socialMediaLinks) {
      formData.append(
        "socialMediaLinks",
        JSON.stringify(data.socialMediaLinks)
      );
    }

    try {
      const result = await api.post<ApiResponse<Post>>("/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (result.data.success) {
        return {
          status: 200,
          message: result.data.message,
          success: true,
        };
      } else {
        return {
          status: 400,
          message: result.data.message,
          success: false,
        };
      }
    } catch (error: any) {
      return {
        status: 500,
        message: error.response?.data?.message || "Error creating post",
        success: false,
      };
    }
  },

  async likePost(postId: string) {
    try {
      const response = await api.post<ApiResponse<{ liked: boolean }>>(
        `/posts/${postId}/like`,
        {}
      );

      return {
        status: 200,
        success: true,
        message: response.data.message,
        liked: response.data.data.liked,
      };
    } catch (error: any) {
      return {
        status: 500,
        success: false,
        message: error.response?.data?.message || "Failed to like post",
      };
    }
  },

  async commentOnPost({ postId, content }) {
    try {
      const response = await api.post<ApiResponse<Comment>>(
        `/comments/${postId}`,
        { content }
      );

      return {
        status: 200,
        success: true,
        message: "Comment added successfully",
        comment: response.data.data,
      };
    } catch (error: any) {
      return {
        status: 500,
        success: false,
        message: error.response?.data?.message || "Failed to add comment",
      };
    }
  },

  async likeComment(commentId: string) {
    try {
      const response = await api.post<ApiResponse<{ liked: boolean }>>(
        `/comments/${commentId}/like`,
        {}
      );

      return {
        status: 200,
        message: "Comment liked successfully",
        liked: response.data.data.liked,
        success: true,
      };
    } catch (error: any) {
      return {
        status: 500,
        success: false,
        message: error.response?.data?.message || "Failed to like comment",
      };
    }
  },

  async deletePost(postId: string) {
    try {
      const response = await api.delete<ApiResponse<Post>>(`/posts/${postId}`);

      return {
        status: response.status,
        message: response.data.message,
        success: response.data.success,
      };
    } catch (error: any) {
      return {
        status: 500,
        success: false,
        message: error.response?.data?.message || "Failed to delete post",
      };
    }
  },

  async replyToComment({ commentId, content }) {
    try {
      const response = await api.post<ApiResponse<Comment>>(
        `/comments/${commentId}/reply`,
        { content }
      );

      return {
        status: 200,
        message: "Reply added successfully",
        reply: response.data.data,
        success: true,
      };
    } catch (error: any) {
      return {
        status: 500,
        success: false,
        message:
          error.response?.data?.message || "Failed to reply to comment",
      };
    }
  },
};
