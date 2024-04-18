// @ts-nocheck
import React, { useEffect, useState } from 'react'
import Logo from '../img/logo.png'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../features/auth-slice/authSlice';

export const Navbar = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser)
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    if (currentUser !== null) {
      setUserName(currentUser)
    } else {
      setUserName(null)
    }
  }, [currentUser])

  return (
    <div className='navbar'>
      <div className='container'>
        <div id='logo' className="logo">
          <Link to={'/'} onClick={() => location.pathname('/')}>
          <img src={Logo} alt="" />
          </Link>
        </div>
        <div id='links' className="links">
          <Link className='link' to={'/?cat=art'}>
            <h6>ART</h6>
          </Link>
          <Link className='link' to={'/?cat=science'}>
            <h6>SCIENCE</h6>
          </Link>
          <Link className='link' to={'/?cat=technology'}>
            <h6>TECHNOLOGY</h6>
          </Link>
          <Link className='link' to={'/?cat=cinema'}>
            <h6>CINEMA</h6>
          </Link>
          <Link className='link' to={'/?cat=design'}>
            <h6>DESIGN</h6>
          </Link>
          <Link className='link' to={'/?cat=food'}>
            <h6>FOOD</h6>
          </Link>
          <Link to={'/profile'}>
            <span>{userName?.username}</span>
          </Link>
          {userName ?
          <span onClick={() => dispatch(userLogout())}>Logout</span> :
          <Link className='link' to='/login'>Login</Link>}
          {currentUser !== null ?
          <span className='write'>
            <Link className='link' to={'/write'}>Write</Link>
          </span> : null}
        </div>
      </div>
    </div>
  )
}
