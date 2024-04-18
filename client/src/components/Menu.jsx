// @ts-nocheck
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setNewCurrentPage } from '../features/posts-slice/postsSlice';
import { Myimage } from './Myimage';
import imptyImg from '../img/emptyback2.jpg'
import { useGetCategegoryDataQuery } from '../features/goodsApi';
import { getCount } from '../features/count-slice/countSlice';

const Menu = ({cat}) => {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.singlepost.post)
  const [posts, setPosts] = useState([]);
  const [currentpage, setCurrentpage] = useState(Number(localStorage.getItem('menu_currentpage')));
  const [allMenuPages, setAllMenuPages] = useState(null);
  const [loading, setLoading] = useState(false);
  const {data = [], error, isLoading, isError, isSuccess, isFetching, isUninitialized} = useGetCategegoryDataQuery({cat: cat, currentpage: currentpage - 1}, {skip: !loading});

  useEffect(() => {
    setTimeout(() => {
      setLoading(true)
    }, 0)
  }, [isUninitialized])


  useEffect(() => {
    if (cat !== undefined) {
      dispatch(getCount(`?cat=${cat}`))
    }
  }, [cat])


  useEffect(() => {
    if (Object.keys(data).length !==0) {
      setPosts(data.data)
      setAllMenuPages(data.pages)
    }
  }, [data])

  useEffect(() => {
    if (currentpage == 0) {
      setCurrentpage(1)
    }
  }, [currentpage])

  const handleNext = async() => {
    if (currentpage + 0 >= allMenuPages) {
      return
    }
      setCurrentpage((prev) => (prev + 1));
      dispatch(setNewCurrentPage(currentpage))
      localStorage.setItem('menu_currentpage', currentpage + 1)
  }

  if (isLoading || isUninitialized) {
    return (
      <div className='menu'>
        <div className="post" style={{alignItems: 'center'}}>
          <div>
              <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
          </div>
        </div>
      <div className='box-more'>
      </div>
    </div>
    )
  }

  return (
    <div className='menu'>
      <h1>Other posts you may like</h1>
      {posts && posts.map((post) => (
        <div className="post" key={post.id}>
          <Link className='link' to={`/post/${post.id}`}>
          <Myimage src={post?.sm} placeholderSrc={imptyImg} width='278.86' height='330' />
          </Link>
          <h2>{post.title}</h2>
          <Link className='link' to={`/post/${post.id}`}>
          <button>Read More</button>
          </Link>
        </div>
      ))}
      <div className='box-more'>
        <button className='btn-more' onClick={handleNext}>More</button>
      </div>
    </div>
  )
}

export default Menu
