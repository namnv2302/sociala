import { createSlice } from '@reduxjs/toolkit';

type TabState = {
    tabActive: number;
};

const initialState = {
    tabActive: 1,
} as TabState;

const tabSlice = createSlice({
    name: 'tab',
    initialState,
    reducers: {
        setTabActive: (state, action) => {
            state.tabActive = action.payload;
        },
    },
});

export const { setTabActive } = tabSlice.actions;
export default tabSlice.reducer;
