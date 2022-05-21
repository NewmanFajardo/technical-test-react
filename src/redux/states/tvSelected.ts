import { createSlice } from '@reduxjs/toolkit';
import { ITv } from '../../models/tv.model';

export const TvSelectedEmptyState: ITv = {
    id: 0,
    adult: false
};

export const tvSelectedSlice = createSlice({
  name: 'tvSelected',
  initialState: TvSelectedEmptyState,
  reducers: {
    selectedTv: (state, action) => action.payload,
    resetTvSelected: () => TvSelectedEmptyState
  }
});

export const { selectedTv, resetTvSelected } = tvSelectedSlice.actions;

export default tvSelectedSlice.reducer;
