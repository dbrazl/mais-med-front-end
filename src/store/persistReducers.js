import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
  const persistedReducer = persistReducer(
    {
      key: 'mais-med',
      storage,
      whitelist: ['menu'],
    },
    reducers
  );

  return persistedReducer;
};
