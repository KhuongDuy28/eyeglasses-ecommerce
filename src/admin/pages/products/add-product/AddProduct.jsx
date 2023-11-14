import React from 'react'
import './addProduct.scss'
import { Button, Modal } from 'antd'
import {  Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useDispatch, useSelector } from 'react-redux'
import { message } from 'antd'
import { useEffect } from 'react'
import { addSupplier, getAllSupplier, getSupplierByID, updateSupplier } from '../../../../redux/slice/admin/supplierSlice'
import { useState } from 'react'
import { Upload } from 'antd'
import { PlusOutlined, UploadOutlined } from '@ant-design/icons'
import instance from '../../../../service/ConfigAxios'
import { addCategory, getAllCategoty } from '../../../../redux/slice/admin/categorySlice'
import { addProduct, getAllProduct, getProductByID, searchProductByName, updateProduct } from '../../../../redux/slice/admin/productSlice'
import { Select } from 'antd'
import MenuItem from '@mui/material/MenuItem';
import dataListColor from '../../../utils/Color'
import { getAllMaterial } from '../../../../redux/slice/admin/materialSlice'
import { getAllShape } from '../../../../redux/slice/admin/shapeSlice'

const {Option} = Select

const schema = yup
  .object({
    name: yup.string().required('Bạn cần nhập Tên sản phẩm'),
    category_id: yup.string().required('Bạn cần chọn Danh mục'),
    supplier_id: yup.string().required('Bạn cần chọn Nhà cung cấp'),
    material_id: yup.string().required('Bạn cần chọn Chất liệu'),
    shape_id: yup.string().required('Bạn cần chọn Hình dáng'),
    color: yup.string().required('Bạn cần chọn Màu sắc'),
    price_old: yup.string().required('Bạn cần nhập Giá bán'),
    quantity: yup.string().required('Bạn cần nhập Số lượng'),
    thumbnail: yup.mixed().required('Bạn phải chọn một tệp tin ảnh'),
  }).required()

const AddProduct = (props) => {
    const dispatch = useDispatch()

    const handleCancel = () => {
        props.setIsModalOpen(false);
        props.setIdUpdate('')
        props.setLinkThumbnail(undefined)
        setFileUpload(null)
        reset()
        if(props?.search !== '') {
          dispatch(searchProductByName(props?.search))
        }
    };

    useEffect(() => {
      dispatch(getAllCategoty())
      dispatch(getAllSupplier())
      dispatch(getAllMaterial())
      dispatch(getAllShape())
    }, [])
    const dataListCategory = useSelector((state) => state?.category?.listCategory)
    const dataListSupplier = useSelector((state) => state?.supplier?.listSupplier)
    const dataListMaterial = useSelector((state) => state?.material?.listMaterial)
    const dataListShape = useSelector((state) => state?.shape?.listShape)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control,
        setValue, getValues
      } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
          name: '',
          category_id: '',
          supplier_id: '',
          price_new: '',
          price_old: '',
          quantity: '',
          color: '',
          material_id: '',
          shape_id: '',
          status: '',
          description: '',
          thumbnail: undefined
        }
    })

    const [fileUpload, setFileUpload] = useState(null)
    const [imageProduct, setImageProduct] = useState()
    const handleFileUpload = (e) => {
      setValue('thumbnail', e.target.files[0])
      setValue('image_product', e.target.files)
      setFileUpload(e.target.files[0])
      const newArrImageProduct = [...e.target.files]
      setImageProduct(newArrImageProduct)
    }

    useEffect(() => {
        if(props?.idUpdate !== '') {
            dispatch(getProductByID(props?.idUpdate)).then((res) => {
              // console.log(res.payload.data.data);
                reset({
                  name: res.payload.data.data.name,
                  category_id: res.payload.data.data.category_id,
                  supplier_id: res.payload.data.data.supplier_id,
                  price_new: res.payload.data.data.price_new,
                  price_old: res.payload.data.data.price_old,
                  quantity: res.payload.data.data.quantity,
                  color: res.payload.data.data.color,
                  material_id: res.payload.data.data.material_id,
                  shape_id: res.payload.data.data.shape_id,
                  status: res.payload.data.data.status,
                  thumbnail: res.payload.data.data.thumbnail,
                  image_product: res.payload.data.data.image_product,
                  description: res.payload.data.data.description
                })
            })
        } else {
            reset({
              name: '',
              category_id: '',
              supplier_id: '',
              price_new: '',
              price_old: '',
              quantity: '',
              color: '',
              material_id: '',
              shape_id: '',
              status: 2,
              description: '',
              thumbnail: undefined
            })
        }
    }, [props?.idUpdate])

    const onSubmit = (data) => {
      // console.log(data.image_product);
        const dataAddProduct = {
            name: data.name,
            category_id: data.category_id,
            supplier_id: data.supplier_id,
            price_new: data.price_new,
            price_old: data.price_old,
            quantity: data.quantity,
            color: data.color,
            material_id: data.material_id,
            shape_id: data.shape_id,
            status: data.status,
            description: data.description,
            thumbnail: data.thumbnail,
            image_product: data.image_product
        }

        const dataUpdateProduct = {
          product_id: props.idUpdate,
          name: data.name,
          category_id: data.category_id,
          supplier_id: data.supplier_id,
          price_new: data.price_new,
          price_old: data.price_old,
          quantity: data.quantity,
          color: data.color,
          material_id: data.material_id,
          shape_id: data.shape_id,
          status: data.status,
          description: data.description,
          thumbnail: data.thumbnail,
          image_product: data.image_product
      }
        // console.log(dataUpdateProduct.image_product);
        if(props.idUpdate === '') {
            dispatch(addProduct(dataAddProduct)).then((res) => {
              // console.log(res);
              if(res.payload?.status === 200) {
                message.success('Thêm sản phẩm thành công')
                handleCancel()
                reset()
                dispatch(getAllProduct())
              } else if(res.payload?.status === undefined) {
                message.error('Giá bán Sale không thể lớn hơn giá Giá bán Gốc')
              } else {
                message.error('Thêm sản phẩm thất bại')
              }
            })
        } else if(props.idUpdate !== '') {
            dispatch(updateProduct(dataUpdateProduct)).then((res) => {
              // console.log(res);
              if(res.payload?.status === 200) {
                  handleCancel()
                  message.success('Cập nhật sản phẩm thành công')
                  dispatch(getAllProduct())
              } else if(res.payload?.status === undefined) {
                  message.error('Giá bán Sale không thể lớn hơn giá Giá bán Gốc')
              } else {
                  message.error('Cập nhật sản phẩm thất bại')
              }
            })
        }
    }

    return (
        <>
          <Modal 
            className='modal-product'
            title={props.idUpdate !== '' ? 'CẬP NHẬT SẢN PHẨM' : 'THÊM MỚI SẢN PHẨM'}
            width={890}
            open={props.isModalOpen} 
            onCancel={handleCancel}
            footer={null}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='form-container'>
                
                <div className='top'>
                  <div className='left'>

                    <div className='name'>
                      <h4>Tên sản phẩm</h4>
                      <input {...register("name")} />
                      <p>{errors.name?.message}</p>
                    </div>

                    <div className='price-old'>
                      <h4>Giá cũ</h4>
                      <input type='number' {...register("price_old")} />
                      <p>{errors.price_old?.message}</p>
                    </div>

                    <div className='price-new'>
                      <h4>Giá mới</h4>
                      <input type='number' {...register("price_new")} />
                    </div>

                    <div className='quantity'>
                      <h4>Số lượng</h4>
                      <input type='number' {...register("quantity")} />
                      <p>{errors.quantity?.message}</p>
                    </div>

                  </div>

                  <div className='center'>
                  <div className='category'>
                    <h4>Danh mục</h4>
                    <Controller
                      name="category_id"
                      control={control}
                      render={({ field }) => (
                        <Select {...field} control={control}>
                        {
                          dataListCategory.map((item) => (
                          <Option key={item.id} value={item.id}>
                            {item.name}
                          </Option>
                        ))}
                      </Select> 
                      )}/>   
                    <p>{errors.category_id?.message}</p>
                  </div>

                  <div className='supplier'>
                    <h4>Nhà cung cấp</h4>
                    <Controller
                      name="supplier_id"
                      control={control}
                      render={({ field }) => (
                        <Select {...field} control={control}>
                        {
                          dataListSupplier.map((item) => (
                          <Option key={item.id} value={item.id}>
                            {item.name}
                          </Option>
                        ))}
                      </Select> 
                      )}/>   
                    <p>{errors.supplier_id?.message}</p>
                  </div>

                  <div className='material'>
                    <h4>Chất liệu</h4>
                    <Controller
                      name="material_id"
                      control={control}
                      render={({ field }) => (
                        <Select {...field} control={control}>
                        {
                          dataListMaterial.map((item) => (
                          <Option key={item.id} value={item.id}>
                            {item.name}
                          </Option>
                        ))}
                      </Select> 
                      )}/>   
                    <p>{errors.material_id?.message}</p>
                  </div>

                  <div className='shape'>
                    <h4>Hình dáng</h4>
                    <Controller
                      name="shape_id"
                      control={control}
                      render={({ field }) => (
                        <Select {...field} control={control}>
                        {
                          dataListShape.map((item) => (
                          <Option key={item.id} value={item.id}>
                            {item.name}
                          </Option>
                        ))}
                      </Select> 
                      )}/>   
                    <p>{errors.shape_id?.message}</p>
                  </div>
                  </div>

                  <div className='right'>

                  <div className='color'>
                    <h4>Màu sắc</h4>
                    <Controller
                      name="color"
                      control={control}
                      render={({ field }) => (
                        <Select {...field} control={control}>
                        {
                          dataListColor.map((item) => 
                          <Option key={item?.id} value={item.name}>
                            <p>{item.name}</p>
                            <div style={{width: 100, height: 20, background: `${item.name}`}}></div>
                          </Option>)
                        }
                      </Select> 
                      )}/>   

                    <p>{errors.color?.message}</p>
                  </div>

                  <div className='thumb'>
                    <h4>Ảnh</h4>
                    <label htmlFor="thumbnail" className='upload-file'>
                      { fileUpload ? <img src={URL.createObjectURL(fileUpload)} alt='avatar' /> :
                        (props.linkThumbnail !== undefined ? <img src={props.linkThumbnail} alt='avatar'/> :  <PlusOutlined/>)
                      }
                    </label>
                    <Controller
                      name=""
                      control={control}
                      render={({field}) => <input {...field} type='file' id='thumbnail' control={control} multiple
                      onChange={handleFileUpload}
                       style={{display: 'none'}}/>} 
                    />
                    <p>{errors.thumbnail?.message}</p>
                  </div>

                  </div>
                </div>

                <div className='description'>
                  <h4>Mô tả</h4>
                  <textarea {...register("description")} />
                </div>

              </div>

              <div className='btn'>
                {
                    props?.idUpdate !== '' ? <button>XÁC NHẬN</button> : <button>ĐỒNG Ý</button>
                }
              </div>
            </form>
          </Modal>
        </>
    )
}

export default AddProduct