import { createSlice } from '@reduxjs/toolkit';

// Забираємо дані з localStorage
const parsedContacts = JSON.parse(localStorage.getItem('contacts'));

const itemsSlice = createSlice({
  name: 'items',
  initialState: parsedContacts ?? [],
  reducers: {
    addItem: (state, action) => [action.payload, ...state],
    removeItem: (state, action) =>
      state.filter(item => item.id !== action.payload),
  },
});

export const { addItem, removeItem } = itemsSlice.actions;

export default itemsSlice.reducer;
