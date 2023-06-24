import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  counting: 0,
  saved: [],
};

export const countSlice = createSlice({
  name: "count",
  initialState: initialState,
  reducers: {
    setIncrase(state, action) {
      const count = action.payload;
      state.counting++;
      return state;
    },
    removeCount(state, action) {
      return initialState;
    },
  },
});
