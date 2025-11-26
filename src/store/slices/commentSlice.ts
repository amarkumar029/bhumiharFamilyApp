import { PostCommentReplies } from "@/types"; // Make sure '@/types' is ported
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IProp {
    comments: PostCommentReplies[];
}

const initialState: IProp = {
    comments: []
};

const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        // Comments array को पूरी तरह से नए array से बदलता है
        setComments: (state: IProp, action: PayloadAction<PostCommentReplies[]>) => {
            state.comments = action.payload;
        },
        // Comments array के अंत में नए comments जोड़ता है (Pagination के लिए उपयोगी)
        appendComments: (state, action: PayloadAction<PostCommentReplies[]>) => {
            state.comments = [...state.comments, ...action.payload];
        },
        // array के शुरुआत में एक नया comment जोड़ता है
        addComment: (state: IProp, action: PayloadAction<PostCommentReplies>) => {
            state.comments = [action.payload, ...state.comments];
        },
        // ID के आधार पर एक comment को हटाता है
        deleteComment: (state, action: PayloadAction<PostCommentReplies>) => {
            state.comments = state.comments.filter((comment) => comment.id !== action.payload.id);
        },
        // Comment को लाइक/अनलाइक करने का लॉजिक
        likeTheComment: (state, action: PayloadAction<string>) => {
            // हम .map का उपयोग कर रहे हैं लेकिन state को mutate कर रहे हैं (Redux Toolkit के कारण ठीक है)
            state.comments.forEach((post) => {
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
        },
        // Comments array को खाली करता है
        clearComments: (state) => {
            state.comments = [];
        },
    }
});


export const {
    addComment,
    appendComments,
    clearComments,
    deleteComment,
    setComments,
    likeTheComment
} = commentSlice.actions

export default commentSlice.reducer;