import { createSlice } from '@reduxjs/toolkit';
import { IMovieDetails } from '../../models/movie.model';

export const MoviesShowEmptyState: IMovieDetails[] = [];

export const moviesShowSlice = createSlice({
  name: 'moviesShow',
  initialState: MoviesShowEmptyState,
  reducers: {
    moviesShowReduce: (state, action) => action.payload,
    resetMoviesShowReduce: () => MoviesShowEmptyState
  }
});

export const { moviesShowReduce, resetMoviesShowReduce } = moviesShowSlice.actions;

export default moviesShowSlice.reducer;
