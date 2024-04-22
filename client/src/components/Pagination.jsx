/* eslint-disable react/prop-types */
// @ts-nocheck

import React from "react";

export const Pagination = ({totalPosts, postsPerPages, setCurrentPage, currentPage}) => {

  const allPages = React.useMemo(() => {
  let pages = [];

  if (totalPosts !== null) {
    if (totalPosts.length !== 0) {
      for (let i = 1; i <= Math.ceil(totalPosts/postsPerPages); i++) {
        pages.push(i)
      }
    }  
  }
  
  return pages;
  }, [totalPosts])


  return (
    <div className='pagination'>
      {allPages.map((page, index) => {
        return (
          <button key={index} onClick={() => setCurrentPage(page)}
          className={page == currentPage ? 'active' : ''}
          >
            {page}
          </button>
          )
      })}
    </div>
  )
}
