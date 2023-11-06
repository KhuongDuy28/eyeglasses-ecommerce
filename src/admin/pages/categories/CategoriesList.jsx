import React from 'react'
import './categoriesList.scss'
import { Space, Table } from 'antd';
import {BsSearch} from 'react-icons/bs'
import {RxUpdate} from 'react-icons/rx'
import {GoTrash} from 'react-icons/go'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategory, getAllCategoty, searchCategoryByName } from '../../../redux/slice/admin/categorySlice';
import { PlusOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';
import { message } from 'antd';
import { useState } from 'react';
import AddCategory from './add-category/AddCategory';

const CategoriesList = () => {
  const dispatch = useDispatch()
  const handleDeleleCategory = (record) => {
    dispatch(deleteCategory(record.key)).then((res) => {
      if(res.payload.status === 200) {
        message.success('Xóa danh mục thành công') 
        dispatch(getAllCategoty())
      } else {
        message.error('Xóa danh mục thất bại')
      }
    })
  }

  const [idUpdate, setIdUpdate] = useState('')
  const handleUpdateCategory = (record) => {
    setIdUpdate(record?.key)
    setIsModalOpen(true)
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIdUpdate('')
    setIsModalOpen(true);
  };

  // const handleCancel = () => {
  //   setIdUpdate('')
  //   setIsModalOpen(false);
  // };

  
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 250,
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: 900
    },
    {
      title: 'Action',
      key: 'action',
      width: 50,
      render: (_, record) => (
        <Space size="middle">
          <RxUpdate className='ic-update'onClick={() => handleUpdateCategory(record)}/>
          <Popconfirm 
            title='Bạn chắc chắn mình muốn xóa?'
            okText='Xác nhận'
            cancelText='Hủy'
            onConfirm={() => handleDeleleCategory(record)}
            >
            <GoTrash className='ic-delete'/>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getAllCategoty())
  }, [])
  const data = useSelector((state) => state?.category?.listCategory)
  const dataListCategory = data.map((item) => ({
    key: item.id,
    name: item?.name,
    description: item?.description
  })) 

  const [categoryName, setCategoryName] = useState('')
  const searchCategory = (e) => {
    setCategoryName(e.target.value)
    dispatch(searchCategoryByName(e.target.value))
  }

  const categoryByNameSearch = useSelector((state) => state?.category?.categoryByNameSearch)
  const dataCategoryByNameSearch = categoryByNameSearch.map((item) => ({
    key: item.id,
    name: item?.name,
    description: item?.description
  }))

  return (
    <div className='categories-list'>
      <h2>DANH SÁCH DANH MỤC</h2>
      <hr />
      <div className='search'>
        <input type="text" onChange={searchCategory}/>
        <BsSearch/>
      </div>
      <div className='add-category'>
        <button className='btn__add-category' onClick={showModal}>
          <PlusOutlined />
          <span>Thêm</span>
        </button>
        <AddCategory isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} idUpdate={idUpdate} setIdUpdate={setIdUpdate}/>
        {/* <AddCategory showModal={showModal} handleCancel={handleCancel} idUpdate={idUpdate}/> */}
      </div>
      <div className='table-category'>
        <Table 
          columns={columns} 
          dataSource={categoryName === '' ? dataListCategory : dataCategoryByNameSearch}
          pagination={{
            pageSize: 5,
            total: (categoryName === '' ? dataListCategory.length : dataCategoryByNameSearch.length)
          }}
        />
      </div>
    </div>
  )
}

export default CategoriesList