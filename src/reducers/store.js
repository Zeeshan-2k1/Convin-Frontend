import { configureStore } from '@reduxjs/toolkit';

import bucketReducer from './bucketReducer';
import historyReducers from './historyReducers';
import playCardReducer from './playCardReducers';

export default configureStore({
  reducer: {
    bucket: bucketReducer,
    playCard: playCardReducer,
    history: historyReducers,
  },
});
