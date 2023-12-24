import { APIClient } from "./api_helper";

import * as url from "./url_helper";

const api = new APIClient();

// Admin Login
export const postLogin = data => api.create(url.LOGIN, data);
export const signUp = data => api.create(url.SIGNUP, data);
export const loadUserDetails = () => api.get(url.GET_USER_DATA);

//article 
export const addArticleData = user => api.create(url.ADD_ARTICLE_DATA, user);
export const getArticles = () => api.get(url.GET_ARTICLES);
export const deleteArticleData = (id) => api.delete(`${url.DELETE_ARTICLE}/${id}`);
export const updateArticleData = (data, id) => api.update(`${url.UPDATE_ARTICLE}/${id}`, data);
export const getAllArticles = () => api.get(url.GET_ALL_ARTICLES);