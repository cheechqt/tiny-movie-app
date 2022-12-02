import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// Action
export const getMovies = createAsyncThunk(
  "movies/getMovies",
  async (data, thunkApi) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_MOVIE_KEY}`
      );
      return await response.json();
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

interface MovieState {
  loading: boolean;
  error: null | string;
  data: null | { results: any[] };
}

const initialState: MovieState = {
  loading: false,
  error: null,
  data: null
};
// qwqwqqw
const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getMovies.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getMovies.fulfilled,
      (state, action: PayloadAction<{ results: any[] }>) => {
        state.loading = false;
        state.data = action.payload;
      }
    );
    builder.addCase(getMovies.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    });
  }
});

export default moviesSlice.reducer;
