export const moviesAdapter = (movies: any) => {
  return movies.data?.results ? 
    movies.data?.results?.map( (movie: any) => (
      {
        id: movie.id,
        adult: movie.adult ?? false,
      }
    ))
  :
    []
};

export const movieDetailsAdapter = (movie: any) => {
  return movie.data ? {
      video: movie.data.video,
      voteAverage: movie.data.vote_average,
      voteCount: movie.data.vote_count,
      overview: movie.data.overview,
      title: movie.data.title,
    }
  :
    {
      video: false,
      voteAverage: 0,
      voteCount: 0,
      overview: '',
      title: '',
    }
};

export const movieSimilarsAdapter = (similar: any) => {
  return similar.data?.results ? 
    similar.data?.results?.map( (movie: any) => (
      {
        video: movie.video,
        voteAverage: movie.vote_average,
        voteCount: movie.vote_count,
        overview: movie.overview,
        title: movie.name,
      }
    ))
  :
    []
};
  