// @ts-nocheck
import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  load: false,
  status: 'uninitialized',
  currentUser: JSON.parse(localStorage.getItem('user')) || null,
  err: null,
  useravatar: null
}

export const userLogin = createAsyncThunk('currentUser/userLogin', async(inputs, {rejectWithValue, dispatch}) => {
  try {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`,
    inputs,
    {withCredentials: true});
    localStorage.setItem('token', res.data?.accessToken)
    dispatch(setUser(res.data?.userdata))
  } catch (error) {
    dispatch(setUserError(error.response.data))
  }
})

export const userLogout = createAsyncThunk('currentUser/userLogout', async(_, {rejectWithValue, dispatch}) => {
  try {
    await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/logout`,
    _,
    {withCredentials: true}
    );
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    dispatch(setUserNull(null))
  } catch (err) {
    console.log(err)
  }
})

export const authSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload
      state.useravatar = action.payload.img
      state.load = false
    },
    setUserNull: (state, action) => {
      state.currentUser = action.payload
      state.load = false
    },
    setUserError: (state, action) => {
      state.err = action.payload
      state.load = false
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state, action) => {
      state.status = 'loading';
      state.load = true
    }),
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.status = 'fulfilled';
    })
  }
})

export const {setUser, setUserNull, setUserError} = authSlice.actions;
export default authSlice.reducer;
