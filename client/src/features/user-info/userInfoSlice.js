// @ts-nocheck
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  userinfo: null,
  load: false,
  statusloading: 'uninitialized',
  errormessage: null
}

export const getUserInfo = createAsyncThunk('user/getUserInfo', async(_, {rejectWithValue, dispatch}) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/userinfo`, _, {
        withCredentials: true
      })
      dispatch(setUserInfo(res.data))
    } catch (err) {
      dispatch(setStatusUserInfoError(err?.response?.data))
      // console.log(err)
    }
})

export const userInfoSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userinfo = action.payload
      state.load = false
    },
    setStatusUserInfoNull: (state, action) => {
      state.statusloading = 'uninitialized'
    },
    setStatusUserInfoError: (state, action) => {
      state.errormessage= action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserInfo.pending, (state, action) => {
      state.statusloading = 'loading';
      state.loadfile = true
    }),
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.statusloading = 'fulfilled';
    })
  }
})

export const {setUserInfo, setStatusUserInfoNull, setStatusUserInfoError} = userInfoSlice.actions;
export default userInfoSlice.reducer;
