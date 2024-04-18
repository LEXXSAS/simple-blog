import React from 'react'

const Info = ({info}) => {
  
  return (
    <div style={{minHeight: 'calc(100vh - 70px)', marginTop: '1rem'}}>
      <br/>
      <h1 id='home-title'></h1>
      <div style={{flexGrow: '1'}} id='home-desc'>
        <h1 className='information-text'>{info}</h1>
        <br/>
        <hr/>
        <p className='information-warning'>через несколько секунд вы будете перенаправлены на главную страницу</p>
      </div>
    </div>
  )
}

export default Info
