import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../../components/CardPost/CardPost.types";

// Type for the modal and post state

export type PostState = {
  openPostModal: boolean;
  postContent: string | null;
  savedPostState: Post[];
};

const initialState: PostState = {
  openPostModal: false,
  postContent: null,
  savedPostState: [],
};
const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    // Open the modal
    openModal: (state) => {
      state.openPostModal = true;
    },
    // Close the modal
    closeModal: (state) => {
      state.openPostModal = false;
    },
    // Set the post content
    setPostContent: (state, action: PayloadAction<string>) => {
      state.postContent = action.payload;
    },
    // Clear the post content
    clearPostContent: (state) => {
      state.postContent = null;
    },
    savePost: (state, action: PayloadAction<Post>) => {
      const post = action.payload;
      const exists = state.savedPostState.find((p) => p._id === post._id);
      if (!exists) {
        state.savedPostState.push(post);
      }
    },
    removeSavedPost: (state, action: PayloadAction<string>) => {
      state.savedPostState = state.savedPostState.filter(
        (p) => p._id !== action.payload
      );
    },
  },
});

export const {
  openModal,
  closeModal,
  setPostContent,
  clearPostContent,
  savePost,
  removeSavedPost,
} = postSlice.actions;

export default postSlice.reducer;
