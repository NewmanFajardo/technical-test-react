import { createSlice } from '@reduxjs/toolkit';
import { IMovieDetails } from '../../models/movie.model';

export const MovieDetailsEmptyState: IMovieDetails = {
  video: false,
  voteAverage: 0,
  voteCount: 0,
  overview: '',
  title: '',
};

export const movieDetailsSlice = createSlice({
  name: 'movieDetails',
  initialState: MovieDetailsEmptyState,
  reducers: {
    createMovieDetails: (state, action) => action.payload,
    resetMovieSelected: () => MovieDetailsEmptyState
  }
});

export const { createMovieDetails, resetMovieSelected } = movieDetailsSlice.actions;

export default movieDetailsSlice.reducer;
