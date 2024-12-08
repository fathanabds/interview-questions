import { configureStore } from '@reduxjs/toolkit';
import companiesReducer from '../features/companiesSlice';

export const store = configureStore({
  reducer: {
    companies: companiesReducer,
  },
});

// export type AppStore = ReturnType<typeof configureStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
