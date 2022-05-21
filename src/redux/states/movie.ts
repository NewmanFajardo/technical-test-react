import { createSlice } from '@reduxjs/toolkit';
import { IMovie } from '../../models/movie.model';

export const MoviesEmptyState: IMovie[] = [];

export const moviesSlice = createSlice({
  name: 'movies',
  initialState: MoviesEmptyState,
  reducers: {
    createMovies: (state, action) => action.payload,
    modifyMovies: (state, action) => ({ ...state, ...action.payload }),
    resetMovies: () => MoviesEmptyState
  }
});

export const { createMovies, modifyMovies, resetMovies } = moviesSlice.actions;

export default moviesSlice.reducer;
