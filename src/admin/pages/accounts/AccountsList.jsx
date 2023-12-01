import React from 'react'
import './accountsList.scss'
import { BsSearch } from 'react-icons/bs'
import { PlusOutlined } from '@ant-design/icons'
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
import User1 from '../../assets/img/user-1.png'
import User2 from '../../assets/img/user-2.png'
import User3 from '../../assets/img/user-3.png'
import UpdateAccount from './update-account/UpdateAccount'
import { Select } from 'antd'
import {AiOutlineFilter} from 'react-icons/ai'
import {RiLockPasswordLine} from 'react-icons/ri'
import ChangePassword from './change-password/ChangePassword'
import dataListRole from '../../utils/Role'

const { Option } = Select

const AccountsList = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllUser())
  }, [])
  const {listUser, userByKeySearch} = useSelector((state) => state?.user)
  
  const [currentPage, setCurrentPage] = useState(1)
  const handlePage = (page) => {
    setCurrentPage(page)
  }

  const [selected, setSelected] = useState('fullname')
  const [keySearch, setKeySearch] = useState('')
  const changeSelectSearch = (value) => {
    setSelected(value)
  }
  const searchUser = (e) => {
    setKeySearch(e.target.value)
    setCurrentPage(1)
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

  const handleDeleteUser = (record) => {
    dispatch(deleteUser(record.key)).then((res) => {
      if(res.payload.status === 200) {
        message.success('Xóa tài khoản thành công') 
        if(keySearch !== '') {
          if(selected === 'fullname') {
            dispatch(searchUserByKey({
              name: keySearch,
              email: ''
            }))
            dispatch(getAllUser())
          } else if(selected === 'email') {
            dispatch(searchUserByKey({
              name: '',
              email: keySearch
            }))
            dispatch(getAllUser())
          }
        } else {
          dispatch(getAllUser())
        }
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

  const [_, setFilteredInfo] = useState({});
  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
  };
  const customLocale = {
    // filterTitle: 'Lọc',
    filterConfirm: 'Đồng ý',
    filterReset: 'Đặt lại',
    emptyText: 'KHÔNG CÓ TÀI KHOẢN NÀO',
    cancelSort: 'Hủy sắp xếp',
  };
  
  const columns = [
    {
      title: 'Họ tên',
      dataIndex: 'fullname',
      key: 'fullname',
      width: 350,
      render: (text) => <a>{text}</a>,
    },
    // {
    //   title: 'Ảnh',
    //   dataIndex: 'avatar',
    //   key: 'avatar',
    //   render: (avatar) => (
    //     avatar ? <img style={{ width: 40}} src={avatar} /> : <img style={{ width: 40}} src={DefaultAvatar} />
    //   )
    // },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 350,
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <>
          {role === 1 && <div className='role'><img style={{ width: 40}} src={User1} /> Quản lý </div>}
          {role === 2 && <div className='role'><img style={{ width: 40}} src={User2} /> Nhân viên </div>}
          {role === 3 && <div className='role'><img style={{ width: 40}} src={User3} /> Khách hàng </div>}
        </>
      ),
      filters: dataListRole?.map((item) => ({
        text: item?.name,
        value: item?.id
      })),
      onFilter: (value, record) => record.role === value,
    },
    {
      title: 'Hành động',
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


  // const {} = useSelector((state) => state?.user)
  // console.log(userByKeySearch);

  // const dataUserByKeySearch = userByKeySearch?.map((item) => ({
  //   key: item.id,
  //   fullname: item?.fullname,
  //   avatar: item?.avatar,
  //   email: item?.email,
  //   role: item?.role
  // }))

  const dataListUser = (keySearch !== '' ? userByKeySearch : listUser)?.map((item) => ({
    key: item.id,
    fullname: item?.fullname,
    // avatar: item?.avatar,
    email: item?.email,
    role: item?.role
  })) 

  const [size, setSize] = useState(5)
  const customPaginationText = {
    items_per_page: 'tài khoản',
  };

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
            <Option value="fullname">Họ tên</Option>
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
        <UpdateAccount 
          isModalOpen={isModalOpen} 
          setIsModalOpen={setIsModalOpen} 
          idUpdate={idUpdate} 
          setIdUpdate={setIdUpdate}
          keySearch={keySearch}
          selected={selected}
        />   
        : <AddAccount 
            isModalOpen={isModalOpen} 
            setIsModalOpen={setIsModalOpen}
          />
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
          dataSource={dataListUser}
          pagination={{
            pageSize: size,
            // total: (keySearch !== '' ? userByKeySearch.length : listUser.length),
            current: currentPage,
            pageSizeOptions: ['5', '10', '15', '20'],
            showSizeChanger: true,
            onShowSizeChange: (currentPage, size) => {
              setSize(size)
            },
            locale: {...customPaginationText},
            onChange: (page) => handlePage(page)
          }}
          locale={customLocale}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}

export default AccountsList