import { createSlice } from '@reduxjs/toolkit';
import { ITvDetails } from '../../models/tv.model';

export const TvSelectedEmptyState: ITvDetails = {
  video: false,
  id: 0,
  voteAverage: 0,
  voteCount: 0,
  overview: '',
  name: '',
};

export const tvSelectedSlice = createSlice({
  name: 'tvSelected',
  initialState: TvSelectedEmptyState,
  reducers: {
    selectedTvReduce: (state, action) => action.payload,
    resetTvSelectedReduce: () => TvSelectedEmptyState
  }
});

export const { selectedTvReduce, resetTvSelectedReduce } = tvSelectedSlice.actions;

export default tvSelectedSlice.reducer;
