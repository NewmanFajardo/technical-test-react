import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../redux/states/user";
import { AppStore } from "../redux/store";

export const store = configureStore<AppStore>({
  reducer: {
    user: userSlice.reducer
  }
});
