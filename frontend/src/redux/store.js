import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice"; // We'll create this next

const store = configureStore({
  reducer: {
    auth: authSlice, // Adding the authentication reducer
  },
});


export {store};
