// @ts-nocheck
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loadimage: false
}

export const singleImageSlice = createSlice({
  name: 'singleimagedata',
  initialState,
  reducers: {
    setLoadImage: (state, action) => {
      state.loadimage = true
    },
    setLoadImageDefault: (state, action) => {
      state.loadimage = false
    },
  }
})

export const {setLoadImage, setLoadImageDefault} = singleImageSlice.actions;
export default singleImageSlice.reducer;
