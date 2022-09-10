import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { endpointOptionsSlice } from "./slices/endpointOptionsSlice";
import { endpointSlice } from "./slices/endpointSlice";
import { tagSlice } from "./slices/tagSlice";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    // TODO: Should I concat more middlewares like endpointSlice.middleware???
    getDefaultMiddleware({
      // TODO: Without this, it fails because some states are classes (which are not serializable)
      serializableCheck: false
    })
      .concat(tagSlice.middleware)
      .concat(endpointSlice.middleware),

  reducer: {
    [tagSlice.reducerPath]: tagSlice.reducer,
    [endpointSlice.reducerPath]: endpointSlice.reducer,
    endpointOptions: endpointOptionsSlice.reducer
  }
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
