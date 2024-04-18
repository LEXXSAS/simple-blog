// @ts-nocheck
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  deleteload: false,
  status: 'uninitialized',
  deleteinformation: '',
}

export const deleteSinglePost = createAsyncThunk('deleteload/getSinglePost', async(postId, {rejectWithValue, dispatch}) => {
  try {
    const res = await axios.delete(`${import.meta.env.VITE_API_URL}/api/posts/${postId}`,
    {withCredentials: true}
    )
    dispatch(deletePost(res.data))
  } catch (err) {
    console.log(err)
  }
})

export const deletePostSlice = createSlice({
  name: 'deleteload',
  initialState,
  reducers: {
    deletePost: (state, action) => {
      state.deleteload = false,
      state.deleteinformation = action.payload
    },
    deletePostStatusNull: (state, action) => {
      state.status = 'uninitialized'
    }
  },
  extraReducers: (builder) => {
    builder.addCase(deleteSinglePost.pending, (state, action) => {
      state.status = 'loading';
      state.deleteload = true
    }),
    builder.addCase(deleteSinglePost.fulfilled, (state, action) => {
      state.status = 'fulfilled';
    })
  }
})

export const {deletePost, deletePostStatusNull} = deletePostSlice.actions;
export default deletePostSlice.reducer;
