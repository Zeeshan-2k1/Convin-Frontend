import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { useBucketSelector } from '../hooks/useBucketSelector';

export const getPlayCards = createAsyncThunk(
  'playCard/getPlayCards',
  async (name, thunkAPI) => {
    try {
      const { buckets } = useBucketSelector();
      let playCards = [];
      buckets.forEach((item) => {
        if (item.playCards) playCards = [...playCards, ...item.playCards];
      });
      return playCards;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue('Something went wrong');
    }
  }
);

export const playCardSlice = createSlice({
  name: 'playCard',
  initialState: {
    playCards: [],
    isLoading: true,
    error: undefined,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPlayCards.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPlayCards.fulfilled, (state, action) => {
        state.isLoading = false;
        state.playCards = action.payload;
      })
      .addCase(getPlayCards.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default playCardSlice.reducer;
