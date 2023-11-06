import React from 'react'
import './account.scss'
import logoAccount from '../../assets/img/account1.jpg'
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

  return (
    <div className='admin-account'>
      <IoMdNotificationsOutline/>
      <BsSun/>
      <img src={logoAccount} onClick={openDropdownAccount}/>
      <DropdownCustom isOpen={isOpen} getDataDropdownCustom={getDataDropdownCustom}/>
    </div>
  )
}

export default Account