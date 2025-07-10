import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMovies } from "../../api/movies";
import { Movie } from "../../types/movie";

interface MoviesState {
  movies: Movie[];
  loading: boolean;
  error: string | null;
}

const initialState: MoviesState = {
  movies: [],
  loading: false,
  error: null,
};

export const searchMovies = createAsyncThunk(
  "movies/searchMovies",
  async (query: string, { rejectWithValue }) => {
    try {
      const data = await fetchMovies(query);

      if (data.Response === "False") throw new Error(data.Error);

      return data.Search;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    clearMovies: (state) => {
      state.movies = [];
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default moviesSlice.reducer;
export const { clearMovies } = moviesSlice.actions;
