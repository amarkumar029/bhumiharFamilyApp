// mutations.ts (React Native Version)

import { MUTATION_KEY, QUERY_KEY } from "./queryKey";
import { useMutationData } from "./useMutationData";

// API modules (same as web but adapted for RN)
import { postApi } from "../api/post";
import { userApi } from "../api/user";
import { chatApi } from "../api/chat";
import communityApi from "../api/community";
import matrimonialApi from "../api/matrimonial";

/*************************************
 * POSTS MUTATIONS
 *************************************/

export const useCreatePost = () => {
  return useMutationData(
    [MUTATION_KEY.CREATE_POST],
    postApi.createPost,
    [QUERY_KEY.GET_ALL_POSTS]
  );
};

export const useLikePost = () => {
  return useMutationData(
    [MUTATION_KEY.LIKE_POST],
    postApi.likePost,
    [
      QUERY_KEY.GET_ALL_POSTS,
      QUERY_KEY.GET_MY_LIKED_POSTS,
      QUERY_KEY.GET_MY_POSTS,
      QUERY_KEY.GET_POST_BY_ID,
    ],
    () => {},
    true
  );
};

export const useCommentOnPost = () => {
  return useMutationData(
    [MUTATION_KEY.COMMENT_POST],
    postApi.commentOnPost,
    [
      QUERY_KEY.GET_ALL_POSTS,
      QUERY_KEY.GET_COMMENT_REPLIES,
      QUERY_KEY.GET_ALL_COMMENTS,
    ],
    () => {},
    true
  );
};

export const useLikeComment = () => {
  return useMutationData(
    [MUTATION_KEY.LIKE_COMMENT],
    postApi.likeComment,
    [QUERY_KEY.GET_ALL_COMMENTS, QUERY_KEY.GET_COMMENT_REPLIES],
    () => {},
    true
  );
};

export const useReplyToComment = () => {
  return useMutationData(
    [MUTATION_KEY.REPLY_COMMENT],
    postApi.replyToComment,
    [QUERY_KEY.GET_ALL_COMMENTS, QUERY_KEY.GET_COMMENT_REPLIES],
    () => {},
    true
  );
};

export const useUpdatePost = () => {
  return useMutationData(
    [MUTATION_KEY.UPDATE_POST],
    postApi.updatePost,
    [
      QUERY_KEY.GET_ALL_POSTS,
      QUERY_KEY.GET_MY_POSTS,
      QUERY_KEY.GET_POST_BY_ID,
    ]
  );
};

export const useDeletePost = () => {
  return useMutationData(
    [MUTATION_KEY.DELETE_POST],
    (postId: string) => postApi.deletePost(postId),
    [
      QUERY_KEY.GET_ALL_POSTS,
      QUERY_KEY.GET_MY_POSTS,
      QUERY_KEY.GET_POST_BY_ID,
    ]
  );
};

/*************************************
 * PROFILE / USER MUTATIONS
 *************************************/

export const useUpdatePersonalDetails = () => {
  return useMutationData(
    [MUTATION_KEY.UPDATE_PERSONAL_DETAILS],
    userApi.updatePersonalDetails,
    [QUERY_KEY.GET_USERS_COUNT, QUERY_KEY.GET_PROFILE_COMPLETION]
  );
};

export const useUpdateCommunityDetails = () => {
  return useMutationData(
    [MUTATION_KEY.UPDATE_COMMUNITY_DETAILS],
    userApi.updateCommunityDetails,
    [QUERY_KEY.GET_USERS_COUNT, QUERY_KEY.GET_PROFILE_COMPLETION]
  );
};

export const useUpdateMatrimonialDetails = () => {
  return useMutationData(
    [MUTATION_KEY.UPDATE_MATRIMONIAL_DETAILS],
    userApi.updateMatrimonialDetails,
    [QUERY_KEY.GET_USERS_COUNT, QUERY_KEY.GET_PROFILE_COMPLETION]
  );
};

/*************************************
 * CHAT MUTATIONS
 *************************************/

export const useSendMessage = () => {
  return useMutationData(
    [MUTATION_KEY.SEND_MESSAGE],
    chatApi.sendMessage,
    [QUERY_KEY.GET_ACTIVE_CHATS],
    () => {},
    true
  );
};

/*************************************
 * COMMUNITY
 *************************************/

export const useAddToCheckOutList = (targetUserId: string) => {
  return useMutationData(
    [MUTATION_KEY.ADD_TO_CHECKOUT_LIST],
    () => communityApi.addToCheckoutList(targetUserId),
    [QUERY_KEY.GET_CHECKOUT_LIST]
  );
};

export const useRemoveFromNotInterested = () => {
  return useMutationData(
    [MUTATION_KEY.REMOVE_FROM_NOT_INTERESTED],
    (interestId: string) =>
      communityApi.removeNotInterestedUser(interestId),
    [
      QUERY_KEY.GET_NOT_INTERESTED_USERS,
      QUERY_KEY.GET_SEEKERS,
      QUERY_KEY.GET_HELPERS,
    ]
  );
};

/*************************************
 * MATRIMONIAL
 *************************************/

export const useSendInterest = () => {
  return useMutationData(
    [MUTATION_KEY.SEND_INTEREST],
    matrimonialApi.sendInterest,
    [QUERY_KEY.GET_SENT_INTERESTS]
  );
};

export const useRespondToInterest = () => {
  return useMutationData(
    [MUTATION_KEY.RESPOND_TO_INTEREST],
    ({
      interestId,
      status,
    }: {
      interestId: string;
      status: "ACCEPTED" | "DECLINED";
    }) =>
      matrimonialApi.respondToInterest({
        interestId,
        status,
      }),
    [QUERY_KEY.GET_RECEIVED_INTERESTS]
  );
};

export const useWithdrawInterest = () => {
  return useMutationData(
    [MUTATION_KEY.WITHDRAW_INTEREST],
    (interestId: string) =>
      matrimonialApi.withdrawInterest(interestId),
    [QUERY_KEY.GET_SENT_INTERESTS],
    () => {},
    true
  );
};

export const useBlockUser = () => {
  return useMutationData(
    [MUTATION_KEY.BLOCK_USER],
    matrimonialApi.blockUser,
    [QUERY_KEY.GET_BLOCKED_USERS]
  );
};

export const useUnblockUser = () => {
  return useMutationData(
    [MUTATION_KEY.UNBLOCK_USER],
    matrimonialApi.unblockUser,
    [QUERY_KEY.GET_BLOCKED_USERS]
  );
};

export const useReportUser = () => {
  return useMutationData(
    [MUTATION_KEY.REPORT_USER],
    matrimonialApi.reportUser
  );
};

export const useUpdatePartnerPreferences = () => {
  return useMutationData(
    [MUTATION_KEY.UPDATE_PARTNER_PREFERENCES],
    matrimonialApi.updatePartnerPreferences,
    [QUERY_KEY.GET_RECOMMENDED_PROFILES]
  );
};