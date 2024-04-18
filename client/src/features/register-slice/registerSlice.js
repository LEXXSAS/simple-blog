// @ts-nocheck
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  load: false,
  status: 'uninitialized',
  registerdata: null, 
  err: null
}

export const userRegister = createAsyncThunk('registerdata/userLogin', async(inputs, {rejectWithValue, dispatch}) => {
  try {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, inputs);
    dispatch(setRegister(res.data))
  } catch (error) {
    console.log(error)
    dispatch(setRegisterError(error.response.data))
  }
})

export const registerSlice = createSlice({
  name: 'registerdata',
  initialState,
  reducers: {
    setRegister: (state, action) => {
      state.registerdata = action.payload
      state.load = false
    },
    setRegisterError: (state, action) => {
      state.err = action.payload
      state.load = false
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userRegister.pending, (state, action) => {
      state.status = 'loading';
      state.load = true
    }),
    builder.addCase(userRegister.fulfilled, (state, action) => {
      state.status = 'fulfilled';
    })
  }
})

export const {setRegister, setRegisterError} = registerSlice.actions;
export default registerSlice.reducer;
