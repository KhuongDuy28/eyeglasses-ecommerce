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
import { Switch } from 'antd'

const SlidersList = () => {
  const dispatch = useDispatch()

  const [currentPage, setCurrentPage] = useState(1)
  const handlePage = (page) => {
    setCurrentPage(page)
  }
  const [sliderName, setSliderName] = useState('')
  const searchSlider = (e) => {
    setCurrentPage(1)
    setSliderName(e.target.value)
    dispatch(searchSliderByName(e.target.value))
  }

  const handleDeleleSlider = (record) => {
    dispatch(deleteSlider(record.key)).then((res) => {
      if(res.payload.status === 200) {
        message.success('Xóa slider thành công') 
        if(sliderName !== '') {
          dispatch(searchSliderByName(sliderName))
          dispatch(getAllSlider())
        } else {
          dispatch(getAllSlider())
        }
      } else {
        message.error('Xóa slider thất bại')
      }
    })
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const [loading, setLoading] = useState(false);
  const [sliderLoading, setSliderLoading] = useState({})
  const changeStatus = (record) => {
    setLoading(true)
    setSliderLoading(listSlider.find((item) => item?.id === record?.key))
    dispatch(changeStatusSlider({
      slider_id: record?.key,
      status: record?.status === 1 ? 2 : 1
    })).then((res) => {
      if(res.payload?.data?.status === 200) {
        message.success('Thay đổi trạng thái thành công')
        dispatch(getAllSlider())
        setLoading(false)
        if(sliderName !== '') {
          dispatch(searchSliderByName(sliderName))
        }
      } else {
        message.error('Thay đổi trạng thái thất bại')
        setLoading(false)
      }
    })
  }

  const columns = [
    {
      title: 'Tên slider',
      dataIndex: 'name',
      key: 'name',
      width: 300,
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Ảnh',
      dataIndex: 'image',
      key: 'image',
      width: 550,
      render: (image) => <Image style={{width: '500px', height: '170px'}} src={image}/>
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status, record) => 
        <Switch 
          checked={status === 1 ? false : true} 
          loading={sliderLoading?.id === record?.key && loading} 
          onChange={() => changeStatus(record)} 
          // checkedChildren="Active"
          // unCheckedChildren="Disable"
        />
    },
    {
      title: 'Hành động',
      key: 'action',
      width: 100,
      render: (_, record) => (
        <Popconfirm 
          title='Bạn chắc chắn mình muốn xóa?'
          okText='Xác nhận'
          cancelText='Hủy'
          onConfirm={() => handleDeleleSlider(record)}
          >
          <GoTrash className='ic-delete'/>
        </Popconfirm>
      ),
    },
  ];
  useEffect(() => {
    dispatch(getAllSlider())
  }, [])
  const {listSlider, sliderByNameSearch} = useSelector((state) => state?.slider)
  // console.log(sliderByNameSearch);
  const dataListSlider = (sliderName !== '' ? sliderByNameSearch : listSlider).map((item) => ({
    key: item.id,
    name: item?.name,
    image: item?.image,
    status: item?.status
  })) 

  const [size, setSize] = useState(5)
  const customPaginationText = {
    items_per_page: 'slider',
  };
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
          dataSource={dataListSlider}
          pagination={{
            pageSize: size,
            total: (sliderName !== '' ? sliderByNameSearch?.length : listSlider?.length),
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

export default SlidersList