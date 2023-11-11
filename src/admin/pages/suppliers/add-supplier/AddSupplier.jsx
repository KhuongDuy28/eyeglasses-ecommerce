import React from 'react'
import './addSupplier.scss'
import { Modal } from 'antd'
import {  useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useDispatch } from 'react-redux'
import { message } from 'antd'
import { useEffect } from 'react'
import { addSupplier, getAllSupplier, getSupplierByID, searchSupplierByName, updateSupplier } from '../../../../redux/slice/admin/supplierSlice'

const schema = yup
  .object({
    name: yup.string().required('Bạn cần nhập Tên nhà cung cấp'),
    email: yup.string().required('Bạn cần nhập Email').email('Bạn cần nhập đúng dịnh dạng Email'),
    telephone: yup.string().required('Bạn cần nhập Số điện thoại'),
    address: yup.string().required('Bạn cần nhập Địa chỉ'),
  }).required()

const AddSupplier = (props) => {
    const dispatch = useDispatch()

    const handleCancel = () => {
        props.setIsModalOpen(false);
        props.setIdUpdate('')
        reset()
        if(props?.supplierName !== '') {
          dispatch(searchSupplierByName(props?.supplierName))
        }
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
      } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
          name: '',
          email: '',
          telephone: '',
          address: '',
          description: ''
        }
    })

    useEffect(() => {
        if(props?.idUpdate !== '') {
            dispatch(getSupplierByID(props?.idUpdate)).then((res) => {
                reset({
                  name: res.payload.data.data.name,
                  email: res.payload.data.data.email,
                  telephone: res.payload.data.data.telephone,
                  address: res.payload.data.data.address,
                  description: res.payload.data.data.description
                })
            })
        } else {
            reset({
              name: '',
              email: '',
              telephone: '',
              address: '',
              description: ''
            })
        }
    }, [props?.idUpdate])

    const onSubmit = (data) => {
        if(props.idUpdate === '') {
            dispatch(addSupplier(data)).then((res) => {
              if(res.payload?.status === 200) {
                message.success('Thêm nhà cung cấp thành công')
                handleCancel()
                reset()
                dispatch(getAllSupplier())
              } else if(res.payload === undefined) {
                message.warning('Email đã tồn tại. Hãy thử lại')
              } else {
                message.error('Thêm nhà cung cấp thất bại')
              }
            })
        } else if(props.idUpdate !== '') {
            dispatch(updateSupplier({
              id: props?.idUpdate,
              dataUpdate: data
            })).then((res) => {
              console.log(res);
              if(res.payload.status === 200) {
                  handleCancel()
                  message.success('Cập nhật danh mục thành công')
                  dispatch(getAllSupplier())
              } else {
                  message.error('Cập nhật danh mục thất bại')
              }
            })
        }
    }

    return (
        <>
          <Modal 
            className='modal-supplier'
            title={props.idUpdate !== '' ? 'CẬP NHẬT NHÀ CUNG CẤP' : 'THÊM MỚI NHÀ CUNG CẤP'}
            width={700}
            open={props.isModalOpen} 
            onCancel={handleCancel}
            footer={null}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='form-container'>
                <div className='left'>
                  <div className='name'>
                    <h4>Tên nhà cung cấp</h4>
                    <input {...register("name")} />
                    <p>{errors.name?.message}</p>
                  </div>

                  <div className='email'>
                    <h4>Email</h4>
                    <input {...register("email")} />
                    <p>{errors.email?.message}</p>
                  </div>

                  <div className='telephone'>
                    <h4>Số điện thoại</h4>
                    <input {...register("telephone")} />
                    <p>{errors.telephone?.message}</p>
                  </div>
                </div>

                <div className='right'>
                  <div className='address'>
                    <h4>Địa chỉ</h4>
                    <input {...register("address")} />
                    <p>{errors.address?.message}</p>
                  </div>

                  <div className='desc'>
                    <h4>Mô tả</h4>
                    <textarea {...register("description")} />
                    <p>{errors.description?.message}</p>
                  </div>
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

export default AddSupplier