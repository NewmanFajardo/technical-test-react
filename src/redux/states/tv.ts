import { createSlice } from '@reduxjs/toolkit';
import { ITv } from '../../models/tv.model';

export const TvEmptyState: ITv[] = [];

export const tvSlice = createSlice({
  name: 'tv',
  initialState: TvEmptyState,
  reducers: {
    createTv: (state, action) => action.payload,
    modifyTv: (state, action) => ({ ...state, ...action.payload }),
    resetTv: () => TvEmptyState
  }
});

export const { createTv, modifyTv, resetTv } = tvSlice.actions;

export default tvSlice.reducer;
