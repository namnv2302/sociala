import { createSlice } from '@reduxjs/toolkit';

export interface UserType {
    uid: string;
    displayName: string;
    email: string;
    photoURL: string;
}

type UserState =
    | {
          user: UserType;
          postCount: number;
          follower: number;
          following: number;
      }
    | { user: null; postCount: 0; follower: 0; following: 0 };

const initialState = {
    user: null,
    postCount: 0,
    follower: 0,
    following: 0,
} as UserState;

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => void (state.user = action.payload),
        increasePost: (state, action) => (state.postCount = action.payload),
    },
});

export const { setUser, increasePost } = userSlice.actions;
export default userSlice.reducer;
