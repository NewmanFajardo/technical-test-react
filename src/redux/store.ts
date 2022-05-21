import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './states/user';
import { moviesSlice } from './states/movie';
import { IMovie, IMovieDetails } from '../models/movie.model';
import { movieSelectedSlice } from './states/movieSelected';
import { movieDetailsSlice } from './states/movieDetails';
import { movieSimilarSlice } from './states/movieSimilar';
import { ITv, ITvDetails } from '../models/tv.model';
import { tvSlice } from './states/tv';
import { tvSelectedSlice } from './states/tvSelected';
import { tvDetailsSlice } from './states/tvDetails';
import { tvSimilarSlice } from './states/tvSimilar';

export interface AppStore {
  user: any
  movies: any
  movieSelected: IMovie
  movieDetails: IMovieDetails
  movieSimilar: IMovieDetails[],
  tv: any
  tvSelected: ITv
  tvDetails: ITvDetails
  tvSimilar: ITvDetails[]
}

export default configureStore<AppStore>({
  reducer: {
    user: userSlice.reducer,
    movies: moviesSlice.reducer,
    movieSelected: movieSelectedSlice.reducer,
    movieDetails: movieDetailsSlice.reducer,
    movieSimilar: movieSimilarSlice.reducer,

    tv: tvSlice.reducer,
    tvSelected: tvSelectedSlice.reducer,
    tvDetails: tvDetailsSlice.reducer,
    tvSimilar: tvSimilarSlice.reducer,
  }
});
