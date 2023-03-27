import { createSlice } from '@reduxjs/toolkit';

export const historySlice = createSlice({
  name: 'history',
  initialState: {
    list: [],
  },
  reducers: {
    addHistory: (state, { payload }) => {
      const playCard = state.list.find((item) => item.id === payload.id);
      if (playCard) {
        state.list = state.list.map((item) => {
          if (item.id === payload.id) {
            return { ...item, ...payload };
          } else {
            return item;
          }
        });
      } else {
        state.list = [...state.list, { ...payload }];
      }
    },
    removeHistory: (state, action) => {
      state.list = state.list.filter((item) => item.id !== action.payload);
    },
    updateHistory: (state, { payload }) => {
      state.list = state.list.map((item) => {
        if (item.id === payload.id) {
          return { ...item, ...payload };
        }
        return item;
      });
    },
  },
});

export const { addHistory, removeHistory, updateHistory } =
  historySlice.actions;
export default historySlice.reducer;
