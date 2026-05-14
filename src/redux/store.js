import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import authReducer from "./slices/authSlice";
import requirementReducer from "./slices/requirementSlice";
import notificationReducer from "./slices/notificationSlice";
import jobReducer from "./slices/jobSlice";
import workerReducer from "./slices/workerSlice";
import postReducer from "./slices/postSlice";
import profileReducer from "./slices/profileSlice";
import favouriteReducer from "./slices/favouriteSlice";
import subscriptionReducer from "./slices/subscriptionSlice";
import locationReducer from "./slices/locationSlice";
import adminReducer from "./slices/adminSlice";
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "token", "role"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  requirements: requirementReducer,
  notifications: notificationReducer,
  jobs: jobReducer,
  workers: workerReducer,
  posts: postReducer,
  profile: profileReducer,
  favourites: favouriteReducer,
  subscription: subscriptionReducer,
  locations: locationReducer,
  admin: adminReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export default store;