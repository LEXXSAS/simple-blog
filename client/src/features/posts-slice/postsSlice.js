// @ts-nocheck
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  posts: [],
  postscategory: [],
  load: false,
  status: 'uninitialized',
  newcurrentpage: 1,
  rowperpage: null,
  error: null
}

export const getPostsWithCategory = createAsyncThunk('posts/getPosts', async({currentpage}, {rejectWithValue, dispatch, getState}) => {
    let cat = getState().singlepost.post.cat;
    try {
      if (currentpage !== null && cat !== '' && cat !== undefined) {
        console.log('cat in post', cat)
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts?currentpage=${currentpage}&cat=${cat}`)
        dispatch(setPostsCategory(res.data))
      } else {
        return;
      }
    } catch (err) {
      console.log(err)
    }
})

export const getPostsNextPage = createAsyncThunk('posts/getPostsNextPage', async({cat, currentpage, count}, {rejectWithValue, dispatch}) => {
    try {
      if (cat !== '') {
        cat = cat.split('=')[1];
      }
      currentpage++
      if (currentpage >= (count - 1)) {
        return
      }
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts/nextpage?currentpage=${currentpage}&cat=${cat}`)
        localStorage.setItem('starnewpage', res.data.starnewpage)
        dispatch(setPostsNextPosts(res.data))
    } catch (err) {
      console.log(err)
    }
})

export const getPostsPreviousPage = createAsyncThunk('posts/getPostsNextPage', async({cat, currentpage, count}, {rejectWithValue, dispatch}) => {
    try {
      if (cat !== '') {
        cat = cat.split('=')[1];
      }
      currentpage--
      if (currentpage <= 1) {
      // if (currentpage >= (count - 1)) {
        return
      }
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts/previouspage?currentpage=${currentpage}&cat=${cat}`)
        localStorage.setItem('starnewpage', res.data.starnewpage)
        dispatch(setPostsNextPosts(res.data))
    } catch (err) {
      console.log(err)
    }
})

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload.data
      state.rowperpage = action.payload.rowperpage
      state.load = false
    },
    setPostsCategory: (state, action) => {
      state.postscategory = action.payload.data
      state.rowperpage = action.payload.rowperpage
      state.load = false
    },
    setPostsNextPosts: (state, action) => {
      state.posts = action.payload.data
      state.newcurrentpage = action.payload.starnewpage
      state.load = false
    },
    setNewPage: (state, action) => {
      state.newcurrentpage = action.payload
    },
    setNewPageZero: (state, action) => {
      state.newcurrentpage = 1
    },
    setNewCurrentPage: (state, action) => {
      state.newcurrentpage = action.payload
    }
  }
})

export const {setPosts, setNewPage, setPostsNextPosts, setNewPageZero, setPostsCategory, setNewCurrentPage} = postSlice.actions;
export default postSlice.reducer;
