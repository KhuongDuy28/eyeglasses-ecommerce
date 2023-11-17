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

  const [currentPage, setCurrentPage] = useState(1)
  const handlePage = (page) => {
    setCurrentPage(page)
  }
  const [categoryName, setCategoryName] = useState('')
  const searchCategory = (e) => {
    setCurrentPage(1)
    setCategoryName(e.target.value)
    dispatch(searchCategoryByName(e.target.value))
  }

  const handleDeleleCategory = (record) => {
    dispatch(deleteCategory(record.key)).then((res) => {
      if(res.payload.status === 200) {
        message.success('Xóa danh mục thành công') 
        if(categoryName !== '') {
          dispatch(searchCategoryByName(categoryName))
          dispatch(getAllCategoty())
        } else {
          dispatch(getAllCategoty())
        }
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
      title: 'Tên danh mục',
      dataIndex: 'name',
      key: 'name',
      width: 250,
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      width: 900
    },
    {
      title: 'Hành động',
      key: 'action',
      width: 135,
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
  const {listCategory, categoryByNameSearch} = useSelector((state) => state?.category)
  const dataListCategory = (categoryName !== '' ? categoryByNameSearch : listCategory)?.map((item) => ({
    key: item.id,
    name: item?.name,
    description: item?.description
  })) 

  const [size, setSize] = useState(5)
  const customPaginationText = {
    items_per_page: 'danh mục',
  };
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
        <AddCategory 
          isModalOpen={isModalOpen} 
          setIsModalOpen={setIsModalOpen} 
          idUpdate={idUpdate} 
          setIdUpdate={setIdUpdate}
          categoryName={categoryName}
        />
      </div>
      <div className='table-category'>
        <Table 
          columns={columns} 
          dataSource={dataListCategory}
          pagination={{
            pageSize: size,
            total: (categoryName !== '' ? categoryByNameSearch.length : listCategory.length),
            current: currentPage,
            pageSizeOptions: ['5', '10'],
            showSizeChanger: true,
            onShowSizeChange: (currentPage, size) => {
              setSize(size)
            },
            locale: {...customPaginationText},
            onChange: (page) => handlePage(page)
          }}
        />
      </div>
    </div>
  )
}

export default CategoriesList