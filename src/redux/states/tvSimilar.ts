import { createSlice } from '@reduxjs/toolkit';
import { ITvDetails } from '../../models/tv.model';

export const TvSimilarEmptyState: ITvDetails[] = [];

export const tvSimilarSlice = createSlice({
  name: 'tvSimilar',
  initialState: TvSimilarEmptyState,
  reducers: {
    createTvSimilar: (state, action) => action.payload,
    resetTvSilimar: () => TvSimilarEmptyState
  }
});

export const { createTvSimilar, resetTvSilimar } = tvSimilarSlice.actions;

export default tvSimilarSlice.reducer;
