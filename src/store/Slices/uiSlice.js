import { createSlice } from "@reduxjs/toolkit";

const initialMode = {
    display: true,
    recentShow: false,
    relatedShow: true,
 
};const uiSlice = createSlice({
    name: 'uiSlice',
    initialState : initialMode, 
    reducers: {
        displayComponentHandler(state){
            state.display = !state.display;
        },
        showRecentHandler(state){
            state.recentShow = !state.recentShow;
            state.relatedShow = false;
        },
        showRelatedHandler(state){
            state.recentShow = false
            state.relatedShow = !state.relatedShow;
        },

        
    }
    });

const { reducer, actions } = uiSlice;

export const { displayComponentHandler,showRelatedHandler,showRecentHandler } = actions;

export default reducer;