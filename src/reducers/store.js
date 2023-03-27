import { configureStore } from '@reduxjs/toolkit';

import bucketReducer from './bucketReducer';
import historyReducers from './historyReducers';

export default configureStore({
  reducer: {
    bucket: bucketReducer,
    history: historyReducers,
  },
});
