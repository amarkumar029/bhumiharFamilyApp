import { type LucideIcon } from "lucide-react-native";

export interface INavOptions {
  label: string;
  path: string;
  id: number | string;
  icon?: LucideIcon;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  sector: string;
  professoin: string | null;
  currentLocation: string;
  caste: string;
  image?: string;
}

export interface CreatePost {
  id: string;
  content: string;
  image?: string;
  socialMediaLinks?: {
    [key: string]: string;
  };
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  createdAt: string;
  user: {
    username: string;
    profilePicture?: string;
  };
}

export interface Comment {
  id: string;
  content: string;
  userId: string;
  postId: string;
  parentId?: string;
  likesCount: number;
  createdAt: string;
  updatedAt: string;
  author: User;
  replies?: Comment[];
  repliesCount: number;
  isLiked: boolean;
}

export interface CommentReplies {
  id: string;
  content: string;
  likesCount: number;
  repliesCount: number;
  isLiked: boolean;
  author: User;
  createdAt: string;
}

export interface PostCommentReplies {
  id: string;
  userId: string;
  postId: string;
  parentId?: null | string;
  content: string;
  likesCount: number | string;
  createdAt: string | Date;
  updatedAt: string | Date;
  repliesCount: number;
  author: {
    id: string;
    fullName: string;
    image?: string;
  };
  isLiked: number | boolean;
}

export interface CreatePostData {
  content?: string;
  image?: any; // React Native: File does not exist → use any or FormData
  socialMediaLinks?: {
    [key: string]: string;
  };
  metaImage?: string;
  metaCaption?: string;
  metaUrl?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export type ApiSuccess<T> = {
  success: true;
  data: T;
  message?: string;
  statusCode: number;
};

export type ApiError = {
  success: false;
  message: string;
  statusCode: number;
};

export interface Author {
  id: string;
  fullName: string;
  image: string | null;
}

export interface IHelper {
  id: string;
  fullName: string;
  email: string;
  image?: string;
  bioData: string;
  currentLocation: string;
  canHelpOut: string[];
  educationDegress: string;
  currentJobRole: string;
  sector: string;
}

interface Location {
  state: string;
  city: string;
  mohalla: string;
}

export type UserProfile = {
  id: string;
  fullName: string;
  email: string;
  bioData: string;
  profession: string;
  sector: string;
  currentLocation: Location;
  achievements: string[];
  hobbies: string[];
  canHelpOut: string[];
  canSeekHelp: string[];
  image: string | null;
  matrimonialImages: string[] | null;
};

export interface IUsers {
  _id?: string;
  id: string;
  fullName: string;
  email: string;
  image?: string;
  bioData: string;
  currentLocation: string;
  canSeekHelp?: string;
  canHelpOut?: string;
  educationDegress: string;
  currentJobRole: string;
  specializedDegree?: string;
  educationDegree?: string;
  sector: string;
  profession?: string;
  checkOutType?: "seekers" | "helpers";
}

export interface IMatrimonialProfiles {
  id: string;
  fullName: string;
  email: string;
  dateOfBirth: string | Date;
  gender: string;
  image: null | string;
  currentLocation: JSON;
  religion: string;
  caste: string;
  maritalStatus: string;
  educationDegres: string;
  currentJobRole: string;
}

export type ResponsePost = {
  id: string;
  userId: string;
  content: string;
  image: string | null;
  metaImage: string | null;
  metaCaption: string | null;
  socialMediaLinks: string | null;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  createdAt: string;
  updatedAt: string;
  author?: Author;
};

export interface Post {
  id: string;
  userId: string;
  content: string;
  image: string | null;
  metaImage?: string;
  metaUrl?: string;
  metaCaption?: string;
  socialMediaLinks: string | null;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  createdAt: string;
  updatedAt: string;
  author?: Author;
  isLiked?: number | boolean;
  likes?: {
    id: string;
    userId: string;
    postId: string;
    user: Author;
  }[];
  images?: string;
}

export type ImagesData = {
  compressed: string;
  social: string;
  metadata: {
    original: {
      width: number;
      height: number;
      aspectRatio: number;
      format: string;
    };
    social: {
      width: number;
      height: number;
      aspectRatio: number;
    };
  };
};