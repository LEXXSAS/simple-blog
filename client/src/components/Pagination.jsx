/* eslint-disable react/prop-types */
// @ts-nocheck

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCountPagination } from "../features/count-slice/countSlice";
import { store } from "../store";

export const Pagination = ({totalPosts, postsPerPages, setCurrentPage, currentPage}) => {
  const allState = store.getState().countpages.countpagination;
  console.log('countpagination from store = ', allState)
  const [cur, setCur] = React.useState(1);
  const dispatch = useDispatch();

  const countpagination = useSelector((state) => state.countpages.countpagination)

  // useEffect(() => {
  //   console.log('cur = ', cur)
  // }, [cur])

  // console.log('countpagination = ', countpagination)

  const allPages = React.useMemo(() => {
  let pages = [];

  if (totalPosts.length !== 0) {
    // console.log('count / postdata =' ,Math.ceil(totalPosts/postsPerPages))
    for (let i = 1; i <= Math.ceil(totalPosts/postsPerPages); i++) {
      pages.push(i)
    }
  }

  return pages;
  }, [totalPosts])

  React.useEffect(() => {
    return () => {
      dispatch(setCountPagination(currentPage))
    }
  }, [currentPage])

  useEffect(() => {
    if (allState !== null) {
      setCurrentPage(allState)
    }
  }, [])


  return (
    <div className='pagination'>
      {allPages.map((page, index) => {
        return (
          <button key={index} onClick={() => (setCurrentPage(page), setCur(page))}
          className={page == currentPage ? 'active' : ''}
          >
            {page}
          </button>
          )
      })}
    </div>
  )
}
