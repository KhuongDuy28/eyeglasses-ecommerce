import React from 'react'
import './account.scss'
import AccountInformation from './account-information/AccountInformation'
import YourProducts from './your-products/YourProducts'
import ChangeProfile from './change-profile/ChangeProfile'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'

const Account = () => {
  const user_id = JSON.parse(localStorage.getItem('user_id'))
  return user_id ? <AccountContainer/> : <Navigate to={'/login'}/>
}

const AccountContainer = () => {
  const [pageAccount, setPageAccount] = useState(1)
  return (
    <div className='account-container'>
        <AccountInformation pageAccount={pageAccount} setPageAccount={setPageAccount}/>
        {pageAccount === 1 && <YourProducts/>}
        {pageAccount === 2 && <ChangeProfile/>}
    </div>
  )
}

export default Account