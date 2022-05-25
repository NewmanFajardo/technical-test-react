import { createSlice } from '@reduxjs/toolkit';
import { ITvDetails } from '../../models/tv.model';

export const TvSimilarEmptyState: ITvDetails[] = [];

export const tvSimilarSlice = createSlice({
  name: 'tvSimilar',
  initialState: TvSimilarEmptyState,
  reducers: {
    tvSimilarReduce: (state, action) => action.payload,
    resetTvSilimarReduce: () => TvSimilarEmptyState
  }
});

export const { tvSimilarReduce, resetTvSilimarReduce } = tvSimilarSlice.actions;

export default tvSimilarSlice.reducer;
