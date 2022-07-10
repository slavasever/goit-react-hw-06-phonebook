// Варіант 1 (CreateSlice + redux-persist)

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import items from './items/slice';
import filter from './filter/slice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['filter'],
};

const rootReducer = combineReducers({ items, filter });

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// Варіант 2 (CreateAction, CreateReducer + localStorage)

// import { configureStore, createAction, createReducer } from '@reduxjs/toolkit';

// Забираємо дані з localStorage
// const parsedContacts = JSON.parse(localStorage.getItem('contacts'));

// export const addItem = createAction('items/add');
// export const removeItem = createAction('items/remove');
// const items = createReducer(parsedContacts ?? [], {
//   [addItem]: (state, action) => [action.payload, ...state],
//   [removeItem]: (state, action) =>
//     state.filter(item => item.id !== action.payload),
// });

// export const setFilter = createAction('filter/set');
// const filter = createReducer('', {
//   [setFilter]: (state, action) => (state = action.payload),
// });

// export const store = configureStore({
//   reducer: { items, filter },
// });
