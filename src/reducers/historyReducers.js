import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { axiosInstance } from 'axiosInstance';

import { HistroyURL } from 'utils/constants';

export const getHistory = createAsyncThunk(
  'history/getHistory',
  async (name, thunkAPI) => {
    try {
      const response = await axiosInstance.get(HistroyURL);
      if (response.status !== 200) throw response;
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue('Something went wrong');
    }
  }
);

export const historySlice = createSlice({
  name: 'history',
  initialState: {
    list: [],
    isLoading: true,
    error: undefined,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHistory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(getHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default historySlice.reducer;
