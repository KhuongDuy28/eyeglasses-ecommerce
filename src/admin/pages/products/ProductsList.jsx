import { Table } from 'antd'
import { Space } from 'antd'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeStatusProduct, getAllProduct, getProductByID, searchProductByName } from '../../../redux/slice/admin/productSlice'
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
import { Switch } from 'antd'
import { current } from '@reduxjs/toolkit'

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
  
  const [loading, setLoading] = useState(false);
  const [productLoading, setProductLoading] = useState({})
  const changeStatus = (record) => {
    setLoading(true)
    setProductLoading(listProduct.find((item) => item?.id === record?.key))
    dispatch(changeStatusProduct({
      product_id: record?.key,
      status: record?.status === 1 ? 2 : 1
    })).then((res) => {
      if(res.payload?.status === 200) {
        message.success('Thay đổi trạng thái thành công')
        dispatch(getAllProduct())
        setLoading(false)
      } else {
        message.error('Thay đổi trạng thái thất bại')
        setLoading(false)
      }
    })
  }

  // console.log(productLoading);

  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Nhà cung cấp',
      dataIndex: 'supplier',
      key: 'supplier',
    },
    {
      title: 'Ảnh nổi bật',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: (thumbnail) => (
        thumbnail === "" ? <Image width={50} src={IMGError}/> : <Image width={50} src= {thumbnail}/>
      )
    },
    {
      title: 'Ảnh chi tiết sản phẩm',
      dataIndex: 'image_product',
      key: 'image_product',
      width: 115,
      render: (image_product) => (
        // console.log(image_product)
        image_product.length === 0 ? <p></p>
        : image_product.map((item, index) => 
           <>
            {
              // console.log(item.image)
              image_product?.length > 0 
              && <Image className='img-detail' key={index} src={item.image}/>
            }
           </>
        )
      )
    },
    {
      title: 'Giá bán sale',
      dataIndex: 'price_new',
      key: 'price_new',
      render: (price_new) => 
        <p>
          {VND.format(price_new)}
        </p>,
    },
    {
      title: 'Giá bán gốc',
      dataIndex: 'price_old',
      key: 'price_old',
      render: (price_old) => 
        <p>
          {VND.format(price_old)}
        </p>,
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Màu sắc',
      dataIndex: 'color',
      key: 'color',
      render: (color) => (
        <p style={{background: `${color}`, width: 30, height: 20}}></p>
      )
    },
    {
      title: 'Chất liệu',
      dataIndex: 'material',
      key: 'material',
    },
    {
      title: 'Hình dáng',
      dataIndex: 'shape',
      key: 'shape',
    },
    {
      title: 'Mô tả chi tiết',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => (
        <Switch 
          checked={status === 2 ? false : true} 
          loading={productLoading?.id === record?.key && loading} 
          onChange={() => changeStatus(record)} 
          // checkedChildren="Active"
          // unCheckedChildren="Disable"
        />
      )
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
          <RxUpdate className='ic-update'onClick={() => handleUpdateProduct(record)}/>
      ),
    },
  ];

  const [currentPage, setCurrentPage] = useState(1)
  const handlePage = (page) => {
    setCurrentPage(page)
  }
  const [search, setSearch] = useState('')
  const handleSearchProduct = (e) => {
    setSearch(e.target.value)
    setCurrentPage(1)
    dispatch(searchProductByName(e.target.value))
  }

  useEffect(() => {
    dispatch(getAllProduct())
  }, [])
  const {listProduct, listProductByName} = useSelector((state) => state?.product)
  // console.log(listProductByName);
  const dataListProduct = (search !== '' ? listProductByName : listProduct)?.map((item) => ({
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

  const [size, setSize] = useState(5)
  const customPaginationText = {
    items_per_page: 'sản phẩm',
  };
  return (
    <div className='products-list'>
      <h2>DANH SÁCH SẢN PHẨM</h2>
      <hr />
      <div className='search'>
        <input type="text" onChange={handleSearchProduct}/>
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
            pageSize: size,
            total: (search !== '' ? listProductByName.length : listProduct.length),
            current: currentPage,
            pageSizeOptions: ['5', '10', '15', '20'],
            showSizeChanger: true,
            onShowSizeChange: (currentPage, size) => {
              setSize(size)
            },
            locale: {...customPaginationText},
            onChange: (page) => handlePage(page),    
          }}
        />
      </div>
    </div>
  )
}

export default ProductsList