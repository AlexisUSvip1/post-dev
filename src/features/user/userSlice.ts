import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
  name: 'user',
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