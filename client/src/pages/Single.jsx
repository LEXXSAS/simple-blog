// @ts-nocheck
import React, { useEffect, useState} from 'react'
import Edit from '../img/edit.png'
import Delete from '../img/delete.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Menu from '../components/Menu'
import AvatarImg from '../img/bgImv4.png'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo, setStatusUserInfoErrorNull } from '../features/user-info/userInfoSlice';
import { setLoadImage, setLoadImageDefault } from '../features/single-image/singleImageSlice';
import { userLogout } from '../features/auth-slice/authSlice'
import { getSinglePost } from '../features/single-post-slice/singlePostSlice';
import { deleteSinglePost, deletePostStatusNull } from '../features/delete-post-slice/deletePostSlice';
import {Myimage} from '../components/Myimage'
import { setNewPageZero, setNewCurrentPage } from '../features/posts-slice/postsSlice'
import Info from '../components/Info'
import { setInformationNull } from '../features/write-slice/writeSlice';
import {API_URL} from '../../src/config'
import { setInfoReducer } from '../features/info-slice/infoSlice';

const Single = () => {
  const dispatch = useDispatch();
  const userinfo = useSelector((state) => state.userinfo.userinfo)
  const singleimage = useSelector((state) => state.singleimage.loadimage)
  const errormessage = useSelector((state) => state.userinfo.errormessage)
  const statusdeletepost = useSelector((state) => state.deletesinglepost.status)
  const post = useSelector((state) => state.singlepost.post)
  const load = useSelector((state) => state.singlepost.load)
  const currentUser = useSelector((state) => state.user.currentUser)
  const avatar = post.userImg ? `${API_URL + post.userImg}` : AvatarImg
  const information = useSelector((state) => state.write.infoaboutaddorupdateapost)
  const [postimage, setPostImage] = useState(false);
  const [info, setInfo] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split('/')[2]

  function ScrollToTopOnMount() {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  
    return null;
  }

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('user')) !== null && localStorage.getItem('token') !== null) {
      dispatch(getUserInfo())
    } 
  }, [])

  useEffect(() => {
    if (errormessage !== null && errormessage === 'Not authenticated!') {
      dispatch(userLogout())
    } 
    else {
      if (userinfo !== null) {
        const userinfoforlocal = JSON.stringify(userinfo)
        JSON.stringify(localStorage.setItem('user', userinfoforlocal))
      }
      return () => {
        dispatch(setStatusUserInfoErrorNull())
      }
    }
  }, [userinfo, errormessage])

  useEffect(() => {
    dispatch(getSinglePost(postId))
  }, [postId]);

  useEffect(() => {
    if (statusdeletepost === 'fulfilled') {
      dispatch(setInfoReducer('deleted'))
      navigate('/')
    }
    return () => {
      dispatch(deletePostStatusNull())
    }
  }, [statusdeletepost])

  const postDeleted = () => {
    dispatch(deleteSinglePost(postId))
  }

  const handleDelete = async() => {
    postDeleted()
  }

  useEffect(() => {
      localStorage.setItem('starnewpage', 0)
      dispatch(setNewPageZero())
      dispatch(setNewCurrentPage(1))
  }, []);

  useEffect(() => {
    if (information !== '') {
      if (
         information === 'пост был удален'
      ) {
        console.log('information', information)
        setInfo(information)
      }
    }
    return () => {
      dispatch(setInformationNull())
      setInfo('')
    }
  }, [information])

  useEffect(() => {
    if (post?.xl !== '' && post?.xl !== null) {
      setPostImage(false)
    } else {
      setPostImage(true)
    }
    return () => {
      setPostImage(false)
    }
  }, [post])

  console.log('postimage', postimage)

  if (info !== '') {
    return <Info info={info} />
  }

  if (load) {
    return (
      <div className='single'>
      <div className="content">
        <div className="user">
            <div className="info">
              <span></span>
            </div>
        </div>
        <h1></h1>
          <div id='single-desc' style={{minHeight: '100vh', flexGrow: '1'}}>
              <div style={{display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center'}}>
                  <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
              </div>
          </div>
      </div>
      <Menu />
    </div>
    )
  }

  if (post.length < 1) {
    return (
      <div className='single'>
      <div className="posts">
          <div id='post' className='post' key="">
            <div className="content">
              <h1 id='home-title'></h1>
              <div id='home-desc' style={{flexGrow: '1'}}>
                <h1>Пока тут ничего нет...</h1>
              </div>
            </div>
          </div>
      </div>
    </div>
    )
  }

  return (
    <div className='single'>
      <ScrollToTopOnMount />
      <div className="content">
            <div>
              <Myimage src={post?.xl} placeholderSrc={post?.sm} width='695.71' />
            </div>
        {singleimage || postimage ?
        <>
        <div className="user">
            <img id='avatar-img' src={avatar} alt="avatar" />
            <div className="info">
              <span>{post?.username}</span>
              <p>Posted {moment(post.date).fromNow()}</p>
            </div>
            {currentUser !== null ? currentUser.username === post?.username &&
            (
            <div className="edit">
              <Link to={`/write?edit=${post.id}`} state={post}>
                <img src={Edit} alt="" />
              </Link>
              <img onClick={handleDelete} src={Delete} alt="" />
            </div>
            )
            : null}
        </div>
        <h1>{post.title}</h1>
        <div
          style={{flexGrow: '1'}}
          id='home-desc'
          dangerouslySetInnerHTML={{__html: post.desc}}
          >
          </div>
          </>
          : null}
      </div>
      <Menu cat={post.cat} />
    </div>
  )
}

export default Single
