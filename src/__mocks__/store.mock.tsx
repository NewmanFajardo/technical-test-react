import { configureStore } from "@reduxjs/toolkit";
import { moviesSlice } from "../redux/states/movie";
import { movieDetailsSlice } from "../redux/states/movieDetails";
import { movieSelectedSlice } from "../redux/states/movieSelected";
import { movieSimilarSlice } from "../redux/states/movieSimilar";
import { moviesShowSlice } from "../redux/states/moviesShow";
import { tvSlice } from "../redux/states/tv";
import { tvDetailsSlice } from "../redux/states/tvDetails";
import { tvSelectedSlice } from "../redux/states/tvSelected";
import { tvShowSlice } from "../redux/states/tvShow";
import { tvSimilarSlice } from "../redux/states/tvSimilar";
import { userSlice } from "../redux/states/user";
import { AppStore } from "../redux/store";

export const store = configureStore<AppStore>({
  reducer: {
    user: userSlice.reducer,
    movies: moviesSlice.reducer,
    movieSelected: movieSelectedSlice.reducer,
    movieDetails: movieDetailsSlice.reducer,
    movieSimilar: movieSimilarSlice.reducer,
    moviesShow: moviesShowSlice.reducer,
    tv: tvSlice.reducer,
    tvSelected: tvSelectedSlice.reducer,
    tvDetails: tvDetailsSlice.reducer,
    tvSimilar: tvSimilarSlice.reducer,
    tvShow: tvShowSlice.reducer,
  }
});
