import { createSlice } from '@reduxjs/toolkit';
import { IMovieDetails } from '../../models/movie.model';

export const MovieSimilarEmptyState: IMovieDetails[] = [];

export const movieSimilarSlice = createSlice({
  name: 'movieSimilar',
  initialState: MovieSimilarEmptyState,
  reducers: {
    movieSimilarReduce: (state, action) => action.payload,
    resetMovieSilimarReduce: () => MovieSimilarEmptyState
  }
});

export const { movieSimilarReduce, resetMovieSilimarReduce } = movieSimilarSlice.actions;

export default movieSimilarSlice.reducer;
