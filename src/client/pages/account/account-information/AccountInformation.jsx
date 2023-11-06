import { HeartFilled, HeartOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
import React from 'react'
import './accountInformation.scss'
import { Link } from 'react-router-dom'
import {BiSolidUserCircle} from 'react-icons/bi'
import {AiFillHeart} from 'react-icons/ai'
import {RiLogoutBoxRFill} from 'react-icons/ri'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProfileClient } from '../../../../redux/slice/admin/userSlice'
import { useState } from 'react'

const AccountInformation = (props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user_id = JSON.parse(localStorage.getItem('user_id'))
  useEffect(() => {
    if(user_id) {
      dispatch(getProfileClient(user_id))
    }
  }, [user_id])
  const {profileClient} = useSelector((state) => state?.user)

  const handleLogOut = () => {
    navigate('/login')
    localStorage.clear()
  }

  const openChangeProfile = () => {
    props.setPageAccount(2)
  }

  const openListHeart = () => {
    props.setPageAccount(1)
  }


  return (
    <div className='account-information'>
        <div className='intro'>
            <Avatar className='avatar' size={120} icon={profileClient.avatar ? profileClient.avatar : <UserOutlined />} />
            <h2>{profileClient?.fullname}</h2>
            <p>{profileClient?.email}</p>
        </div>
        <hr />
        <div className='details__intro-account'>
          <button className={`list-heart ${props.pageAccount === 1 ? 'active' : ''} `} onClick={openListHeart}>
            <AiFillHeart />Sản phẩm yêu thích
          </button>
          <button className={`change-info-account ${props.pageAccount === 2 ? 'active' : ''} `} onClick={openChangeProfile}>
            <BiSolidUserCircle/>Thông đổi mật khẩu
          </button>
          <button className='log-out' onClick={handleLogOut}><RiLogoutBoxRFill/>Đăng xuất</button>
        </div>
    </div>
  )
}

export default AccountInformation