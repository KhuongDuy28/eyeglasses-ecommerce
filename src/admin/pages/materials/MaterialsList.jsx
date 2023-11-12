import React from 'react'
import './materialsList.scss'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteMaterial, getAllMaterial, searchMaterialByName } from '../../../redux/slice/admin/materialSlice'
import { useState } from 'react'
import { Table, message } from 'antd'
import { Space } from 'antd'
import { Popconfirm } from 'antd'
import {BsSearch} from 'react-icons/bs'
import {RxUpdate} from 'react-icons/rx'
import {GoTrash} from 'react-icons/go'
import { PlusOutlined } from '@ant-design/icons'
import AddMaterial from './add-material/AddMaterial'

const MaterialsList = () => {
  const dispatch = useDispatch()

  const [currentPage, setCurrentPage] = useState(1)
  const handlePage = (page) => {
    setCurrentPage(page)
  }
  const [materialName, setMaterialName] = useState('')
  const searchMaterial = (e) => {
    setCurrentPage(1)
    setMaterialName(e.target.value)
    dispatch(searchMaterialByName(e.target.value))
  }

  const handleDeleleMaterial = (record) => {
    dispatch(deleteMaterial(record.key)).then((res) => {
      if(res.payload.status === 200) {
        message.success('Xóa chất liệu thành công') 
        if(materialName !== '') {
          dispatch(searchMaterialByName(materialName))
          dispatch(getAllMaterial())
        } else {
          dispatch(getAllMaterial())
        }
      } else {
        message.error('Xóa chất liệu thất bại')
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
      title: 'Tên chất liệu',
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
            onConfirm={() => handleDeleleMaterial(record)}
            >
            <GoTrash className='ic-delete'/>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getAllMaterial())
  }, [dispatch])
  const {listMaterial, materialByNameSearch} = useSelector((state) => state?.material)
  const dataListMaterial = (materialName !== '' ? materialByNameSearch : listMaterial)?.map((item) => ({
    key: item.id,
    name: item?.name,
  //   description: item?.description
  })) 

  const [size, setSize] = useState(5)
  const customPaginationText = {
    items_per_page: 'chất liệu',
  };
  return (
      <div className='materials-list'>
      <h2>DANH SÁCH HÌNH DÁNG</h2>
      <hr />
      <div className='search'>
          <input type="text" onChange={searchMaterial}/>
          <BsSearch/>
      </div>
      <div className='add-material'>
          <button className='btn__add-material' onClick={showModal}>
          <PlusOutlined />
          <span>Thêm</span>
          </button>
          <AddMaterial 
          isModalOpen={isModalOpen} 
          setIsModalOpen={setIsModalOpen} 
          // idUpdate={idUpdate} 
          // setIdUpdate={setIdUpdate}
          // shapeName={shapeName}
          />
      </div>
      <div className='table-material'>
          <Table 
          columns={columns} 
          dataSource={dataListMaterial}
          pagination={{
              pageSize: size,
              total: (materialName !== '' ? materialByNameSearch.length : listMaterial.length),
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

export default MaterialsList