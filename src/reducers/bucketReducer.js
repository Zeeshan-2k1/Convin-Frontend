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
  },
  reducers: {
    addBucket: (state, { payload }) => {
      state.buckets = [...state.buckets, { ...payload }];
    },
    removeBucket: (state, { payload }) => {
      state.buckets = state.buckets.filter((item) => item.id !== payload);
    },
    updateBucket: (state, { payload }) => {
      state.buckets = state.buckets.map((item) => {
        if (item.id === payload.id) {
          return { ...item, ...payload };
        }
        return item;
      });
    },
    addPlayCard: (state, { payload }) => {
      state.buckets = state.buckets.map((item) => {
        if (item.id === payload.bucket) {
          return {
            ...item,
            playCards: item.playCards
              ? [...item.playCards, { ...payload }]
              : [{ ...payload }],
          };
        } else {
          return item;
        }
      });
    },
    removePlayCard: (state, { payload }) => {
      state.buckets = state.buckets.map((item) => {
        if (item.id === payload.bucket) {
          return {
            ...item,
            playCards: item.playCards.filter((item) => item.id !== payload.id),
          };
        } else {
          return item;
        }
      });
    },
    updatePlayCard: (state, { payload }) => {
      state.buckets = state.buckets.map((item) => {
        if (item.id === payload.bucket) {
          return {
            ...item,
            playCards: item.playCards.map((item) => {
              if (item.id === payload.id) {
                return { ...item, ...payload };
              } else {
                return item;
              }
            }),
          };
        } else {
          return item;
        }
      });
    },
  },
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

export const {
  addBucket,
  addPlayCard,
  removeBucket,
  removePlayCard,
  updateBucket,
  updatePlayCard,
} = bucketSlice.actions;
export default bucketSlice.reducer;
