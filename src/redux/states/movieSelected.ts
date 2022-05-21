import { createSlice } from '@reduxjs/toolkit';
import { IMovie } from '../../models/movie.model';

export const MovieSelectedEmptyState: IMovie = {
    id: 0,
    adult: false
};

export const movieSelectedSlice = createSlice({
  name: 'movieSelected',
  initialState: MovieSelectedEmptyState,
  reducers: {
    selectedMovie: (state, action) => action.payload,
    resetMovieSelected: () => MovieSelectedEmptyState
  }
});

export const { selectedMovie, resetMovieSelected } = movieSelectedSlice.actions;

export default movieSelectedSlice.reducer;
