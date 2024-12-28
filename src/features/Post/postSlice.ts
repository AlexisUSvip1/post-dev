import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Type for the modal and post state
export type PostState = {
  openPostModal: boolean; // Controls modal visibility
  postContent: string | null; // Content of the post
};

const initialState: PostState = {
  openPostModal: false,
  postContent: null,
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
  },
});

export const { openModal, closeModal, setPostContent, clearPostContent } =
  postSlice.actions;
export default postSlice.reducer;
