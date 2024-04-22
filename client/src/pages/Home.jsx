// @ts-nocheck
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setNewPageZero, setNewCurrentPage } from '../features/posts-slice/postsSlice';
import { getCount } from '../features/count-slice/countSlice';
import { getUserInfo, setStatusUserInfoErrorNull, setUserInfoNull } from '../features/user-info/userInfoSlice';
import { userLogout } from '../features/auth-slice/authSlice'
import { setStatusFileUpload } from '../features/avatar-slice/avatarSlice';
import Post from '../components/Post';
import {useGetDataQuery, useUpdateDataMutation} from '../features/goodsApi.js'
import { Pagination } from '../components/Pagination.jsx';
import toast, { Toaster } from 'react-hot-toast';
import { setInfoDefaulReducer } from '../features/info-slice/infoSlice.js';

const customToastyDeleted = {
  display: 'flex',
  padding: '8px 16px',
  alignItems: 'center',
  fontFamily: 'cursive',
  backgroundColor: '#ad52ee43',
  borderRadius: '3px',
  fontSize: '1rem'
}

const customToastyUpdated = {
  display: 'flex',
  padding: '8px 16px',
  alignItems: 'center',
  fontFamily: 'cursive',
  backgroundColor: '#52eec243',
  borderRadius: '3px',
  fontSize: '1rem'
}

const customToastyCreated = {
  display: 'flex',
  padding: '8px 16px',
  alignItems: 'center',
  fontFamily: 'cursive',
  backgroundColor: '#ee835243',
  borderRadius: '3px',
  fontSize: '1rem'
}

const notifypostdeleted = (info) => toast.custom(<div
  style={customToastyDeleted}>
    <div>✅</div>
    <div>{info}</div>
  </div>,
  {
  duration: 2500,
  position: 'top-center'
});

const notifypostupdated = (info) => toast.custom(<div
  style={customToastyUpdated}>
    <div>✅</div>
    <div>{info}</div>
  </div>,
  {
  duration: 2500,
  position: 'top-center'
});

const notifypostcreated = (info) => toast.custom(<div
  style={customToastyCreated}>
    <div>✅</div>
    <div>{info}</div>
  </div>,
  {
  duration: 2500,
  position: 'top-center',
  icon: '✅',
  style: {
    background: '#52eebf43',
  }
});

export const Home = () => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.countpages.count)
  const currentUser = useSelector((state) => state.user.currentUser)
  const info = useSelector((state) => state.info.info)
  const userinfo = useSelector((state) => state.userinfo.userinfo)
  const errormessage = useSelector((state) => state.userinfo.errormessage)
  // const [userinfolocal, setUserInfoLocal] = useState(JSON.parse(localStorage.getItem('user')) || null)
  // const [token, setToken] = useState(localStorage.getItem('token') || null)
  const [postdata, setPosData] = useState([]);
  const [pagecount, setPageCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const cat = useLocation().search;
  const location = useLocation().pathname;
  const {data = [], error, isLoading, isError, isSuccess, isFetching, isUninitialized} = useGetDataQuery({cat: cat, countresult: count || '', currentpage: pagecount - 1}, {skip: !loading});
  const statusupdatepost = useSelector((state) => state.write.statusupdatepost)
  const statuspostdeleted = useSelector((state) => state.deletesinglepost.status)
  const [updateData] = useUpdateDataMutation()

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

  useEffect(() => {
    console.log('%cinfo =>', 'color: #52eec29a', info)
  }, [info])

  useEffect(() => {
    if (info !== null && info === 'created') {
      setTimeout(() => {
          notifypostcreated('Пост успешно создан')

      }, [250])
    } return () => {
      dispatch(setInfoDefaulReducer(null))
    }
  }, [info])

  useEffect(() => {
    if (info !== null && info === 'updated') {
      setTimeout(() => {
          notifypostupdated('Пост успешно обновлен')
          
      }, [250])
    } return () => {
      dispatch(setInfoDefaulReducer(null))
    }
  }, [info])

  useEffect(() => {
    if (info !== null && info === 'deleted') {
      setTimeout(() => {
          notifypostdeleted('Пост успешно удален')

      }, [250])
    } return () => {
      dispatch(setInfoDefaulReducer(null))
    }
  }, [info])

  useEffect(() => {
    if (statusupdatepost == 'fulfilled' || statuspostdeleted == 'fulfilled') {
      updateData({cat: cat, countresult: count || '', currentpage: pagecount - 1})
      dispatch(getCount(cat))
    } 
  }, [statusupdatepost, statuspostdeleted])

  useEffect(() => {
    if (count !== null) {
    setTimeout(() => {
      setLoading(true)
    }, 250)
    }
  }, [count])

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser))
  }, [currentUser]);

  useEffect(() => {
    if (location.split('/')[1] === '') {
      localStorage.setItem('starnewpage', 0)
      localStorage.setItem('category', cat.split('=')[1])
      dispatch(getCount(cat))
      dispatch(setNewPageZero())
      setPageCount(1);
      dispatch(setNewCurrentPage(1))
    }
  }, [cat]);

  useEffect(() => {
    if (data.length !== 0) {
      setPosData(data.rowperpage)
    }
  }, [data])

  useEffect(() => {
    localStorage.setItem('category', 'undefined')
    localStorage.setItem('menu_currentpage', 0)
    dispatch(setStatusFileUpload())
  }, [])

  if (isError) {
    console.log('error', error)
    return (
      <div style={{minHeight: 'calc(100vh - 70px)', marginTop: '1rem'}}>
      <br/>
      <h1 id='home-title'></h1>
      <div style={{flexGrow: '1'}} id='home-desc'>
        <h1 className='information-text'>{error}</h1>
        <br/>
        <hr/>
      </div>
    </div>
    )
  }

  if (isLoading || isUninitialized) {
    return (
      <div className='home'>
      <div className="posts">
          <div id='post' className='post' key="">
            <div className="content">
              <h1 id='home-title'></h1>
              <div id='home-desc'>
                <div style={{display: 'flex', gap: '10px', justifyContent: 'center', flexGrow: '1'}}>
                  <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
    )
  }

  if (isSuccess && data.data.length < 1) {
    return (
      <div className='home'>
      <div className="posts">
          <div id='post' className='post' key="">
            <div className="content">
              <h1 id='home-title'></h1>
              <div style={{flexGrow: '1'}} id='home-desc'>
                <h1>Пока тут ничего нет...</h1>
              </div>
            </div>
          </div>
      </div>
    </div>
    )
  }
  
  return (
    <>
    <div className='home'>
      <Toaster />
      <div className="posts">
        {data.data && data.data.map(post => (
          <Post props={{post}} key={post.id}/>
        ))}
        {postdata.length !== 0
        &&
        <Pagination
        postsPerPages={postdata}
        setCurrentPage={setPageCount}
        currentPage={pagecount}
        totalPosts={count}
        />}
      </div>
    </div>
    </>
  )
}
