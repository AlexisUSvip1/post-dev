import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserState = {
  id?: string | undefined;
  displayName?: string | undefined;
  email?: string | undefined;
  avatar_url?: string | undefined;
};

const initialState: UserState = {
  id: undefined,
  displayName: undefined,
  email: undefined,
  avatar_url: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.displayName = action.payload.displayName;
      state.email = action.payload.email;
      state.avatar_url = action.payload.avatar_url;
    },
    clearUser: () => initialState,
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

export type PostState = {
  _id?: string;
  title?: string;
  body?: string;
  created_at?: string;
  updated_at?: string;
  media?: any[];
  savePost?: boolean;
  status?: string;
  tags?: string[];
  total_likes?: number;
  user_avatar?: string;
  user_id?: string;
  usernameUser?: string;
  __v?: number;
};

const postInitialState: PostState = {
  _id: undefined,
  title: undefined,
  body: undefined,
  created_at: undefined,
  updated_at: undefined,
  media: [],
  savePost: false,
  status: undefined,
  tags: [],
  total_likes: 0,
  user_avatar: undefined,
  user_id: undefined,
  usernameUser: undefined,
  __v: 0,
};

const postSlice = createSlice({
  name: "postData",
  initialState: postInitialState,
  reducers: {
    setPost: (state, action: PayloadAction<PostState>) => {
      Object.assign(state, action.payload);
    },
    clearPost: () => postInitialState,
  },
});

export const { setPost, clearPost } = postSlice.actions;
export { postSlice as postReducer };
