import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeStatusSlider, deleteSlider, getAllSlider, searchSliderByName } from '../../../redux/slice/admin/sliderSlice'
import { Table, message } from 'antd'
import { useEffect } from 'react'
import { Space } from 'antd'
import { Popconfirm } from 'antd'
import {GoTrash} from 'react-icons/go'
import {BsSearch} from 'react-icons/bs'
import './sliderList.scss'
import { PlusOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { Image } from 'antd'
import AddSlider from './add-slider/AddSlider'
import {LiaExchangeAltSolid} from 'react-icons/lia'

const SlidersList = () => {
  const dispatch = useDispatch()
  const handleDeleleSlider = (record) => {
    dispatch(deleteSlider(record.key)).then((res) => {
      if(res.payload.status === 200) {
        message.success('Xóa slider thành công') 
        dispatch(getAllSlider())
      } else {
        message.error('Xóa slider thất bại')
      }
    })
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const changeStatus = (record) => {
    dispatch(changeStatusSlider({
      slider_id: record?.key,
      status: record?.status === 1 ? 2 : 1
    })).then((res) => {
      if(res.payload?.data?.status === 200) {
        message.success('Thay đổi trạng thái thành công')
        dispatch(getAllSlider())
      } else {
        message.error('Thay đổi trạng thái thất bại')
      }
    })
  }
  
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 300,
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      width: 550,
      render: (image) => <Image style={{width: '500px', height: '170px'}} src={image}/>
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => 
        <p style={{ 
          textAlign: 'center',
          padding: '2px 5px',
          color: `${status === 1 ? '#ff6565' : '#56ee4e'}`
        }}>
          {status === 1 ? 'Disable' : 'Active'}
        </p>
    },
    {
      title: 'Action',
      key: 'action',
      width: 50,
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm 
            title='Bạn chắc chắn mình muốn xóa?'
            okText='Xác nhận'
            cancelText='Hủy'
            onConfirm={() => handleDeleleSlider(record)}
            >
            <GoTrash className='ic-delete'/>
          </Popconfirm>
          <LiaExchangeAltSolid className='ic-change'onClick={() => changeStatus(record)}/>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getAllSlider())
  }, [])
  const data = useSelector((state) => state?.slider?.listSlider)
  const dataListSlider = data.map((item) => ({
    key: item.id,
    name: item?.name,
    image: item?.image,
    status: item?.status
  })) 

  const [sliderName, setSliderName] = useState('')
  const searchSlider = (e) => {
    setSliderName(e.target.value)
    dispatch(searchSliderByName(e.target.value))
  }

  const sliderByNameSearch = useSelector((state) => state?.slider?.sliderByNameSearch)
  const dataSliderByNameSearch = sliderByNameSearch.map((item) => ({
    key: item.id,
    name: item?.name,
    image: item?.image
  }))
  
  return (
    <div className='sliders-list'>
      <h2>DANH SÁCH SLIDER</h2>
      <hr />
      <div className='search'>
        <input type="text" onChange={searchSlider}/>
        <BsSearch/>
      </div>
      <div className='add-slider'>
        <button className='btn__add-slider' onClick={showModal}>
          <PlusOutlined />
          <span>Thêm</span>
        </button>
        <AddSlider isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
      </div>
      <div className='table-slider'>
        <Table 
          columns={columns} 
          dataSource={sliderName === '' ? dataListSlider : dataSliderByNameSearch}
          pagination={{
            pageSize: 5,
            total: (sliderName === '' ? dataListSlider.length : dataSliderByNameSearch.length)
          }}
        />
      </div>
    </div>
  )
}

export default SlidersList