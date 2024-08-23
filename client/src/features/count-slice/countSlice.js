// @ts-nocheck
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: 'uninitialized',
  count: null,
  countpagination: null,
  allpages: null
}

export const getCount = createAsyncThunk('count/getCount', async(cat, {rejectWithValue, dispatch}) => {
    try {
      if (cat !== '') {
        cat = cat.split('=')[1];
      } 
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts/count?cat=${cat}`, {
      })

      dispatch(setCount(res.data.count))
      dispatch(setCountAllPages(res.data.pages))
    } catch (err) {
      console.log(err)
    }
})

export const countSlice = createSlice({
  name: 'count',
  initialState,
  reducers: {
    setCount: (state, action) => {
      state.count = action.payload
    },
    setCountPagination: (state, action) => {
      state.countpagination = action.payload
    },
    setCountAllPages: (state, action) => {
      state.allpages = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCount.pending, (state, action) => {
      state.status = 'loading';
    }),
    builder.addCase(getCount.fulfilled, (state, action) => {
      state.status = 'fulfilled';
    })
  }
})

export const {setCount, setCountAllPages, setCountPagination} = countSlice.actions;
export default countSlice.reducer;
