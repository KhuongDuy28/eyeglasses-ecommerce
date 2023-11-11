import React from 'react'
import Sidebar from './sidebar/Sidebar'
import './adminContainer.scss'
import { Outlet } from 'react-router-dom'
import Account from '../components/account/Account'
import { Navigate } from 'react-router-dom'

const AdminContainer = () => {
  const role = JSON.parse(localStorage.getItem('role'))
  return role ? <Admin /> : <Navigate to="/login-admin" />
}
const Admin = () => {
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