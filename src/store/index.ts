import { configureStore } from "@reduxjs/toolkit";
import dialogReducer from "./reducers/dialogReducer";
import drawerReducer from "./reducers/drawerReducer";
import appReducer from "./reducers/appReducer";
import listReducer from "./reducers/listReducer";

export const store = configureStore({
  reducer: {
    dialog: dialogReducer,
    drawer: drawerReducer,
    app: appReducer,
    list: listReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
