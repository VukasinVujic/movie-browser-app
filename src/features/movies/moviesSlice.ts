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
  "movies/search",
  async (query: string, thunkAPI) => {
    try {
      const data = await fetchMovies(query);
      if (data.Response === "False") throw new Error(data.Error);
      return data.Search;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
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
