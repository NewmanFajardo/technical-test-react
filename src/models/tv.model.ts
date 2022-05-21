export interface ITv {
  id: number;
  adult: boolean;
}

export interface ITvDetails {
  video: boolean
  voteAverage: number
  voteCount: number
  overview: string
  name: string
  popularity?: number
}