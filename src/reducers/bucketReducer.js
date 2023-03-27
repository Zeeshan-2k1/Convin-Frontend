import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { axiosInstance } from 'axiosInstance';

import { BucketURL } from 'utils/constants';

export const getBuckets = createAsyncThunk(
  'bucket/getBuckets',
  async (name, thunkAPI) => {
    try {
      const response = await axiosInstance(BucketURL);
      if (response.status !== 200) throw response;
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Something went wrong');
    }
  }
);

export const bucketSlice = createSlice({
  name: 'bucket',
  initialState: {
    buckets: [],
    isLoading: true,
    error: undefined,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBuckets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBuckets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.buckets = action.payload;
      })
      .addCase(getBuckets.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default bucketSlice.reducer;
