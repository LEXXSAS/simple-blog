// @ts-nocheck
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo, setStatusUserInfoErrorNull } from '../features/user-info/userInfoSlice';
import { userLogout } from '../features/auth-slice/authSlice'
import { uploadFile, updatePost, writePost, setFileNull, setStatusFileUploadNull, setInformationNull, setInformation } from '../features/write-slice/writeSlice';
import { setInfoReducer } from '../features/info-slice/infoSlice';
import Info from '../components/Info';

export const Write = () => {
  const dispatch = useDispatch();
  const userinfo = useSelector((state) => state.userinfo.userinfo)
  const errormessage = useSelector((state) => state.userinfo.errormessage)
  const fileUpload = useSelector((state) => state.write.file)
  const statusfileupload = useSelector((state) => state.write.statusfileupload)
  const information = useSelector((state) => state.write.infoaboutaddorupdateapost)

  const state = useLocation().state;
  const location = useLocation().pathname;
  const [value, setValue] = useState(state?.desc || '');
  const [title, setTitle] = useState(state?.title || '');
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || 'art');
  const [stateImg, setStateImg] = useState(state?.xl || '');
  const [info, setInfo] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('user')) !== null || localStorage.getItem('token') !== null) {
        dispatch(getUserInfo())
    } return () => {
      dispatch(setStatusUserInfoErrorNull())
    }
  }, [])
  
  useEffect(() => {
    if (errormessage !== null && errormessage === 'Not authenticated!') {
      dispatch(userLogout())
    } 
    return () => {
      dispatch(setStatusUserInfoErrorNull())
    }
  }, [userinfo, errormessage])

  // useEffect(() => {
  //   if (JSON.parse(localStorage.getItem('user')) !== null && localStorage.getItem('token') !== null) {
  //     dispatch(getUserInfo())
  //   } 
  // }, [])

  // useEffect(() => {
  //   if (errormessage !== null && errormessage === 'Not authenticated!' || localStorage.getItem('token') === null) {
  //     dispatch(userLogout())
  //     navigate('/')
  //   } else {
  //     if (userinfo !== null) {
  //       const userinfoforlocal = JSON.stringify(userinfo)
  //       JSON.stringify(localStorage.setItem('user', userinfoforlocal))
  //     }
  //   }
  // }, [userinfo, errormessage])
  
  const upload = async() => {
    if (file !== null) {
      const formData = new FormData();
      formData.append('file', file);
      dispatch(uploadFile(formData))
    } else {
      if (state == null && fileUpload == null && title !== '' && value !== '') {
        dispatch(writePost({title, desc: value, cat, img: stateImg, date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")}))
        dispatch(setInformation('пост создан без добавления изображения'))
        dispatch(setInfoReducer('created'))
      } else if (state !== null && fileUpload == null && title !== '' && value !== '') {
        dispatch(updatePost({state, title, desc: value, cat, img: stateImg}))
        dispatch(setInformation('пост обновлен без добавления изображения'))
        dispatch(setInfoReducer('updated'))
      }
    }
  }

  useEffect(() => {
    if (statusfileupload === 'fulfilled') {
      if (fileUpload !== null) {
        if (state !== null && title !== '' && value !== '') {
          dispatch(updatePost({state, title, desc: value, cat, img: fileUpload}))
          dispatch(setInformation('пост обновлен с добавлением изображения'))
          dispatch(setInfoReducer('updated'))
        } else {
          if (title !== '' && value !== '') {
            dispatch(writePost({title, desc: value, cat, img: fileUpload, date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")}))
            dispatch(setInformation('пост создан с добавлением изображения'))
            dispatch(setInfoReducer('created'))
          }
        }
      }
    }
    return () => {
      dispatch(setFileNull())
      dispatch(setStatusFileUploadNull())
    }
  }, [statusfileupload])

  const handleClick = async(e) => {
    e.preventDefault();
    await upload()
  }

  useEffect(() => {
    dispatch(setInformationNull())
    setInfo('')
  }, [])

  useEffect(() => {
    if (information !== '') {
      if (
         information === 'пост создан с добавлением изображения'
      || information === 'пост обновлен с добавлением изображения'
      || information === 'пост обновлен без добавления изображения'
      || information === 'пост создан без добавления изображения'
      ) {
        setInfo(information)
        setTimeout(() => {
          navigate('/')
        }, 0);
      }
    }
    return () => {
      dispatch(setInformationNull())
        setInfo('')
    }
  }, [information])

  if (info !== '') {
    return <Info info={info} />
  }

  return (
    <div className='add'>
      <div className="content">
        <input type="text" placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)}/>
        <div className="editorContainer">
          <ReactQuill className='editor' theme="snow" value={value} onChange={setValue} />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input style={{display: 'none'}} type="file" name="" id="file" onChange={(e) => setFile(e.target.files[0])}/>
          <label className='file' htmlFor="file">Upload Image</label>
          <div className="buttons">
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input type="radio" checked={cat === 'art'} name="cat" value="art" id='art' onChange={(e) => setCat(e.target.value)}/>
            <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === 'science'} name="cat" value="science" id='science' onChange={(e) => setCat(e.target.value)}/>
            <label htmlFor="science">Science</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === 'technology'} name="cat" value="technology" id='technology' onChange={(e) => setCat(e.target.value)}/>
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === 'cinema'} name="cat" value="cinema" id='cinema' onChange={(e) => setCat(e.target.value)}/>
            <label htmlFor="cinema">Cinema</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === 'design'} name="cat" value="design" id='design' onChange={(e) => setCat(e.target.value)}/>
            <label htmlFor="design">Design</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === 'food'} name="cat" value="food" id='food' onChange={(e) => setCat(e.target.value)}/>
            <label htmlFor="food">Food</label>
          </div>
        </div>
      </div>
    </div>
  )
}
