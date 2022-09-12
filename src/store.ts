import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { endpointOptionsSlice } from "./slices/endpointOptionsSlice";
import { endpointSlice } from "./slices/endpointSlice";
import { pollingsSlice } from "./slices/pollingsSlice";
import { tagSlice } from "./slices/tagSlice";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(tagSlice.middleware)
      .concat(endpointSlice.middleware),

  reducer: {
    [tagSlice.reducerPath]: tagSlice.reducer,
    [endpointSlice.reducerPath]: endpointSlice.reducer,
    [pollingsSlice.reducerPath]: pollingsSlice.reducer,
    endpointOptions: endpointOptionsSlice.reducer
  }
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
