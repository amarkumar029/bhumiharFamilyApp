/* ===================== */
/* QUERY KEYS */
/* ===================== */

export enum QUERY_KEY {
  GET_ALL_POSTS = "get_all_posts",
  GET_POST_BY_ID = "get_post_by_id",
  GET_ALL_COMMENTS = "get_all_comments",
  GET_COMMENT_REPLIES = "get_comment_replies",
  GET_USERS_COUNT = "get_users_count",
  GET_PROFILE_DATA = "get_profile_data",
  GET_HELPERS = "get_helpers",
  GET_SEEKERS = "get_seekers",
  GET_SEARCHED_USERS = "get_searched_users",
  GET_MY_POSTS = "get_my_posts",
  GET_MY_LIKED_POSTS = "get_my_liked_post",
  GET_ALL_USERS = "get_all_users",
  GET_ACTIVE_CHATS = "get_active_chats",
  GET_CHAT_MESSAGES = "get_chat_messages",
  GET_RANDOM_POST = "get_random_post",
  GET_RECENT_MESSAGES = "get_recent_messages",
  GET_PROFILE_COMPLETION = "get_profile_completion",
  GET_CHECKOUT_LIST = "get_checkout_list",

  // Matrimonial
  GET_RECOMMENDED_PROFILES = "get_recommended_profiles",
  GET_MATRIMONIAL_PROFILE = "get_matrimonial_profile",
  GET_RECEIVED_INTERESTS = "get_received_interests",
  GET_SENT_INTERESTS = "get_sent_interests",
  GET_BLOCKED_USERS = "get_blocked_users",
  SEARCH_PROFILES = "search_profiles",

  GET_NOT_INTERESTED_USERS = "get_not_interested_users",
  GET_USER_PROFILE = "get_user_profile",
}

/* ===================== */
/* MUTATION KEYS */
/* ===================== */

export enum MUTATION_KEY {
  CREATE_POST = "create_post",
  UPDATE_PROFILE = "update_profile",
  LIKE_POST = "like_post",
  COMMENT_POST = "comment_post",
  LIKE_COMMENT = "like_comment",
  REPLY_COMMENT = "reply_comment",
  UPDATE_PERSONAL_DETAILS = "update_personal_details",
  UPDATE_COMMUNITY_DETAILS = "update_community_details",
  UPDATE_MATRIMONIAL_DETAILS = "update_matrimonial_details",
  SEND_MESSAGE = "send_message",
  UPDATE_POST = "update_post",
  DELETE_POST = "delete_post",
  ADD_TO_CHECKOUT_LIST = "add_to_checkout_list",

  // Matrimonial Mutations
  SEND_INTEREST = "send_interest",
  RESPOND_TO_INTEREST = "respond_to_interest",
  WITHDRAW_INTEREST = "withdraw_interest",
  BLOCK_USER = "block_user",
  UNBLOCK_USER = "unblock_user",
  REPORT_USER = "report_user",
  UPDATE_PARTNER_PREFERENCES = "update_partner_preferences",
  REMOVE_FROM_NOT_INTERESTED = "remove_from_not_interested",
}