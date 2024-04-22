// @ts-nocheck
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  post: {},
  load: false,
  status: 'uninitialized',
}

export const getSinglePost = createAsyncThunk('post/getSinglePost', async(postId, {rejectWithValue, dispatch}) => {
  // setTimeout(async() => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts/${postId}`)
      localStorage.setItem('category', res.data.cat)
      dispatch(setSinglePost(res.data))
    } catch (err) {
      console.log(err)
    }
  // }, 1000);
})

export const singlePostSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setSinglePost: (state, action) => {
      state.post = action.payload
      state.load = false
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSinglePost.pending, (state, action) => {
      state.status = 'loading';
      state.load = true
    }),
    builder.addCase(getSinglePost.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.load = false
    })
  }
})

export const {setSinglePost} = singlePostSlice.actions;
export default singlePostSlice.reducer;
