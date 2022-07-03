// Варіант 1
import { configureStore, createAction, createReducer } from '@reduxjs/toolkit';

const parsedContacts = JSON.parse(localStorage.getItem('contacts'));

export const addItem = createAction('items/add');
export const removeItem = createAction('items/remove');

export const setFilter = createAction('filter/set');

const items = createReducer(parsedContacts ?? [], {
  [addItem]: (state, action) => [action.payload, ...state],
  [removeItem]: (state, action) =>
    state.filter(item => item.id !== action.payload),
});
const filter = createReducer('', {
  [setFilter]: (state, action) => (state = action.payload),
});

export const store = configureStore({
  reducer: { items, filter },
});

// Варіант 2

// import { configureStore, createAction, createReducer } from '@reduxjs/toolkit';

// const parsedContacts = JSON.parse(localStorage.getItem('contacts'));

// export const addItem = createAction('items/add');
// export const removeItem = createAction('items/remove');

// export const setFilter = createAction('filter/set');

// const items = createReducer(parsedContacts ?? [], {
//   [addItem]: (state, action) => [action.payload, ...state],
//   [removeItem]: (state, action) =>
//     state.filter(item => item.id !== action.payload),
// });
// const filter = createReducer('', {
//   [setFilter]: (state, action) => (state = action.payload),
// });

// export const store = configureStore({
//   reducer: { items, filter },
// });
