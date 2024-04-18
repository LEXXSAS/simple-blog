// @ts-nocheck
import React, { useEffect, useState} from 'react'
import Edit from '../img/edit.png'
import Delete from '../img/delete.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Menu from '../components/Menu'
import AvatarImg from '../img/bgImv4.png'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux';
import { getSinglePost } from '../features/single-post-slice/singlePostSlice';
import { deleteSinglePost } from '../features/delete-post-slice/deletePostSlice';
import {Myimage} from '../components/Myimage'
import { setNewPageZero, setNewCurrentPage } from '../features/posts-slice/postsSlice'
import Info from '../components/Info'
import { setInformationNull } from '../features/write-slice/writeSlice';
import {API_URL} from '../../src/config'
import { setInfoReducer } from '../features/info-slice/infoSlice';

const Single = () => {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.singlepost.post)
  const load = useSelector((state) => state.singlepost.load)
  const currentUser = useSelector((state) => state.user.currentUser)
  const avatar = post.userImg ? `${API_URL + post.userImg}` : AvatarImg
  const information = useSelector((state) => state.write.infoaboutaddorupdateapost)
  const [info, setInfo] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split('/')[2]

  useEffect(() => {
    dispatch(getSinglePost(postId))
  }, [postId]);

  const handleDelete = async() => {
    dispatch(deleteSinglePost(postId))
    dispatch(setInfoReducer('deleted'))
    navigate('/')
  }

  useEffect(() => {
    return () => {
      dispatch(setInfoReducer('deleted'))
    }
  }, [])

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
      <div className="content">
            <div>
              <Myimage src={post?.xl} placeholderSrc={post?.sm} width='695.71' />
            </div>
        <div className="user">
            <img id='avatar-img' src={avatar} alt="avatar" />
            <div className="info">
              <span>{post?.username}</span>
              <p>Posted {moment(post.date).fromNow()}</p>
            </div>
            {currentUser !== null ? currentUser.username === post?.username &&
            (<div className="edit">
              <Link to={`/write?edit=${post.id}`} state={post}>
                <img src={Edit} alt="" />
              </Link>
              <img onClick={handleDelete} src={Delete} alt="" />
            </div>) : null}
        </div>
        <h1>{post.title}</h1>
        <div
          style={{flexGrow: '1'}}
          id='home-desc'
          dangerouslySetInnerHTML={{__html: post.desc}}
          >
          </div>
      </div>
      <Menu cat={post.cat} />
    </div>
  )
}

export default Single
