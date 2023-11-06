import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteSupplier, getAllSupplier, searchSupplierByName } from '../../../redux/slice/admin/supplierSlice'
import { useState } from 'react'
import './suppliersList.scss'
import { useEffect } from 'react'
import { BsSearch } from 'react-icons/bs'
import { PlusOutlined } from '@ant-design/icons'
import AddSupplier from './add-supplier/AddSupplier'
import { Table } from 'antd'
import { Space } from 'antd'
import { RxUpdate } from 'react-icons/rx'
import { Popconfirm } from 'antd'
import { GoTrash } from 'react-icons/go'
import { message } from 'antd'

const SuppliersList = () => {
  const dispatch = useDispatch()
  const handleDeleleSupplier = (record) => {
    dispatch(deleteSupplier(record.key)).then((res) => {
      console.log(res);
      if(res.payload.status === 200) {
        message.success('Xóa nhà cung cấp thành công') 
        dispatch(getAllSupplier())
      } else {
        message.error('Xóa nhà cung cấp thất bại')
      }
    })
  }

  const [idUpdate, setIdUpdate] = useState('')
  const handleUpdateSupplier = (record) => {
    setIdUpdate(record?.key)
    setIsModalOpen(true)
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIdUpdate('')
    setIsModalOpen(true);
  };
  
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 150,
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Telephone',
      dataIndex: 'telephone',
      key: 'telephone',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <RxUpdate className='ic-update'onClick={() => handleUpdateSupplier(record)}/>
          <Popconfirm 
            title='Bạn chắc chắn mình muốn xóa?'
            okText='Xác nhận'
            cancelText='Hủy'
            onConfirm={() => handleDeleleSupplier(record)}
            >
            <GoTrash className='ic-delete'/>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getAllSupplier())
  }, [])
  const data = useSelector((state) => state?.supplier?.listSupplier)
  const dataListSupplier = data.map((item) => ({
    key: item?.id,
    name: item?.name,
    email: item?.email,
    telephone: item?.telephone,
    address: item?.address,
    description: item?.description
  }))

  const [supplierName, setSupplierName] = useState('')
  const searchSupplier = (e) => {
    setSupplierName(e.target.value)
    dispatch(searchSupplierByName(e.target.value))
  }

  const supplierByNameSearch = useSelector((state) => state?.supplier?.supplierByNameSearch)
  const dataSupplierByNameSearch = supplierByNameSearch.map((item) => ({
    key: item?.id,
    name: item?.name,
    email: item?.email,
    telephone: item?.telephone,
    address: item?.address,
    description: item?.description
  }))
  
  return (
    <div className='suppliers-list'>
      <h2>DANH SÁCH NHÀ CUNG CẤP</h2>
      <hr />
      <div className='search'>
        <input type="text" onChange={searchSupplier}/>
        <BsSearch/>
      </div>
      <div className='add-supplier'>
        <button className='btn__add-supplier' onClick={showModal}>
          <PlusOutlined />
          <span>Thêm</span>
        </button>
        <AddSupplier isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} setIdUpdate={setIdUpdate} idUpdate={idUpdate}/>
      </div>
      <div className='table-supplier'>
        <Table 
          columns={columns} 
          dataSource={supplierName === '' ? dataListSupplier : dataSupplierByNameSearch}
          pagination={{
            pageSize: 5,
            total: (supplierName === '' ? dataListSupplier.length : dataSupplierByNameSearch.length) 
          }}
        />
      </div>
    </div>
  )
}

export default SuppliersList