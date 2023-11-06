import React from 'react'
import './sideBar.scss'
import {AiFillHome, AiFillCaretDown, AiFillCaretUp, AiFillCheckCircle} from 'react-icons/ai'
import {BiSolidCategory, BiLogoProductHunt, BiSolidFactory, BiSolidPieChartAlt2, BiSolidErrorCircle, BiSolidSlideshow} from 'react-icons/bi'
import {BsFillBagCheckFill, BsHourglassTop} from 'react-icons/bs'
import {FaCoins} from 'react-icons/fa'
import {RiFilePaperFill} from 'react-icons/ri'
import {PiTruckFill} from 'react-icons/pi'
import {MdManageAccounts,MdAccountCircle} from 'react-icons/md'
import Logo from '../../assets/img/logo-admin.jpg'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  const [displayStatistical, setDisplayStatistical] = useState('none')
  const [displayManage, setDisplayManage] = useState('none')
  const [displayOrder, setDisplayOrder] = useState('none')
  const handleDisplayManage = () => {
    if(displayManage === 'none') {
      setDisplayManage('block')
    } else {
      setDisplayManage('none')
    }
  }

  const handleDisplayStatistial = () => {
    if(displayStatistical === 'none') {
      setDisplayStatistical('block')
    } else {
      setDisplayStatistical('none')
    }
  }

  const handleDisplayOrder = () => {
    if(displayOrder === 'none') {
      setDisplayOrder('block')
    } else {
      setDisplayOrder('none')
    }
  }

  const role = JSON.parse(localStorage.getItem('role'))

  return (
    <div className='sidebar'>
      <div className='title'>
        <NavLink to={'/admin'}>
          <img src={Logo} alt="" />
        </NavLink>
        <h2>
          {role === 1 ? 'ADMIN' : 'STAFF'}
        </h2>
      </div>

      <div className='sidebar-container'>
        <NavLink 
          className='dropdown'
          to={'/admin'}>
          <AiFillHome className='ic'/> 
          <h3>DASHBOARD</h3>
        </NavLink>

        <div className='role' style={{display: `${role === 1 ? 'block' : 'none'}`}}>
          <div className='dropdown' onClick={handleDisplayStatistial}>
            <BiSolidPieChartAlt2 className='ic'/> 
            <h3>
              THỐNG KÊ
              {displayStatistical === 'block' ? <AiFillCaretUp className='ic-up'/> : <AiFillCaretDown className='ic-down'/>}
            </h3>
          </div>
          <div style={{display: `${displayStatistical}`}}>
            <div className='elements'>
              <NavLink 
                to={'/admin/statistical/sales'} 
                className='nav__element'>
                <FaCoins/> 
                <span>Doanh Số Bán Hàng</span>
              </NavLink>
              <NavLink 
                to={'/admin/statistical/order'} 
                className='nav__element'>
                <RiFilePaperFill/> 
                <span>Đơn Hàng</span>
              </NavLink>
              <NavLink 
                to={'/admin/statistical/product'} 
                className='nav__element'>
                <BiSolidPieChartAlt2/> 
                <span>Sản Phẩm Bán Ra</span>
              </NavLink>
            </div>
          </div>
        </div>

        <div className='role' style={{display: `${role === 1 ? 'block' : 'none'}`}}>
          <div className='dropdown' onClick={handleDisplayManage}>
            <MdManageAccounts className='ic'/> 
            <h3>
              QUẢN LÝ
              {displayManage === 'block' ? <AiFillCaretUp className='ic-up'/> : <AiFillCaretDown className='ic-down'/>}
            </h3>
          </div>
          <div style={{display: `${displayManage}`}}>
            <div className='elements'>
              <NavLink 
                  to={'/admin/management/category'} 
                  className='nav__element'>
                  <BiSolidCategory/> 
                  <span>Danh Mục</span>
                </NavLink>
              <NavLink 
                to={'/admin/management/product'} 
                className='nav__element'>
                <BiLogoProductHunt/>
                <span>Sản Phẩm</span>
              </NavLink>
              <NavLink 
                to={'/admin/management/supplier'} 
                className='nav__element'>
                <BiSolidFactory/> 
                <span>Nhà Cung Cấp</span>
              </NavLink>
              <NavLink 
                to={'/admin/management/account'} 
                className='nav__element'>
                <MdAccountCircle/> 
                <span>Tài Khoản</span>
              </NavLink>
              <NavLink 
                to={'/admin/management/slider'} 
                className='nav__element'>
                <BiSolidSlideshow/> 
                <span>Slider</span>
              </NavLink>
            </div>
          </div>
        </div>

        <div className='role'>
          <div className='dropdown' onClick={handleDisplayOrder}>
            <RiFilePaperFill className='ic'/> 
            <h3>
              XỬ LÝ ĐƠN HÀNG 
              {displayOrder === 'block' ? <AiFillCaretUp className='ic-up'/> : <AiFillCaretDown className='ic-down'/>}
            </h3>
          </div>
          <div style={{display: `${displayOrder}`}}>
            <div className='elements'>
              <NavLink 
                  to={'/admin/order/wait-confirm'} 
                  className='nav__element'>
                  <BsHourglassTop/> 
                  <span>Chờ Xác Nhận</span>
                </NavLink>
              <NavLink 
                to={'/admin/order/confirmed'} 
                className='nav__element'>
                <AiFillCheckCircle/>
                <span>Đã Xác Nhận</span>
              </NavLink>
              <NavLink 
                to={'/admin/order/transported'} 
                className='nav__element'>
                <PiTruckFill/> 
                <span>Đang Vận Chuyển</span>
              </NavLink>
              <NavLink 
                to={'/admin/order/successful'} 
                className='nav__element'>
                <BsFillBagCheckFill/> 
                <span>Giao Hàng Thành Công</span>
              </NavLink>
              <NavLink 
                to={'/admin/order/cancelled'} 
                className='nav__element'>
                <BiSolidErrorCircle/> 
                <span>Đã Hủy</span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Sidebar