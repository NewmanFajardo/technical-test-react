import { createSlice } from '@reduxjs/toolkit';
import { IMovieDetails } from '../../models/movie.model';

export const MovieSimilarEmptyState: IMovieDetails[] = [];

export const movieSimilarSlice = createSlice({
  name: 'movieSimilar',
  initialState: MovieSimilarEmptyState,
  reducers: {
    createMovieSimilar: (state, action) => action.payload,
    resetMovieSilimar: () => MovieSimilarEmptyState
  }
});

export const { createMovieSimilar, resetMovieSilimar } = movieSimilarSlice.actions;

export default movieSimilarSlice.reducer;
