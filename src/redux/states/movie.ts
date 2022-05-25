import { createSlice } from '@reduxjs/toolkit';
import { IMovie } from '../../models/movie.model';

export const MoviesEmptyState: IMovie[] = [];

export const moviesSlice = createSlice({
  name: 'movies',
  initialState: MoviesEmptyState,
  reducers: {
    moviesReduce: (state, action) => action.payload,
    resetMovies: () => MoviesEmptyState
  }
});

export const { moviesReduce, resetMovies } = moviesSlice.actions;

export default moviesSlice.reducer;
