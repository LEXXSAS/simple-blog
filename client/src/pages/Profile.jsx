// @ts-nocheck
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { setAvatarFile, uploadAvatarFile } from '../features/avatar-slice/avatarSlice';
import { getUserInfo, setStatusUserInfoErrorNull } from '../features/user-info/userInfoSlice';
import { userLogout } from '../features/auth-slice/authSlice'
import AvatarImg from '../img/bgImv4.png'
import {API_URL} from '../config'
import { useNavigate } from 'react-router-dom';

const customToastyUpdated = {
  display: 'flex',
  padding: '8px 16px',
  alignItems: 'center',
  fontFamily: 'cursive',
  backgroundColor: '#fff',
  border: '1px solid #b9e7e7',
  color: 'black',
  borderRadius: '3px',
  fontSize: '1rem'
}

const notifyok = () => toast.custom(<div
  style={customToastyUpdated}>
    <div>✅</div>
    <div>Аватар загружен!</div>
  </div>,
  {
  duration: 2000,
  position: 'top-center'
});

const notify = () => toast.error('Добавьте файл', {
  duration: 2000,
  position: 'top-center'
});

const Profile = () => {
  const dispatch = useDispatch();
  const statusavatarupload = useSelector((state) => state.avatar.statusavatarupload)
  const currentUser = useSelector((state) => state.user.currentUser)
  const userinfo = useSelector((state) => state.userinfo.userinfo)
  const errormessage = useSelector((state) => state.userinfo.errormessage)
  const [ava, setAva] = useState(JSON.parse(localStorage.getItem('user')) || null)
  const [avatar, setAvatar] = useState(AvatarImg)
  const resultuploadfile = useSelector((state) => state.avatar.file)
  const [file, setFile] = React.useState(null);
  const [imageUrl, setImageUrl] = React.useState(null);

  
  useEffect(() => {
    if (JSON.parse(localStorage.getItem('user')) !== null || localStorage.getItem('token') !== null) {
        dispatch(getUserInfo())
    } return () => {
      dispatch(setStatusUserInfoErrorNull())
    }
  }, [ava])
  
  useEffect(() => {
    if (errormessage !== null && errormessage === 'Not authenticated!') {
      dispatch(userLogout())
    }
    else {
      if (userinfo !== null) {
        const userinfoforlocal = JSON.stringify(userinfo)
        JSON.stringify(localStorage.setItem('user', userinfoforlocal))
      }
    }
    return () => {
      dispatch(setStatusUserInfoErrorNull())
    }
  }, [userinfo, errormessage])

  // useEffect(() => {
  //   if (errormessage !== null && errormessage === 'Not authenticated!' || localStorage.getItem('token') === null) {
  //     dispatch(userLogout())
  //   } 
  //   else {
  //     if (userinfo !== null) {
  //       const userinfoforlocal = JSON.stringify(userinfo)
  //       JSON.stringify(localStorage.setItem('user', userinfoforlocal))
  //     }
  //   }
  // }, [userinfo, errormessage])

  const navigate = useNavigate();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('user'))?.img !== undefined && JSON.parse(localStorage.getItem('user'))?.img !== null && JSON.parse(localStorage.getItem('user'))?.img !== '') {
      setAvatar(`${API_URL}` + JSON.parse(localStorage.getItem('user')).img)
    } return () => {
      dispatch(getUserInfo())
    }
  }, [])

  useEffect(() => {
    if (currentUser == null) {
      navigate('/')
    }
  }, [currentUser])

  useEffect(() => {
    if (resultuploadfile !== null) {
      setAva(resultuploadfile?.file?.avatarName)
      if (currentUser !== null) {
        let copyUser = {...currentUser};
        copyUser.img = resultuploadfile?.file?.avatarName
        if (copyUser.img !== undefined) {
          localStorage.setItem('user', JSON.stringify(copyUser))
        }
      }
    }
  }, [resultuploadfile])

  useEffect(() => {
    if (file !== null) {
      const reader = new FileReader();
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        setImageUrl(reader.result)
      }
    }
  }, [file])

  useEffect(() => {
    if (statusavatarupload === 'fulfilled') {
      notifyok()
      dispatch(setAvatarFile({statusavatarupload: 'uninitialized', file: resultuploadfile}))
      dispatch(getUserInfo())
    } return () => {
      dispatch(setAvatarFile({statusavatarupload: 'uninitialized'}))
    }
  }, [statusavatarupload])

  const uploadAvatar = async() => {
    if (file !== null) {
      const formData = new FormData();
      formData.append('file', file);
      dispatch(uploadAvatarFile(formData))
      setFile(null)
    } else {
      notify()
    }
  }

  const handleApplyAvatar = async(e) => {
    e.preventDefault();
    await uploadAvatar()
  }

  return (
    <div className='profile'>
      <h1>Profile</h1>
      {imageUrl == null ?
      <label>
      <img style={{borderRadius: '50%', width: '120px', height: '120px', objectFit: 'cover'}} id='avatar-img' src={avatar} alt="avatar" 
      />
      <input style={{display: 'none'}} hidden type="file" name="" id="file" onChange={(e) => setFile(e.target.files[0])}/>
      </label>
      :
      <img style={{borderRadius: '50%', width: '120px', height: '120px', objectFit: 'cover'}} id='avatar-img' src={imageUrl} alt="avatar" />
      }
      <input style={{display: 'none'}} type="file" name="" id="file" onChange={(e) => setFile(e.target.files[0])}/>
      <label className='btn-more' htmlFor="file">Upload avatar</label>
      <div className="buttons">
        <button className='btn-more' onClick={handleApplyAvatar}>Apply</button>
      </div>
      <Toaster/>
    </div>
  )
}

export default Profile
