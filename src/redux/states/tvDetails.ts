import { createSlice } from '@reduxjs/toolkit';
import { ITvDetails } from '../../models/tv.model';

export const TvDetailsEmptyState: ITvDetails = {
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
    createTvDetails: (state, action) => action.payload,
    resetTvSelected: () => TvDetailsEmptyState
  }
});

export const { createTvDetails, resetTvSelected } = tvDetailsSlice.actions;

export default tvDetailsSlice.reducer;
