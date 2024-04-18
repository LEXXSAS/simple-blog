// @ts-nocheck
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: null
}

export const infoSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setInfoReducer: (state, action) => {
      state.info = action.payload
    },
    setInfoDefaulReducer: (state, action) => {
      state.info = action.payload
    }
  }
})

export const {setInfoReducer, setInfoDefaulReducer} = infoSlice.actions;
export default infoSlice.reducer;
