import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  unit: localStorage.getItem('unit') || 'C',
  favorites: JSON.parse(localStorage.getItem('favorites')) || []
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setUnit: (state, action) => {
      state.unit = action.payload;
      localStorage.setItem('unit', action.payload);
    },
    toggleFavorite: (state, action) => {
      const city = action.payload;
      if (state.favorites.includes(city)) {
        state.favorites = state.favorites.filter(f => f !== city);
      } else {
        state.favorites.push(city);
      }
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    }
  },
});

export const { setUnit, toggleFavorite } = settingsSlice.actions;
export const store = configureStore({
  reducer: { settings: settingsSlice.reducer },
});