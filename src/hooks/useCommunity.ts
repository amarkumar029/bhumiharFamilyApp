import { useState, useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { api } from "../lib/axios";
import { ApiResponse, IUsers } from "../types";
import debounce from "lodash";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  addUsers,
  setUsers,
  updatePagination,
  setLoading,
  setError,
  setFilter,
  resetUsers,
  clearFilters,
  setNotInterestedIds,
} from "../store/slices/userSlice";

interface IResponse {
  user: IUsers[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

const RETRY_COUNT = 3;
const RETRY_DELAY = 1000;

export const useCommunityUser = (type: "helpers" | "seekers") => {
  const dispatch = useDispatch();

  const [hasMore, setHasMore] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const abortControllerRef = useRef<AbortController | null>(null);
  const isInitialMount = useRef(true);

  const { users, pagination } = useSelector(
    (state: RootState) => state.user.user
  );

  const { keywords, locationFilter, profession, notInterestedIds } =
    useSelector((state: RootState) => state.user);

  const loading = useSelector((state: RootState) => state.user.loading);

  // ------------------ FILTERS ------------------
  const fetchFilters = useCallback(async () => {
    try {
      const response = await api.get<
        ApiResponse<{ canSeekHelp: string[]; canHelpOut: string[] }>
      >("/user/filters");

      if (response.data.success) {
        dispatch(setFilter(response.data.data));
      }
    } catch (error: any) {
      if (!(error.name === "AbortError")) {
        dispatch(setError("Failed to fetch filters"));
      }
    }
  }, [dispatch]);

  // ------------------ NOT INTERESTED USERS ------------------
  const fetchNotInterestedIds = useCallback(async () => {
    try {
      const response = await api.get<
        ApiResponse<{ notInterestedUserIds: string[] }>
      >("/community/not-interested");

      if (response.data.success) {
        dispatch(setNotInterestedIds(response.data.data.notInterestedUserIds));
      }
    } catch (error: any) {
      if (!(error.name === "AbortError")) {
        dispatch(setError("Failed to fetch not interested list"));
      }
    }
  }, [dispatch]);

  // ------------------ FETCH USERS ------------------
  const fetchUsers = useCallback(
    async (page = 1, isLoadMore = false) => {
      try {
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }

        abortControllerRef.current = new AbortController();

        dispatch(setLoading(true));

        const keywordsToUse =
          type === "helpers" ? keywords.canSeekHelp : keywords.canHelpOut;

        const hasLocationFilter =
          locationFilter.states.length > 0 ||
          locationFilter.cities.length > 0 ||
          locationFilter.locations.length > 0;

        const hasProfessionFilter = !!profession;

        // If NOTHING is applied → reset user list
        if (
          keywordsToUse.length === 0 &&
          !hasLocationFilter &&
          !hasProfessionFilter
        ) {
          dispatch(setUsers([]));
          dispatch(setLoading(false));
          return;
        }

        const params: Record<string, any> = { page, limit: 6 };

        if (keywordsToUse.length > 0)
          params.keywords = keywordsToUse.join(",");

        if (hasLocationFilter)
          params.locationFilter = JSON.stringify(locationFilter);

        if (hasProfessionFilter) params.profession = profession;

        if (notInterestedIds.length > 0)
          params.excludeUsers = JSON.stringify(notInterestedIds);

        const response = await api.get<ApiResponse<IResponse>>(
          `/community/${type}`,
          {
            params,
            signal: abortControllerRef.current.signal,
          }
        );

        if (response.data.success) {
          const { user, pagination: paginationData } = response.data.data;

          // Remove not interested users
          const filteredUsers = user.filter(
            (u) => !notInterestedIds.includes(u.id)
          );

          if (isLoadMore) {
            dispatch(addUsers(filteredUsers));
          } else {
            dispatch(resetUsers());
            dispatch(setUsers(filteredUsers));
          }

          dispatch(updatePagination(paginationData));
          setHasMore(page < paginationData.totalPages);
          setRetryCount(0);
        }
      } catch (error: any) {
        if (error.name !== "AbortError") {
          dispatch(setError("Failed to fetch users"));

          if (retryCount < RETRY_COUNT) {
            setTimeout(() => {
              setRetryCount((prev) => prev + 1);
              fetchUsers(page, isLoadMore);
            }, RETRY_DELAY * (retryCount + 1));
          }
        }
      } finally {
        dispatch(setLoading(false));
      }
    },
    [
      dispatch,
      type,
      keywords,
      locationFilter,
      profession,
      notInterestedIds,
      retryCount,
    ]
  );

  // Debounced fetch
  const debouncedFetchUsers = useCallback(
    debounce((page: number, isLoadMore: boolean) => {
      fetchUsers(page, isLoadMore);
    }, 300),
    [fetchUsers]
  );

  // Initial load -> fetch filters & not interested ids
  useEffect(() => {
    if (isInitialMount.current) {
      fetchFilters();
      fetchNotInterestedIds();
      isInitialMount.current = false;
    }
  }, [fetchFilters]);

  // Refetch when filters change
  useEffect(() => {
    if (!isInitialMount.current) {
      debouncedFetchUsers(1, false);
    }

    return () => {
      abortControllerRef.current?.abort();
      debouncedFetchUsers.cancel();
    };
  }, [keywords, locationFilter, profession, notInterestedIds]);

  const loadMore = useCallback(() => {
    if (pagination && !loading && hasMore) {
      fetchUsers(pagination.page + 1, true);
    }
  }, [pagination, loading, hasMore, fetchUsers]);

  return {
    users,
    loading,
    hasMore,
    loadMore,
    keywords,
    pagination,
    clearFilters: () => dispatch(clearFilters()),
  };
};

// ------------------ CHECKOUT LIST ------------------
export const useCheckoutList = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setErrorState] = useState<string | null>(null);

  const checkoutList = useSelector(
    (state: RootState) => state.user.checkoutList
  );

  const fetchCheckoutList = useCallback(async () => {
    try {
      setLoading(true);

      const response = await api.get<ApiResponse<{ users: IUsers[] }>>(
        "/user/checkout-list"
      );

      if (response.data.success) {
        response.data.data.users.forEach((user) => {
          dispatch(addUsers([user]));
        });
      }
    } catch (err: any) {
      setErrorState(
        err.response?.data?.message || "Failed to fetch checkout list"
      );
      console.log("Checkout list error:", err);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchCheckoutList();
  }, [fetchCheckoutList]);

  return {
    checkoutList,
    loading,
    error,
    refreshCheckoutList: fetchCheckoutList,
  };
};