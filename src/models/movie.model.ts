export interface IMovie {
  id: number;
  adult: boolean;
}

export interface IMovieDetails {
  video: boolean
  voteAverage: number
  voteCount: number
  overview: string
  title: string
  popularity?: number
}