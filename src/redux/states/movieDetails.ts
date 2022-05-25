import { createSlice } from '@reduxjs/toolkit';
import { IMovieDetails } from '../../models/movie.model';

export const MovieDetailsEmptyState: IMovieDetails = {
  id: 0,
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
    movieDetailsReduce: (state, action) => action.payload,
    resetMovieSelectedReduce: () => MovieDetailsEmptyState
  }
});

export const { movieDetailsReduce, resetMovieSelectedReduce } = movieDetailsSlice.actions;

export default movieDetailsSlice.reducer;
