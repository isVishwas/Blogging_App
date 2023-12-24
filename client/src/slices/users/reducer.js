import { createSlice } from "@reduxjs/toolkit";
import {
    addUserData,
    getUserData,
    getAllUserData
} from './thunk';
export const initialState = {
    isLoading: true,
    article: [],
    allArticleData: [],
    error: '',
};

const TeamSlice = createSlice({
    name: 'UserSlice',
    initialState,
    reducers: {
        reset_error_flag(state) {
            state.error = null
            state.isLoading = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getUserData.fulfilled, (state, action) => {
            state.article = action.payload.articles;
            state.isLoading = false;

        });
        builder.addCase(getUserData.rejected, (state, action) => {
            state.error = action.payload || null;
            state.isLoading = false;
        });
        builder.addCase(getAllUserData.fulfilled, (state, action) => {
            state.allArticleData = action.payload.all_articles;
            state.isLoading = false;

        });
        builder.addCase(getAllUserData.rejected, (state, action) => {
            state.error = action.payload || null;
            state.isLoading = false;
        });
        builder.addCase(addUserData.fulfilled, (state, action) => {
            state.article.push(action.payload.user);
        });
        builder.addCase(addUserData.rejected, (state, action) => {
            state.error = action.payload || null;
        }); 
    }
});

export const {
    reset_error_flag
  } = TeamSlice.actions

export default TeamSlice.reducer;