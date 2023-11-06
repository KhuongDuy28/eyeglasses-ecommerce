import React from 'react'
import Header from './header/Header'
import { Outlet } from 'react-router-dom'
import Footer from './footer/Footer'
import useBackToTop from '../hooks/useBackToTop'
import { GoMoveToTop } from 'react-icons/go'
import './clientContainer.scss'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ClientContainer = () => {
  const {isScroll, BackToTop} = useBackToTop()
  const location = useLocation()
  useEffect(() => {
    // Phục hồi vị trí cuộn trang
    window.scrollTo(0, 0);
  }, [location]); // Chạy chỉ một lần khi component được mount
  return (
    <>
      <Header/>
        <div className='container'>
          <Outlet/>
          <GoMoveToTop
            className='backtotop'
            style={{display : `${isScroll ? 'block' : 'none'}`}} 
            onClick={BackToTop}
          />
        </div>
      <Footer/>
    </>
  )
}

export default ClientContainer