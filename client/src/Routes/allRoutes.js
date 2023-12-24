import React from "react";
import { Navigate } from "react-router-dom";
import Cover404 from '../pages/AuthenticationInner/Errors/Cover404';
import Login from "../pages/Authentication/Login";
import Articles from "../pages/Article/Article";
import AddArticle from "../pages/Article/Add";
import UpdateArticle from "../pages/Article/Update";
import Signup from "../pages/Authentication/SignUp";
import ViewArticle from "../pages/Article/View";
import Home from "../pages/Home/index";
import View from "../pages/View/index";



const authProtectedRoutes = [

  //logged in user routes
  { path: "/article", component: <Articles /> },
  { path: "/article/add", component: <AddArticle /> },
  { path: "/article/update/:id", component: <UpdateArticle /> },
  { path: "/article/view", component: <UpdateArticle /> },
  // {
  //   path: "/",
  //   exact: true,
  //   component: <Navigate to="/dashboard" />,
  // },
  { path: "*", component: <Navigate to="/not-found" /> },
  { path: "/not-found", component: <Cover404 /> },

];


const publicArticleRoutes = [
  { path: "/", component: <Home /> },
  { path: "/article/view", component: <View /> },
];


const publicRoutes = [
  // Authentication Page
  // { path: "/logout", component: <Logout /> },
  { path: "/signup", component: <Signup /> },
  // { path: "/otp-verification", component: <Otp /> },
  { path: "/login", component: <Login /> },

  { path: "*", component: <Navigate to="/not-found" /> },
  { path: "/not-found", component: <Cover404 /> },

];

export {
  authProtectedRoutes,
  publicArticleRoutes,
  publicRoutes
};