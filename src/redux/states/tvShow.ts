import { createSlice } from '@reduxjs/toolkit';
import { ITvDetails } from '../../models/tv.model';

export const TvShowEmptyState: ITvDetails[] = [];

export const tvShowSlice = createSlice({
  name: 'tvShow',
  initialState: TvShowEmptyState,
  reducers: {
    tvShowReduce: (state, action) => action.payload,
    resetTvShowReduce: () => TvShowEmptyState
  }
});

export const { tvShowReduce, resetTvShowReduce } = tvShowSlice.actions;

export default tvShowSlice.reducer;
