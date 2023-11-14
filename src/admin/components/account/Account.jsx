import React from 'react'
import './account.scss'
import logoAccount1 from '../../assets/img/user-1.png'
import logoAccount2 from '../../assets/img/user-2.png'
import {BsSun} from 'react-icons/bs'
import {IoMdNotificationsOutline, IoMdLogOut, IoMdSettings} from 'react-icons/io'
import { Dropdown } from 'antd'
import DropdownCustom from '../dropdown-account/DropdownCustom'
import { useState } from 'react'

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

  const role = JSON.parse(localStorage.getItem('role'))
  return (
    <div className='admin-account'>
      <IoMdNotificationsOutline/>
      <BsSun/>
      <img src={role === 1 ? logoAccount1 : logoAccount2} onClick={openDropdownAccount}/>
      <DropdownCustom isOpen={isOpen} getDataDropdownCustom={getDataDropdownCustom}/>
    </div>
  )
}

export default Account