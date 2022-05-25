import { createSlice } from '@reduxjs/toolkit';
import { ITvDetails } from '../../models/tv.model';

export const TvDetailsEmptyState: ITvDetails = {
  id: 0,
  video: false,
  voteAverage: 0,
  voteCount: 0,
  overview: '',
  name: '',
};

export const tvDetailsSlice = createSlice({
  name: 'tvDetails',
  initialState: TvDetailsEmptyState,
  reducers: {
    tvDetailsReduce: (state, action) => action.payload,
    resetTvSelectedReduce: () => TvDetailsEmptyState
  }
});

export const { tvDetailsReduce, resetTvSelectedReduce } = tvDetailsSlice.actions;

export default tvDetailsSlice.reducer;
