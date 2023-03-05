import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from '@slices/userSlice';
import tabReducer from '@slices/tabSlice';
import chatboxReducer from '@slices/chatboxSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        tab: tabReducer,
        chatbox: chatboxReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
