import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { ApiResponse, PostCommentReplies } from "../types";
import { api } from "@/lib/axios";
import { setComments } from "@/store/slices/commentSlice";

export const useComments = (
  postId: string,
  initialPage = 1,
  initialLimit = 6
) => {
  const { comments } = useSelector((state: RootState) => state.comment);
  const dispatch = useDispatch();

  const [page, setPage] = useState(initialPage);
  const [limit] = useState(initialLimit);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  // ----------- GET COMMENTS -----------
  const getPostComments = async (page = 1, limit = 4) => {
    try {
      setLoading(true);

      const result = await api.get<
        ApiResponse<{
          count: number;
          rows: PostCommentReplies[];
        }>
      >(`/comments/${postId}?page=${page}&limit=${limit}`);

      return {
        comments: result.data.data.rows,
        count: result.data.data.count,
      };
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch comments.");
      return { comments: [], count: 0 };
    } finally {
      setLoading(false);
    }
  };

  // ----------- LOAD COMMENTS WITH PAGINATION -----------
  const loadComments = useCallback(async () => {
    const result = await getPostComments(page, limit);

    const updatedComments =
      page === 1
        ? result.comments
        : [...comments, ...result.comments];

    dispatch(setComments(updatedComments));

    setTotal(result.count);
    setHasMore(page * limit < result.count);
  }, [page, limit, postId, comments]);

  // -------- Load More Comments ------
  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  }, [loading, hasMore]);

  // -------- Refresh ------
  const refresh = useCallback(() => {
    setPage(1);
    dispatch(setComments([]));
  }, [dispatch]);

  // -------- Auto-load On Page Change ------
  useEffect(() => {
    loadComments();
  }, [loadComments]);

  return {
    comments,
    loading,
    error,
    hasMore,
    total,
    loadMore,
    refresh,
  };
};
