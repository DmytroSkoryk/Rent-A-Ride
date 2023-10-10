import { configureStore } from "@reduxjs/toolkit";
import advertsReducer from "./advertsSlice";

export const store = configureStore({
  reducer: {
    adverts: advertsReducer,
    currentPage: (state = 1, action) => {
      if (action.type === "adverts/updateCurrentPage") {
        return action.payload;
      }
      return state;
    },
    limit: (state = 8, action) => {
      return state;
    },
  },
});
