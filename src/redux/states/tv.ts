import { createSlice } from '@reduxjs/toolkit';
import { ITv } from '../../models/tv.model';

export const TvEmptyState: ITv[] = [];

export const tvSlice = createSlice({
  name: 'tv',
  initialState: TvEmptyState,
  reducers: {
    tvReduce: (state, action) => action.payload,
    resetTvReduce: () => TvEmptyState
  }
});

export const { tvReduce, resetTvReduce } = tvSlice.actions;

export default tvSlice.reducer;
