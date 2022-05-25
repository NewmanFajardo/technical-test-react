import { createSlice } from '@reduxjs/toolkit';
import { IMovieDetails } from '../../models/movie.model';

export const MovieSelectedEmptyState: IMovieDetails = {
  video: false,
  id: 0,
  voteAverage: 0,
  voteCount: 0,
  overview: '',
  title: '',
};

export const movieSelectedSlice = createSlice({
  name: 'movieSelected',
  initialState: MovieSelectedEmptyState,
  reducers: {
    selectedMovieReduce: (state, action) => action.payload,
    resetMovieSelectedReduce: () => MovieSelectedEmptyState
  }
});

export const { selectedMovieReduce, resetMovieSelectedReduce } = movieSelectedSlice.actions;

export default movieSelectedSlice.reducer;
