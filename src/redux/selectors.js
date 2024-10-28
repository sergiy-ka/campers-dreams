export const selectCampers = (state) => state.campers.items;
export const selectIsLoading = (state) => state.campers.isLoading;
export const selectError = (state) => state.campers.error;
export const selectCurrentCamper = (state) => state.campers.currentCamper;
export const selectFavorites = (state) => state.campers.favorites;
export const selectHasMore = (state) => state.campers.hasMore;
export const selectCurrentPage = (state) => state.campers.currentPage;
export const selectFilters = (state) => state.filter;
