import React from 'react'
import './accountsList.scss'
import { BsSearch } from 'react-icons/bs'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, getAllUser, searchUserByKey } from '../../../redux/slice/admin/userSlice'
import { Table, message } from 'antd'
import { useEffect } from 'react'
import AddAccount from './add-account/AddAccount'
import { useState } from 'react'
import { Space } from 'antd'
import { Popconfirm } from 'antd'
import {RxUpdate} from 'react-icons/rx'
import {GoTrash} from 'react-icons/go'
import DefaultAvatar from '../../assets/img/account.png'
import DefaultAvatar1 from '../../assets/img/account1.jpg'
import UpdateAccount from './update-account/updateAccount'
import { Input } from 'antd'
import { Select } from 'antd'
import {AiOutlineFilter} from 'react-icons/ai'
import {RiLockPasswordLine} from 'react-icons/ri'
import ChangePassword from './change-password/ChangePassword'

const { Option } = Select

const AccountsList = () => {
  const dispatch = useDispatch()
  const handleDeleteUser = (record) => {
    dispatch(deleteUser(record.key)).then((res) => {
      if(res.payload.status === 200) {
        message.success('Xóa tài khoản thành công') 
        dispatch(getAllUser())
      } else {
        message.error('Xóa tài khoản thất bại')
      }
    })
  }

  const [idUpdate, setIdUpdate] = useState('')
  const handleUpdateUser = (record) => {
    setIdUpdate(record?.key)
    setIsModalOpen(true)
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIdUpdate('')
    setIsModalOpen(true);
  };

  const [idChangePass, setIdChangePass] = useState('')
  const [isModalOpenChangePass, setIsModalOpenChangePass] = useState(false);
  const openChangePassword = (record) => {
    setIdChangePass(record?.key)
    setIsModalOpenChangePass(true)
  }
  
  const columns = [
    {
      title: 'Fullname',
      dataIndex: 'fullname',
      key: 'fullname',
      width: 300,
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (avatar) => (
        avatar ? <img style={{ width: 40}} src={avatar} /> : <img style={{ width: 40}} src={DefaultAvatar} />
      )
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 300,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <p>
          {role === 1 && 'Admin'}
          {role === 2 && 'Staff'}
          {role === 3 && 'Client'}
        </p>
      )
    },
    {
      title: 'Action',
      key: 'action',
      width: 100,
      render: (_, record) => (
        <Space size="middle">
          <RxUpdate className='ic-update'onClick={() => handleUpdateUser(record)}/>
          <Popconfirm 
            title='Bạn chắc chắn mình muốn xóa?'
            okText='Xác nhận'
            cancelText='Hủy'
            onConfirm={() => handleDeleteUser(record)}
            >
            <GoTrash className='ic-delete'/>
          </Popconfirm>
          <RiLockPasswordLine className='ic-changepass' onClick={() => openChangePassword(record)}/>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getAllUser())
  }, [])
  const data = useSelector((state) => state?.user?.listUser)
  const dataListUser = data.map((item) => ({
    key: item.id,
    fullname: item?.fullname,
    avatar: item?.avatar,
    email: item?.email,
    role: item?.role
  })) 

  const [selected, setSelected] = useState('fullname')
  const [keySearch, setKeySearch] = useState('')
  const changeSelectSearch = (e) => {
    setSelected(e)
  }

  const searchUser = (e) => {
    setKeySearch(e)
    if(selected === 'fullname') {
      dispatch(searchUserByKey({
        name: e.target.value,
        email: ''
      }))
    } else if(selected === 'email') {
      dispatch(searchUserByKey({
        name: '',
        email: e.target.value
      }))
    }
  }

  const {userByKeySearch} = useSelector((state) => state?.user)
  console.log(userByKeySearch);

  const dataUserByKeySearch = userByKeySearch.map((item) => ({
    key: item.id,
    fullname: item?.fullname,
    avatar: item?.avatar,
    email: item?.email,
    role: item?.role
  }))


  return (
    <div className='accounts-list'>
      <h2>DANH SÁCH TÀI KHOẢN</h2>
      <hr />
      <div className='search'>
        <div className='select-search'>
          <Select
            suffixIcon={<AiOutlineFilter />} 
            style={{ width: 120, marginLeft: '8px' }}
            onChange={changeSelectSearch}
          >
            <Option value="fullname">Fullname</Option>
            <Option value="email">Email</Option>
          </Select>
        </div>
        <input onChange={searchUser}/>
        <BsSearch className='icon-search'/>
      </div>
      <div className='add-account'>
        <button className='btn__add-account' onClick={showModal}>
          <PlusOutlined />
          <span>Thêm</span>
        </button>
       {
        idUpdate !== '' ?        
        <UpdateAccount isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} idUpdate={idUpdate} setIdUpdate={setIdUpdate}/>   
        : <AddAccount isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
       }
       {
        idChangePass && 
        <ChangePassword isModalOpen={isModalOpenChangePass} setIsModalOpen={setIsModalOpenChangePass} 
        idChangePass={idChangePass}/>
       }
      </div>
      <div className='table-account'>
        <Table 
          columns={columns} 
          dataSource={keySearch === '' ? dataListUser : dataUserByKeySearch}
          pagination={{
            pageSize: 5,
            total: (keySearch === '' ? dataListUser.length : dataUserByKeySearch.length)
          }}
        />
      </div>
    </div>
  )
}

export default AccountsList