import { Table } from 'antd'
import { Space } from 'antd'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeStatusProduct, getAllProduct, getProductByID } from '../../../redux/slice/admin/productSlice'
import { BsFileEarmarkImage, BsSearch } from 'react-icons/bs'
import {GoCircleSlash} from 'react-icons/go'
import { PlusOutlined } from '@ant-design/icons'
import { RxUpdate } from 'react-icons/rx'
import {LiaExchangeAltSolid} from 'react-icons/lia'
import './productsList.scss'
import AddProduct from './add-product/AddProduct'
import { Image } from 'antd'
import IMGError from '../../assets/img/errorIMG.png'
import DropdownSelect from '../../components/dropdown-select/DropdownSelect'
import { message } from 'antd'
import useConvertToVND from '../../../client/hooks/useConvertToVND'

const ProductsList = () => {
  const dispatch = useDispatch()
  const {VND} = useConvertToVND()

  const [idUpdate, setIdUpdate] = useState('')
  const [linkThumbnail, setLinkThumbnail] = useState(undefined)
  const handleUpdateProduct = (record) => {
    // console.log(record.thumbnail);
    setIdUpdate(record?.key)
    setLinkThumbnail(record?.thumbnail)
    setIsModalOpen(true)
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIdUpdate('')
    setIsModalOpen(true);
  };
  
  const changeStatus = (record) => {
    if(record.status === 1) {
      dispatch(changeStatusProduct({
        product_id: record.key,
        status: 2
      })).then((res) => {
        if(res.payload?.status === 200) {
          message.success('Thay đổi trạng thái sản phẩm thành công')
          dispatch(getAllProduct())
        } else {
          message.error('Thay đổi trạng thái sản phẩm thất bại')
        }
      })
    } else if(record.status === 2) {
      dispatch(changeStatusProduct({
        product_id: record.key,
        status: 1
      })).then((res) => {
        if(res.payload?.status === 200) {
          message.success('Thay đổi trạng thái sản phẩm thành công')
          dispatch(getAllProduct())
        } else {
          message.error('Thay đổi trạng thái sản phẩm thất bại')
        }
      })
    }
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Supplier',
      dataIndex: 'supplier',
      key: 'supplier',
    },
    {
      title: 'Image',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: (thumbnail) => (
        thumbnail === "" ? <Image width={50} src={IMGError}/> : <Image width={50} src= {thumbnail}/>
      )
    },
    {
      title: 'Details Image',
      dataIndex: 'image_product',
      key: 'image_product',
      render: (image_product) => (
        // console.log(image_product)
        image_product.length === 0 ? <p></p>
        : image_product.map((item, index) => 
           <>
            {
              // console.log(item.image)
              image_product?.length > 0 && <Image key={index} width={30} src={item.image} style={{padding: '2px 0px'}}/>
            }
           </>
        )
      )
    },
    {
      title: 'New Price',
      dataIndex: 'price_new',
      key: 'price_new',
      render: (price_new) => 
        <p>
          {VND.format(price_new)}
        </p>,
    },
    {
      title: 'Old Price',
      dataIndex: 'price_old',
      key: 'price_old',
      render: (price_old) => 
        <p>
          {VND.format(price_old)}
        </p>,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Color',
      dataIndex: 'color',
      key: 'color',
      render: (color) => (
        <p style={{background: `${color}`, width: 30, height: 20}}></p>
      )
    },
    {
      title: 'Material',
      dataIndex: 'material',
      key: 'material',
    },
    {
      title: 'Shape',
      dataIndex: 'shape',
      key: 'shape',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <p style={{ 
          textAlign: 'center',
          padding: '2px 5px',
          color: `${status === 2 ? '#ff6565' : '#56ee4e'}`
        }}>
          {status === 2 ? 'Disable' : 'Active'}
        </p>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <RxUpdate className='ic-update'onClick={() => handleUpdateProduct(record)}/>
          <LiaExchangeAltSolid className='ic-change'onClick={() => changeStatus(record)}/>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getAllProduct())
  }, [])
  const data = useSelector((state) => state?.product?.listProduct)
  const dataListProduct = data.map((item) => ({
    key: item?.id,
    name: item?.name,
    category: item?.category?.name,
    supplier: item?.supplier?.name,
    thumbnail: item?.thumbnail,
    image_product: item?.image_product,
    price_new: item?.price_new,
    price_old: item?.price_old,
    quantity: item?.quantity,
    color: item?.color,
    material: item?.material?.name,
    shape: item?.shape?.name,
    status: item?.status,
    description: item?.description
  }))

  return (
    <div className='products-list'>
      <h2>DANH SÁCH SẢN PHẨM</h2>
      <hr />
      <div className='search'>
        <input type="text" />
        <BsSearch/>
      </div>
      <div className='add-product'>
        <button className='btn__add-product' onClick={showModal}>
          <PlusOutlined />
          <span>Thêm</span>
        </button>
        <AddProduct 
          isModalOpen={isModalOpen} 
          setIsModalOpen={setIsModalOpen} 
          setIdUpdate={setIdUpdate} 
          idUpdate={idUpdate}
          linkThumbnail={linkThumbnail}
          setLinkThumbnail={setLinkThumbnail}
        />
      </div>
      <div className='table-product'>
        <Table 
          columns={columns} 
          dataSource={dataListProduct}
          pagination={{
            pageSize: 5,
            total: dataListProduct.length
          }}
        />
      </div>
    </div>
  )
}

export default ProductsList