import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import locationReducer from "./locationSlice";
import userReducer from "./userSlice";
import workerReducer from "./workerSlice";
import jobReducer from "./jobSlice";
import postReducer from "./postSlice";
import notificationReducer from "./notificationSlice";
import settingsReducer from "./settingsSlice";
import cmsReducer from "./cmsSlice";
import { notificationApi } from "./api/notifications";
import { postsApi } from "./api/posts";
import { workersApi } from "./api/workers";
import { subscriptionApi } from "./api/subscription";

export default combineReducers({
    auth: authReducer,
    location: locationReducer,
    user: userReducer,
    workers: workerReducer,
    jobs: jobReducer,
    posts: postReducer,
    notifications: notificationReducer,
    settings: settingsReducer,
    cms: cmsReducer,
    [notificationApi.reducerPath]: notificationApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    [workersApi.reducerPath]: workersApi.reducer,
    [subscriptionApi.reducerPath]: subscriptionApi.reducer,
});