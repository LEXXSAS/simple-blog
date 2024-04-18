// @ts-nocheck
import { configureStore } from '@reduxjs/toolkit'
import postSlice from './features/posts-slice/postsSlice'
import authSlice from './features/auth-slice/authSlice'
import singlePostSlice from './features/single-post-slice/singlePostSlice'
import deletePostSlice from './features/delete-post-slice/deletePostSlice'
import registerSlice from './features/register-slice/registerSlice'
import writeSlice from './features/write-slice/writeSlice'
import countSlice from './features/count-slice/countSlice'
import avatarSlice from './features/avatar-slice/avatarSlice'
import userInfoSlice from './features/user-info/userInfoSlice'
import infoSlice from './features/info-slice/infoSlice'
import { dataApi } from './features/goodsApi'

export const store = configureStore({
  reducer: {
    userinfo: userInfoSlice,
    info: infoSlice,
    post: postSlice,
    user: authSlice,
    singlepost: singlePostSlice,
    deletesinglepost: deletePostSlice,
    register: registerSlice,
    write: writeSlice,
    countpages: countSlice,
    avatar: avatarSlice,
    [dataApi.reducerPath]: dataApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(dataApi.middleware)
})
