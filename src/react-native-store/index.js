import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { notificationApi } from "./api/notifications";
import { postsApi } from "./api/posts";
import { workersApi } from "./api/workers";
import { subscriptionApi } from "./api/subscription";

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => 
        getDefaultMiddleware().concat([
            notificationApi.middleware, 
            postsApi.middleware, 
            workersApi.middleware,
            subscriptionApi.middleware
        ]),
});