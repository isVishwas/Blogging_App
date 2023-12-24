import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
//Include Both Helper File with needed methods
import {
    getArticles as getArticlesApi,
    deleteArticleData as deleteArticleDataApi,
    updateArticleData as updateArticleDataApi,
    addArticleData as addArticleDataApi,
    getAllArticles as getAllArticlesApi
} from "../../helpers/api_method_helper";

import { reset_error_flag } from "./reducer";

export const getUserData = createAsyncThunk("users/getUserData", async () => {
    try {
        const response = getArticlesApi();
        return response;
    } catch (error) {
        return error;
    }
});


export const getAllUserData = createAsyncThunk("users/getAllUserData", async () => {
    try {
        const response = getAllArticlesApi();
        return response;
    } catch (error) {
        return error;
    }
});

export const addUserData = createAsyncThunk("users/addUserData", async (user, { rejectWithValue }) => {
    try {
        const response = await addArticleDataApi(user);
        toast.success("Blog added", { autoClose: 3000 });
        return response;
    } catch (error) {
        return rejectWithValue(error);
        // toast.error("Unable to add User!", { autoClose: 3000 });
        // return error;
    }
});

export const deleteArticle = createAsyncThunk("users/delteArticleData", async (id) => {
    try {
        const response = await deleteArticleDataApi(id);
        toast.success("Blog deleted", { autoClose: 3000 });
        return response;
    } catch (error) {
        toast.error("Something went wrong", { autoClose: 3000 });
        return error;
    }
});

export const updateArticle  = (data, id) =>  async (dispatch) => {
    try {
        const response = await updateArticleDataApi(data,id);
        toast.success("blog updated", { autoClose: 3000 });
        return response;
    } catch (error) {
        toast.error("Something went wrong", { autoClose: 3000 });
        return error;
    }
};

export const resetError = () => async (dispatch) => {
    try {
        const response = dispatch(reset_error_flag());
        return response;
    } catch (error) {
        return error;
    }
};





