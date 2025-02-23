import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import resignationReducer from "./slices/resignationSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    resignation: resignationReducer,
  },
});

export default store;
