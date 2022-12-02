import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "features/theme/themeSlice";
import moviesReducer from "features/movies/moviesSlice";

export const store = configureStore({
  reducer: {
    darkTheme: themeReducer,
    movies: moviesReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
