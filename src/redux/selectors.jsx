export const selectAdverts = (state) => state.adverts.advertsData;
export const selectIsLoading = (state) => state.adverts.isLoading;
export const selectError = (state) => state.adverts.error;
export const selectCurrentPage = (state) => state.adverts.currentPage;
export const selectLimit = (state) => state.adverts.limit;
export const selectFavoriteCards = (state) =>
  state.adverts.selectedFavoriteCards;

export const selectAllMakes = (state) => state.adverts.makesData;
