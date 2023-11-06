import React from 'react'
import './dropdownCustom.scss'
import {IoMdLogOut, IoMdSettings} from 'react-icons/io'
import { useNavigate } from 'react-router-dom'

const DropdownCustom = (props) => {
    const navigate = useNavigate()

    const closeDropdownCustom = () => {
        props.getDataDropdownCustom(false)
    }

    const handleLogout = () => {
        navigate('/login-admin')
        localStorage.clear()
    }

    return (
        <div className='dropdown-custom' style={{display: `${props.isOpen ? 'block' : 'none'}`}}>
            <div className='task' onClick={closeDropdownCustom}>
                <IoMdSettings/>
                <span>Cài đặt</span>
            </div>
            <div className='task' onClick={handleLogout}>
                <IoMdLogOut/>
                <span>Đăng xuất</span>
            </div>
        </div>
    )
}

export default DropdownCustom