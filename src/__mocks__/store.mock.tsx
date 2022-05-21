import { configureStore } from "@reduxjs/toolkit";
import { moviesSlice } from "../redux/states/movie";
import { movieDetailsSlice } from "../redux/states/movieDetails";
import { movieSelectedSlice } from "../redux/states/movieSelected";
import { movieSimilarSlice } from "../redux/states/movieSimilar";
import { userSlice } from "../redux/states/user";
import { AppStore } from "../redux/store";

export const store = configureStore<AppStore>({
  reducer: {
    user: userSlice.reducer,
    movies: moviesSlice.reducer,
    movieSelected: movieSelectedSlice.reducer,
    movieDetails: movieDetailsSlice.reducer,
    movieSimilar: movieSimilarSlice.reducer,
  }
});
