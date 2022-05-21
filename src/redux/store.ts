import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './states/user';
import { moviesSlice } from './states/movie';
import { IMovie, IMovieDetails } from '../models/movie.model';
import { movieSelectedSlice } from './states/movieSelected';
import { movieDetailsSlice } from './states/movieDetails';
import { movieSimilarSlice } from './states/movieSimilar';

export interface AppStore {
  user: any
  movies: any
  movieSelected: IMovie
  movieDetails: IMovieDetails
  movieSimilar: IMovieDetails[]
}

export default configureStore<AppStore>({
  reducer: {
    user: userSlice.reducer,
    movies: moviesSlice.reducer,
    movieSelected: movieSelectedSlice.reducer,
    movieDetails: movieDetailsSlice.reducer,
    movieSimilar: movieSimilarSlice.reducer,
  }
});
