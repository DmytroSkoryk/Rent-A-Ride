import { createSlice } from "@reduxjs/toolkit";
import { fetchAdverts, fetchAllMakes } from "./operations";

const advertsSlice = createSlice({
  name: "adverts",
  initialState: {
    advertsData: [],
    makesData: [],
    isLoading: false,
    error: null,
    currentPage: 1,
    limit: 8,
    selectedFavoriteCards: [],
  },
  reducers: {
    updateLimit: (state, action) => {
      state.limit = action.payload;
    },
    addSelectedFavoriteCard: (state, action) => {
      state.selectedFavoriteCards.push(action.payload);
    },
    removeSelectedFavoriteCard: (state, action) => {
      const cardIdToRemove = action.payload;
      state.selectedFavoriteCards = state.selectedFavoriteCards.filter(
        (card) => card.id !== cardIdToRemove
      );
    },
    updateSelectedFavoriteCard: (state, action) => {
      state.selectedFavoriteCards = action.payload;
    },
    fetchAllMakesSuccess: (state, action) => {
      state.makesData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdverts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAdverts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchAdverts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.advertsData = action.payload;
      })
      .addCase(fetchAllMakes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllMakes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllMakes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.makesData = action.payload;
      });
  },
});

export const {
  updateLimit,
  addSelectedFavoriteCard,
  removeSelectedFavoriteCard,
  updateSelectedFavoriteCard,
  fetchAllMakesSuccess,
} = advertsSlice.actions;

export default advertsSlice.reducer;
