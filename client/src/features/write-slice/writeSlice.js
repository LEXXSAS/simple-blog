// @ts-nocheck
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  writepostdata: null,
  updatepostdata: null,
  file: null,
  load: false,
  loadfile: false,
  writepostload: false,
  updatepostload: false,
  status: 'uninitialized',
  statusfileupload: 'uninitialized',
  statusupdatepost: 'uninitialized',
  statuswritepost: 'uninitialized',
  infoaboutaddorupdateapost: ''
}

export const uploadFile = createAsyncThunk('file/uploadFile', async(formData, {rejectWithValue, dispatch}) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/upload`, formData, {
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type":"multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      dispatch(setFile(res.data))
    } catch (err) {
      console.log(err)
    }
})

export const updatePost = createAsyncThunk('posts/updatePost', async(data, {rejectWithValue, dispatch}) => {
  const {state, title, desc, cat, img} = data;
  await axios.put(`${import.meta.env.VITE_API_URL}/api/posts/${state.id}`, {
    title,
    desc,
    cat,
    img
  },
  {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type":"multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }
)
})

export const writePost = createAsyncThunk('posts/writePost', async(data, {rejectWithValue, dispatch}) => {
  const {title, desc, cat, img, date} = data;
  await axios.post(`${import.meta.env.VITE_API_URL}/api/posts/`, {
    title,
    desc,
    cat,
    img,
    date
  },
  {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type":"multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }
)
})

export const writeSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    setFile: (state, action) => {
      state.file = action.payload
      state.loadfile = false
    },
    setFileNull: (state, action) => {
      state.file = null
      state.loadfile = false
    },
    setStatusFileUploadNull: (state, action) => {
      state.statusfileupload = 'uninitialized'
      state.loadfile = false
    },
    setWritePostData: (state, action) => {
      state.writepostdata = action.payload
      state.loadfile = false
    },
    setInformation: (state, action) => {
      state.infoaboutaddorupdateapost = action.payload
    },
    setInformationNull: (state, action) => {
      state.infoaboutaddorupdateapost = ''
    },
    setInformationWritePostNull: (state, action) => {
      state.statuswritepost = 'uninitialized'
    },
    setInformationUpdatePostNull: (state, action) => {
      state.statuswritepost = 'uninitialized'
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updatePost.pending, (state, action) => {
      state.statusupdatepost = 'loading';
      state.updatepostload = true
    }),
    builder.addCase(updatePost.fulfilled, (state, action) => {
      state.statusupdatepost = 'fulfilled';
    }),
    builder.addCase(writePost.pending, (state, action) => {
      state.statuswritepost = 'loading';
      state.updatepostload = true
    }),
    builder.addCase(writePost.fulfilled, (state, action) => {
      state.statuswritepost = 'fulfilled';
    }),
    builder.addCase(uploadFile.pending, (state, action) => {
      state.statusfileupload = 'loading';
      state.loadfile = true
    }),
    builder.addCase(uploadFile.fulfilled, (state, action) => {
      state.statusfileupload = 'fulfilled';
    })
  }
})

export const {setFile, setFileNull, setWritePostData, setStatusFileUploadNull, setInformation, setInformationNull, setInformationWritePostNull, setInformationUpdatePostNull} = writeSlice.actions;
export default writeSlice.reducer;
