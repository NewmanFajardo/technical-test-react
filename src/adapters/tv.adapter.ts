export const tvAdapter = (tv: any) => {
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

export const tvDetailsAdapter = (tv: any) => {
  return tv.data ? {
      video: tv.data.video,
      voteAverage: tv.data.vote_average,
      voteCount: tv.data.vote_count,
      overview: tv.data.overview,
      name: tv.data.name,
    }
  :
    {
      video: false,
      voteAverage: 0,
      voteCount: 0,
      overview: '',
      name: '',
    }
};

export const tvSimilarsAdapter = (similar: any) => {
  return similar.data?.results ? 
    similar.data?.results?.map( (tv: any) => (
      {
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
  