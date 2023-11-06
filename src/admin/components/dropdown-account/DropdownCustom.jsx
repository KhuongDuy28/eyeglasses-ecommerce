import React from 'react'
import './dropdownCustom.scss'
import {IoMdLogOut, IoMdSettings} from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Modal } from 'antd'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { adminChangePassword } from '../../../redux/slice/admin/userSlice'
import { message } from 'antd'
import { useDispatch } from 'react-redux'

const schema = yup
  .object({
    password_old: yup.string().required('Bạn chưa nhập Mật khẩu'),
    password: yup.string().required('Bạn chưa nhập Mật khẩu mới'),
  })
  .required()

const DropdownCustom = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        props.getDataDropdownCustom(false)
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);

    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleLogout = () => {
        navigate('/login-admin')
        localStorage.clear()
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schema),
      })
    const onSubmit = (data) => {
        const dataChangePass = {
            password: data.password,
            password_old: data.password_old
        }

        dispatch(adminChangePassword(dataChangePass)).then((res) => {
            if(res.payload?.data?.status === 200) {
                message.success('Thay đổi mật khẩu thành công')
                navigate('/login-admin')
                localStorage.clear()
            } else if(res.payload?.data?.status_code === 403) {
                message.error('Mật khẩu cũ không chính xác')
            }
        })
    }

    return (
        <div className='dropdown-custom' style={{display: `${props.isOpen ? 'block' : 'none'}`}}>
            <div className='task' onClick={showModal}>
                <IoMdSettings/>
                <span>Đổi mật khẩu</span>
            </div>

            <Modal 
                className='modal-changepass-admin'
                title="ĐỔI MẬT KHẨU" 
                open={isModalOpen} 
                onOk={handleOk} 
                onCancel={handleCancel}
                footer={null}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='acc'>
                        <h4>Mật khẩu cũ <span>*</span></h4>
                        <input {...register("password_old")} />
                        <p>{errors.password_old?.message}</p>
                    </div>
                    <div className='acc'>
                        <h4>Mật khẩu mới <span>*</span></h4>
                        <input {...register("password")} />
                        <p>{errors.password?.message}</p>
                    </div>
                    <div className='btn'>
                        <button className='btn-confirm'>XÁC NHẬN</button>
                    </div>
                </form>
            </Modal>

            <div className='task' onClick={handleLogout}>
                <IoMdLogOut/>
                <span>Đăng xuất</span>
            </div>
        </div>
    )
}

export default DropdownCustom