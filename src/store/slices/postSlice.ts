import { Post } from "../../types"; // Make sure '@/types' is ported
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IProp {
    posts: Post[];
    isLoading: boolean;
    error: string;
}

const initialState: IProp = {
    posts: [],
    error: "",
    isLoading: false
}


const postSlice = createSlice({
    name: "Posts",
    initialState,
    reducers: {
        // Posts array को नए array से बदलता है
        setPosts: (state: IProp, action: PayloadAction<Post[]>) => {
            state.posts = action.payload
        },
        // array के शुरुआत में एक नया post जोड़ता है
        addPost: (state, action: PayloadAction<Post>) => {
            state.posts = [action.payload, ...state.posts]
        },
        // ID के आधार पर एक post को हटाता है
        deletePost: (state, action: PayloadAction<Post>) => {
            state.posts = state.posts.filter((post) => post.id !== action.payload.id);
        },
        // array के अंत में नए posts जोड़ता है (Pagination के लिए उपयोगी)
        appendPosts: (state, action: PayloadAction<Post[]>) => {
            state.posts = [...state.posts, ...action.payload];
        },
        // Posts array को खाली करता है
        clearPosts: (state) => {
            state.posts = [];
        },
        // Post को लाइक/अनलाइक करने का लॉजिक
        likePost: (state: IProp, action: PayloadAction<string>) => {
            state.posts.forEach((post) => {
                if (post.id === action.payload) {
                    if (post.isLiked === 1) {
                        post.isLiked = 0;
                        post.likesCount = +post.likesCount - 1;
                    } else {
                        post.isLiked = 1;
                        post.likesCount = +post.likesCount + 1;
                    }
                }
            });
        }
    }
})

export const {
    addPost,
    deletePost,
    setPosts,
    // Action creators को export करते समय नाम बदलें (likeUserPost)
    likePost: likeUserPost,
    appendPosts,
    clearPosts
} = postSlice.actions

export default postSlice.reducer;