import React from 'react'
import './account.scss'
import logoAccount1 from '../../assets/img/user-1.png'
import logoAccount2 from '../../assets/img/user-2.png'
import {BsSun} from 'react-icons/bs'
import {IoMdNotificationsOutline, IoMdLogOut, IoMdSettings} from 'react-icons/io'
import DropdownCustom from '../dropdown-account/DropdownCustom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getOrderByStatus, getOrderWaitConfirm } from '../../../redux/slice/admin/orderProcessSlice'
import { useNavigate } from 'react-router-dom'
import { Popover } from 'antd'

const Account = () => {
  const [isOpen, setIsOpen] = useState(false)
  const openDropdownAccount = () => {
    if(isOpen === false) {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }

  const getDataDropdownCustom = (data) => {
    setIsOpen(data)
  }

  const dispatch = useDispatch()
  useEffect(() => {
      dispatch(getOrderWaitConfirm())
  }, [dispatch])
  const {listOrderWaitConfirm} = useSelector((state) => state?.orderProcess)

  const role = JSON.parse(localStorage.getItem('role'))

  const navigate = useNavigate()
  const text = <span className='notification-title'>Thông báo</span>;
  const content = (
    <div className='notification-content' onClick={() => navigate(`/admin/order/wait-confirm`)}>
      {listOrderWaitConfirm?.length > 0 
      ? `Bạn có ${listOrderWaitConfirm?.length} đơn hàng mới cần Xác nhận` 
      : 'Chưa có đơn hàng mới nào cần Xác nhận'}
    </div>
  );

  return (
    <div className='admin-account'>
      <Popover placement="bottomLeft" title={text} content={content} trigger={'click'}>
        <div className='notification'>
          <IoMdNotificationsOutline/>
          <p>{listOrderWaitConfirm?.length}</p>
        </div> 
      </Popover>

      <BsSun/>
      <img src={role === 1 ? logoAccount1 : logoAccount2} onClick={openDropdownAccount}/>
      <DropdownCustom isOpen={isOpen} getDataDropdownCustom={getDataDropdownCustom}/>
    </div>
  )
}

export default Account