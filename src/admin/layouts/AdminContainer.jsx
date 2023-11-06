import React from 'react'
import Sidebar from './sidebar/Sidebar'
import './adminContainer.scss'
import { Outlet } from 'react-router-dom'
import Account from '../components/account/Account'

const AdminContainer = () => {
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