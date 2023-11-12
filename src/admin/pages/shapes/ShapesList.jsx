import React from 'react'
import './shapesList.scss'
import { useState } from 'react'
import { Table, message } from 'antd'
import { deleteShape, getAllShape, searchShapeByName } from '../../../redux/slice/admin/shapeSlice'
import { Space } from 'antd'
import { Popconfirm } from 'antd'
import {BsSearch} from 'react-icons/bs'
import {RxUpdate} from 'react-icons/rx'
import {GoTrash} from 'react-icons/go'
import AddShape from './add-shape/AddShape'
import { PlusOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

const ShapesList = () => {
    const dispatch = useDispatch()

    const [currentPage, setCurrentPage] = useState(1)
    const handlePage = (page) => {
      setCurrentPage(page)
    }
    const [shapeName, setShapeName] = useState('')
    const searchShape = (e) => {
      setCurrentPage(1)
      setShapeName(e.target.value)
      dispatch(searchShapeByName(e.target.value))
    }
  
    const handleDeleleShape = (record) => {
      dispatch(deleteShape(record.key)).then((res) => {
        if(res.payload.status === 200) {
          message.success('Xóa hình dáng thành công') 
          if(shapeName !== '') {
            dispatch(searchShapeByName(shapeName))
            dispatch(getAllShape())
          } else {
            dispatch(getAllShape())
          }
        } else {
          message.error('Xóa hình dáng thất bại')
        }
      })
    }
  
    // const [idUpdate, setIdUpdate] = useState('')
    // const handleUpdateCategory = (record) => {
    //   setIdUpdate(record?.key)
    //   setIsModalOpen(true)
    // }
  
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
    //   setIdUpdate('')
      setIsModalOpen(true);
    };
    
    const columns = [
      {
        title: 'Tên hình dáng',
        dataIndex: 'name',
        key: 'name',
        width: 700,
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'Hành động',
        key: 'action',
        width: 50,
        render: (_, record) => (
          <Space size="middle">
            {/* <RxUpdate className='ic-update'onClick={() => handleUpdateCategory(record)}/> */}
            <Popconfirm 
              title='Bạn chắc chắn mình muốn xóa?'
              okText='Xác nhận'
              cancelText='Hủy'
              onConfirm={() => handleDeleleShape(record)}
              >
              <GoTrash className='ic-delete'/>
            </Popconfirm>
          </Space>
        ),
      },
    ];
  
    useEffect(() => {
      dispatch(getAllShape())
    }, [dispatch])
    const {listShape, shapeByNameSearch} = useSelector((state) => state?.shape)
    console.log(listShape);
    const dataListShape = (shapeName !== '' ? shapeByNameSearch : listShape)?.map((item) => ({
      key: item.id,
      name: item?.name,
    //   description: item?.description
    })) 
  
    const [size, setSize] = useState(5)
    const customPaginationText = {
      items_per_page: 'hình dáng',
    };
    return (
        <div className='shapes-list'>
        <h2>DANH SÁCH HÌNH DÁNG</h2>
        <hr />
        <div className='search'>
            <input type="text" onChange={searchShape}/>
            <BsSearch/>
        </div>
        <div className='add-shape'>
            <button className='btn__add-shape' onClick={showModal}>
            <PlusOutlined />
            <span>Thêm</span>
            </button>
            <AddShape 
            isModalOpen={isModalOpen} 
            setIsModalOpen={setIsModalOpen} 
            // idUpdate={idUpdate} 
            // setIdUpdate={setIdUpdate}
            // shapeName={shapeName}
            />
        </div>
        <div className='table-shape'>
            <Table 
            columns={columns} 
            dataSource={dataListShape}
            pagination={{
                pageSize: size,
                total: (shapeName !== '' ? shapeByNameSearch.length : listShape.length),
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

export default ShapesList