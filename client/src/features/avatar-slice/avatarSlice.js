// @ts-nocheck
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  file: null,
  loadfile: false,
  statusavatarupload: 'uninitialized',
}

export const uploadAvatarFile = createAsyncThunk('file/uploadFile', async(formData, {rejectWithValue, dispatch}) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/uploadavatar/avatar`, formData, {
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type":"multipart/form-data"
        }
      })
      dispatch(setAvatarFile(res.data))
    } catch (err) {
      console.log(err)
    }
})

export const avatarSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    setAvatarFile: (state, action) => {
      state.file = action.payload
      state.loadfile = false
    },
    setStatusFileUpload: (state, action) => {
      state.statusavatarupload = 'uninitialized'
    }
  },
  extraReducers: (builder) => {
    builder.addCase(uploadAvatarFile.pending, (state, action) => {
      state.statusavatarupload = 'loading';
      state.loadfile = true
    }),
    builder.addCase(uploadAvatarFile.fulfilled, (state, action) => {
      state.statusavatarupload = 'fulfilled';
    })
  }
})

export const {setAvatarFile, setStatusFileUpload} = avatarSlice.actions;
export default avatarSlice.reducer;
