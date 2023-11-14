import { message } from 'antd';
import React from 'react'
import { useDispatch } from 'react-redux';
import { addUser, getAllUser, getUserByID, updateUser } from '../../../../redux/slice/admin/userSlice';
import { Modal } from 'antd';
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useEffect } from 'react';
import { Select } from 'antd';
import { Upload } from 'antd';
import { useState } from 'react';
import { CameraOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import './addAccount.scss'

const {Option} = Select

const schema = yup
  .object({
    fullname: yup.string().required('Bạn cần nhập Họ tên'),
    email: yup.string().email('Bạn cần nhập đúng định dạng Email').required('Bạn cần nhập Email'),
    password: yup.string().required('Bạn cần nhập Mật khẩu'),
    role: yup.string().required('Bạn cần chọn Quyền truy cập'),
  }).required()

const AddAccount = (props) => {
  const dispatch = useDispatch()

  const handleCancel = () => {
      props.setIsModalOpen(false);
      // props.setIdUpdate('')
      reset()
  };

  const dataListRole = [
    {
      id: 1,
      name: 'Quản lý'
    },
    {
      id: 2,
      name: 'Nhân viên'
    },
    {
      id: 3,
      name: 'Khách hàng'
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
          password: '',
          role: ''
      }
  })

  // const [selectedFile, setSelectedFile] = useState(null);
  // const onFileChange = (e) => {
  //   setValue('avatar', e.target.files[0]);
  //   setSelectedFile(e.target.files[0]);
  // };

  const onSubmit = (data) => {
    // if(props.idUpdate === '') {
        dispatch(addUser(data)).then((res) => {
            if(res.payload?.status === 200) {
                message.success('Thêm tài khoản thành công')
                handleCancel()
                reset()
                dispatch(getAllUser())
            } else if(res.payload === undefined) {
                message.warning('Địa chỉ Email đã được đăng ký')
            } else {
                message.error('Thêm tài khoản thất bại')
            }
        })
  }


  return (
    <>
      <Modal 
        className='modal-account'
        title='THÊM MỚI TÀI KHOẢN'
        width={500}
        open={props.isModalOpen} 
        onCancel={handleCancel}
        footer={null}>
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* <div className='avatar'>
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
            </div> */}

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

                {/* <div className='email'>
                  <h4>Email</h4>
                  <Controller
                    control={control}
                    name="email"
                    rules={{ required: 'Email is required' }}
                    render={({ field }) => (
                      <input {...field} />
                    )}
                  />
                  {errors.email && <p>{errors.email.message}</p>}
              </div> */}

              <div className='password'>
                  <h4>Mật khẩu</h4>
                  <input {...register("password")} />
                  <p>{errors.password?.message}</p>
              </div>
{/* 
              <div className='password' style={{display: `${props.idUpdate !== '' ? 'none' : 'block'}`}}>
                  <h4>Mật khẩu</h4>
                  <Controller
                    control={control}
                    name="password"
                    rules={{ required: 'Password is required' }}
                    render={({ field }) => (
                      <input {...field} />
                    )}
                  />
              </div> */}

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

            <div className='btn-oke'>
              <button>ĐỒNG Ý</button>
            </div>
            
        </form>
      </Modal>
    </>
  )
}

export default AddAccount