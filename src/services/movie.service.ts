import { IMovie, IMovieDetails } from '../models/movie.model';
import { loadAbort } from '../utilities/load-abort-axios.utility';
// import axios from 'axios';
import { axiosCustom } from '../interceptors/axiosCustom';
import { API_KEY } from '../constants/apiKey';

export const movieChanges = () => {
  const controller = loadAbort();
  return {
    call: axiosCustom.get<IMovie>('movie/changes', { 
        signal: controller.signal,
        params: {
          api_key: API_KEY,
          page: 1
        }
    }),
    controller
  };
};

export const movieDetails = (movieId: number) => {
  const controller = loadAbort();
  return {
    call: axiosCustom.get<IMovieDetails>(`movie/${movieId}`, { 
        signal: controller.signal,
        params: {
          api_key: API_KEY
        }
    }),
    controller
  };
};



export const movieSimilar = (movieId: number) => {
  const controller = loadAbort();
  return {
    call: axiosCustom.get<IMovieDetails>(`movie/${movieId}/similar`, { 
        signal: controller.signal,
        params: {
          api_key: API_KEY
        }
    }),
    controller
  };
};

