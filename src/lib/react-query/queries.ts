import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { postApi } from "../api/post";
import { userApi } from "../api/user";
import { chatApi } from "../api/chat";
import dashboardApi from "../api/dashboard";
import communityApi from "../api/community";
import matrimonialApi from "../api/matrimonial";
import { QUERY_KEY } from "./queryKey";
import { SearchFilters } from "@/types/matrimonial";

/*************************************** */
/*******POST RELATED QUERIES************ */
/*************************************** */

export const useInfinitePosts = () =>
  useInfiniteQuery({
    queryKey: [QUERY_KEY.GET_ALL_POSTS],
    queryFn: postApi.getAllPost,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.flatMap((page) => page?.posts).length;
      return totalFetched < lastPage?.total! ? allPages.length + 1 : undefined;
    },
  });

export const usePostById = (id: string) =>
  useQuery({
    queryKey: [QUERY_KEY.GET_POST_BY_ID, id],
    queryFn: () => postApi.getPostById(id),
    staleTime: 5 * 60 * 1000,
    enabled: !!id,
  });

export const useGetInfiniteComments = (postId: string) =>
  useInfiniteQuery({
    queryKey: [QUERY_KEY.GET_ALL_COMMENTS, postId],
    queryFn: ({ pageParam = 1 }) => postApi.getAllComments({ pageParam, postId }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.flatMap((page) => page.comments).length;
      return totalFetched < lastPage?.count ? allPages.length + 1 : undefined;
    },
    enabled: !!postId,
  });

export const useGetCommentReplies = (commentId: string) =>
  useInfiniteQuery({
    queryKey: [QUERY_KEY.GET_COMMENT_REPLIES, commentId],
    queryFn: ({ pageParam }) => postApi.getCommentReplies({ commentId, pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.flatMap((page) => page.replies).length;
      return totalFetched < lastPage?.total ? allPages.length + 1 : undefined;
    },
    enabled: !!commentId,
  });

export const useGetUsersCount = () =>
  useQuery({
    queryKey: [QUERY_KEY.GET_USERS_COUNT],
    queryFn: userApi.getUsersCount,
    staleTime: 5 * 60 * 1000,
  });

export const useGetProfileData = () =>
  useQuery({
    queryKey: [QUERY_KEY.GET_PROFILE_DATA],
    queryFn: userApi.getMyProfile,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 5 * 60 * 1000,
  });

export const useMyInfinitePosts = () =>
  useInfiniteQuery({
    queryKey: [QUERY_KEY.GET_MY_POSTS],
    queryFn: postApi.getMyPosts,
    staleTime: 300_000,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.flatMap((page) => page?.posts).length;
      return totalFetched < lastPage?.total! ? allPages.length + 1 : undefined;
    },
  });

export const useMyInfiniteLikedPosts = () =>
  useInfiniteQuery({
    queryKey: [QUERY_KEY.GET_MY_LIKED_POSTS],
    queryFn: postApi.getLikedPosts,
    staleTime: 300_000,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.flatMap((page) => page?.posts).length;
      return totalFetched < lastPage?.total! ? allPages.length + 1 : undefined;
    },
  });

export const useGetInfiniteUsers = (keyword: string) =>
  useInfiniteQuery({
    queryKey: [QUERY_KEY.GET_ALL_USERS, keyword],
    queryFn: ({ pageParam }) => userApi.getAllUsers(keyword, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.flatMap((page) => page?.rows).length;
      return totalFetched < lastPage?.total! ? allPages.length + 1 : undefined;
    },
    enabled: keyword.length >= 2,
  });

export const useGetInfiniteMessages = (chatId: string) =>
  useInfiniteQuery({
    queryKey: [QUERY_KEY.GET_CHAT_MESSAGES, chatId],
    queryFn: ({ pageParam }) => chatApi.getChatMessages({ chatId, pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.flatMap((page) => page?.rows).length;
      return totalFetched < lastPage?.total! ? allPages.length + 1 : undefined;
    },
    enabled: !!chatId,
  });

export const useGetActiveChats = () =>
  useQuery({
    queryKey: [QUERY_KEY.GET_ACTIVE_CHATS],
    queryFn: chatApi.getActiveChats,
    staleTime: 5 * 60 * 1000,
  });

/*************************************** */
/*******DASHBOARD & COMMUNITY QUERIES**** */
/*************************************** */

export const useGetRandomPosts = () =>
  useQuery({
    queryKey: [QUERY_KEY.GET_RANDOM_POST],
    queryFn: dashboardApi.getRandomPosts,
    staleTime: 5 * 60 * 1000,
  });

export const useGetRecentMessages = () =>
  useQuery({
    queryKey: [QUERY_KEY.GET_RECENT_MESSAGES],
    queryFn: dashboardApi.getRecentChats,
    staleTime: 5 * 60 * 1000,
  });

export const useGetProfileCompletion = () =>
  useQuery({
    queryKey: [QUERY_KEY.GET_PROFILE_COMPLETION],
    queryFn: dashboardApi.getProfileCompletion,
    staleTime: 5 * 60 * 1000,
  });

export const useGetCheckOutList = () =>
  useQuery({
    queryKey: [QUERY_KEY.GET_CHECKOUT_LIST],
    queryFn: communityApi.getCheckoutList,
    staleTime: 5 * 60 * 1000,
  });

export const useGetNotInterestedUsers = () =>
  useQuery({
    queryKey: [QUERY_KEY.GET_NOT_INTERESTED_USERS],
    queryFn: communityApi.getNotInterestedUsers,
    staleTime: 5 * 60 * 1000,
  });

/*************************************** */
/*******MATRIMONIAL QUERIES************ */
/*************************************** */

export const useRecommendedProfiles = (limit = 5) =>
  useInfiniteQuery({
    queryKey: [QUERY_KEY.GET_RECOMMENDED_PROFILES],
    queryFn: ({ pageParam = 1 }) =>
      matrimonialApi.getRecommendedProfiles({ page: pageParam, limit }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.flatMap((page) => page?.profiles).length;
      return totalFetched < lastPage?.total ? allPages.length + 1 : undefined;
    },
  });

export const useSearchProfiles = (filters: SearchFilters, limit = 10) =>
  useInfiniteQuery({
    queryKey: [QUERY_KEY.SEARCH_PROFILES, filters],
    queryFn: ({ pageParam = 1 }) =>
      matrimonialApi.searchProfiles({ ...filters, page: pageParam, limit }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.flatMap((page) => page?.profiles).length;
      return totalFetched < lastPage?.total ? allPages.length + 1 : undefined;
    },
  });

export const useProfileDetails = (userId: string) =>
  useQuery({
    queryKey: [QUERY_KEY.GET_MATRIMONIAL_PROFILE, userId],
    queryFn: () => matrimonialApi.getProfileDetails(userId),
    enabled: !!userId,
  });

export const useReceivedInterests = (limit = 10) =>
  useInfiniteQuery({
    queryKey: [QUERY_KEY.GET_RECEIVED_INTERESTS],
    queryFn: ({ pageParam = 1 }) => matrimonialApi.getReceivedInterests(pageParam, limit),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.flatMap((page) => page?.interests).length;
      return totalFetched < lastPage?.total ? allPages.length + 1 : undefined;
    },
  });

export const useGetSentInterests = (limit = 10) =>
  useInfiniteQuery({
    queryKey: [QUERY_KEY.GET_SENT_INTERESTS],
    queryFn: ({ pageParam = 1 }) => matrimonialApi.getSentInterests({ page: pageParam, limit }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.flatMap((page) => page?.interests).length;
      return totalFetched < lastPage?.total ? allPages.length + 1 : undefined;
    },
  });

export const useGetUserProfile = (userId: string) =>
  useQuery({
    queryKey: [QUERY_KEY.GET_USER_PROFILE, userId],
    queryFn: () => userApi.getUsersProfileData(userId),
    staleTime: 5 * 60 * 1000,
  });

export const useBlockedUsers = (limit = 10) =>
  useInfiniteQuery({
    queryKey: [QUERY_KEY.GET_BLOCKED_USERS],
    queryFn: ({ pageParam = 1 }) => matrimonialApi.getBlockedUsers({ page: pageParam, limit }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.flatMap((page) => page?.blockedUsers).length;
      return totalFetched < lastPage?.total ? allPages.length + 1 : undefined;
    },
  });
