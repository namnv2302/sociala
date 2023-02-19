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
      }
    | { user: null };

const initialState = {
    user: null,
} as UserState;

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => void (state.user = action.payload),
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
