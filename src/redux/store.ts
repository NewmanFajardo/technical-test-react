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
import { moviesShowSlice } from './states/moviesShow';
import { tvShowSlice } from './states/tvShow';

export interface AppStore {
  user: any
  movies: any
  movieSelected: IMovieDetails
  movieDetails: IMovieDetails
  movieSimilar: IMovieDetails[]
  moviesShow: IMovieDetails[],
  tv: any
  tvSelected: ITvDetails
  tvDetails: ITvDetails
  tvSimilar: ITvDetails[]
  tvShow: ITvDetails[]
}

export default configureStore<AppStore>({
  reducer: {
    user: userSlice.reducer,
    movies: moviesSlice.reducer,
    moviesShow: moviesShowSlice.reducer,
    movieSelected: movieSelectedSlice.reducer,
    movieDetails: movieDetailsSlice.reducer,
    movieSimilar: movieSimilarSlice.reducer,

    tv: tvSlice.reducer,
    tvSelected: tvSelectedSlice.reducer,
    tvDetails: tvDetailsSlice.reducer,
    tvSimilar: tvSimilarSlice.reducer,
    tvShow: tvShowSlice.reducer,
  }
});
