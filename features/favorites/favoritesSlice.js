import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: [],
  reducers: {
    toggleFavorite: (favorites, action) => {
      if (favorites.includes(action.payload)) {
        //action.paylaod is expected to be campsiteID
        return favorites.filter((favorite) => favorite !== action.payload);
      } else {
        favorites.push(action.payload);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions; // allows our components access and dispatch this new action

export const favoritesReducer = favoritesSlice.reducer;
