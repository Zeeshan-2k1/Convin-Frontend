import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { axiosInstance } from 'axiosInstance';

import { BucketURL } from 'utils/constants';

export const getPlayCards = createAsyncThunk(
  'playCard/getPlayCards',
  async (name, thunkAPI) => {
    try {
      const response = await axiosInstance(BucketURL);
      if (response.status !== 200) throw response;
      let playCards = [];
      response.data.forEach((item) => {
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
