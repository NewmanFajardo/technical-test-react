import { ITv, ITvDetails } from "../models/tv.model";

export const tvAdapter = (tv: any): ITv[] => {
  return tv && tv.data && tv.data?.results ? 
    tv.data?.results?.map( (tv: any) => (
      {
        id: tv.id,
        adult: tv.adult ?? false,
      }
    ))
  :
    []
};

export const tvDetailsAdapter = (tv: any): ITvDetails => {
  return tv && tv.data ? {
      id: tv.data.id,
      video: tv.data.video,
      voteAverage: tv.data.vote_average,
      voteCount: tv.data.vote_count,
      overview: tv.data.overview,
      name: tv.data.name,
    }
  :
    {
      id: 0,
      video: false,
      voteAverage: 0,
      voteCount: 0,
      overview: '',
      name: '',
    }
};

export const tvSimilarsAdapter = (similar: any): ITvDetails[] => {
  return similar && similar.data && similar.data?.results ? 
    similar.data?.results?.map( (tv: any) => (
      {
        id: tv.id,
        video: tv.video,
        voteAverage: tv.vote_average,
        voteCount: tv.vote_count,
        overview: tv.overview,
        name: tv.name,
      }
    ))
  :
    []
};
  