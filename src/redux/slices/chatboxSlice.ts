import { createSlice } from '@reduxjs/toolkit';

type ChatboxState = {
    uidChoosed: string;
    isOpen: boolean;
};

const initialState = {
    uidChoosed: '',
    isOpen: false,
} as ChatboxState;

const chatboxSlice = createSlice({
    name: 'chatbox',
    initialState,
    reducers: {
        setUidChoosed: (state, action) => {
            state.uidChoosed = action.payload;
        },
        setIsOpen: (state, action) => {
            state.isOpen = action.payload;
        },
    },
});

export const { setUidChoosed, setIsOpen } = chatboxSlice.actions;
export default chatboxSlice.reducer;
