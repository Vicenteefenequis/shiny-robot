import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import categoriesReducer, {
  categoriesApiSlice,
} from "../features/categories/categorySlice";
import { apiSlice } from "../features/api/apiSlice";
import { castMembersApiSlice } from "../features/cast/castMembersSlice";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [categoriesApiSlice.reducerPath]: apiSlice.reducer,
    [castMembersApiSlice.reducerPath]: castMembersApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
