import { message } from 'antd';
import React from 'react'
import { useDispatch } from 'react-redux';
import {  getAllUser, getUserByID, searchUserByKey, updateUser } from '../../../../redux/slice/admin/userSlice';
import { Modal } from 'antd';
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useEffect } from 'react';
import { Select } from 'antd';
import { useState } from 'react';
import { CameraOutlined } from '@ant-design/icons';
import './updateAccount.scss'

const {Option} = Select

const schema = yup
  .object({
    fullname: yup.string().required('Bạn cần nhập Họ tên'),
    email: yup.string().email('Bạn cần nhập đúng định dạng Email').required('Bạn cần nhập Email'),
    role: yup.string().required('Bạn cần chọn Quyền truy cập'),
  }).required()

const UpdateAccount = (props) => {
  const dispatch = useDispatch()

  const handleCancel = () => {
      props.setIsModalOpen(false);
      props.setIdUpdate('')
      reset()
      if(props?.keySearch !== '') {
        if(props.selected === 'fullname') {
          dispatch(searchUserByKey({
            name: props?.keySearch,
            email: ''
          }))
        } else if(props?.selected === 'email') {
          dispatch(searchUserByKey({
            name: '',
            email: props?.keySearch
          }))
        }
      }
  };

  const dataListRole = [
    {
      id: 1,
      name: 'Admin'
    },
    {
      id: 2,
      name: 'Staff'
    },
    {
      id: 3,
      name: 'Client'
    }
  ]

  const {
      register,
      handleSubmit,
      formState: { errors },
      reset, 
      control, 
      setValue
    } = useForm({
      resolver: yupResolver(schema),
      defaultValues: {
          fullname: '',
          email: '',
          role: ''
      }
  })

  useEffect(() => {
      dispatch(getUserByID(props?.idUpdate)).then((res) => {
        console.log(res);
          reset({
            fullname: res.payload.data.data.fullname,
            email: res.payload.data.data.email,
            role: res.payload.data.data.role,
          })
      })  
  }, [props?.idUpdate])

  const [selectedFile, setSelectedFile] = useState(null);
  const onFileChange = (e) => {
    setValue('avatar', e.target.files[0]);
    setSelectedFile(e.target.files[0]);
  };

  const onSubmit = (data) => {
      const dataUpdate = {
        fullname: data.fullname,
        email: data.email,
        role: data.role
      }
      dispatch(updateUser({
          id: props?.idUpdate,
          dataUpdate: dataUpdate
      })).then((res) => {
          if(res.payload?.status === 200) {
              handleCancel()
              message.success('Cập nhật tài khoản thành công')
              dispatch(getAllUser())
          } else if(res.payload === undefined) {
            message.warning('Địa chỉ Email đã được đăng ký')
          } else {
            message.error('Cập nhật tài khoản thất bại')
          }
      })
  }


  return (
    <>
      <Modal 
        className='modal-account'
        title='CẬP NHẬT TÀI KHOẢN'
        width={500}
        open={props.isModalOpen} 
        onCancel={handleCancel}
        footer={null}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='avatar'>
            <label htmlFor="avatar" className='custom-file-upload'>
            {
            selectedFile ? 
                  <img src={URL.createObjectURL(selectedFile)} alt="avatar"/>
                   : 
                    <CameraOutlined className='ic-camera'/>
            }
            </label>
              <Controller
                name=""
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="file"
                    id="avatar"
                    style={{ display: 'none' }}
                    onChange={onFileChange}
                  />
                )}
              />
            </div>

            <div className='info-account'>
              <div className='fullname'>
                  <h4>Họ tên</h4>
                  <input {...register("fullname")} />
                  <p>{errors.fullname?.message}</p>
              </div>

              <div className='email'>
                  <h4>Email</h4>
                  <input {...register("email")} />
                  <p>{errors.email?.message}</p>
              </div>

              <div className='role'>
                  <h4>Quyền</h4>
                  <Controller
                    name="role"
                    control={control}
                    render={({ field }) => (
                      <Select {...field} control={control}>
                      {
                        dataListRole.map((item) => (
                        <Option key={item.id} value={item.id}>
                          {item.name}
                        </Option>
                      ))}
                    </Select> 
                    )}/>   
                  <p>{errors.role?.message}</p>
              </div>
            </div>
            
            <div className='btn-confirm'>
              <button>XÁC NHẬN</button>
            </div>
            
        </form>
      </Modal>
    </>
  )
}

export default UpdateAccount