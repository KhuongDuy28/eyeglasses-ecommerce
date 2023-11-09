import React from 'react'
import Sidebar from './sidebar/Sidebar'
import './adminContainer.scss'
import { Outlet } from 'react-router-dom'
import Account from '../components/account/Account'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminContainer = () => {
  const navigate = useNavigate()
  const role = JSON.parse(localStorage.getItem('role'))
  useEffect(() => {
    if(role === null) {
      navigate('/login-admin')
    }
  }, [role])
  return (
    <div className='admin-container'>
        <Sidebar/>
        <div className='admin-pages'>
          <Account/>
          <Outlet/>
        </div>
    </div>
  )
}

export default AdminContainer