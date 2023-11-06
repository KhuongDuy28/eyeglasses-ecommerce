import React from 'react'
import './changeProfile.scss'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useDispatch } from 'react-redux'
import { changePassword } from '../../../../redux/slice/admin/userSlice'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'

const schema = yup
  .object({
    password_old: yup.string().required('Bạn chưa nhập Mật khẩu'),
    password: yup.string().required('Bạn chưa nhập Mật khẩu mới'),
  })
  .required()

const ChangeProfile = () => {
    const user_id = JSON.parse(localStorage.getItem('user_id'))
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })
    const onSubmit = (data) => {
        const dataChangePass = {
            user_id: user_id,
            password: data.password,
            password_old: data.password_old
        }

        dispatch(changePassword(dataChangePass)).then((res) => {
            if(res.payload.data.status === 200) {
                message.success('Thay đổi mật khẩu thành công')
                navigate('/login')
                localStorage.clear()
            } else if(res.payload.data.status_code === 403) {
                message.error('Mật khẩu cũ không chính xác')
            }
        })
    }
return (
    <div className='change-profile'>
        <h2>THAY ĐỔI MẬT KHẨU</h2>
        <hr />
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
                <button>XÁC NHẬN</button>
            </div>
        </form>
    </div>
  )
}

export default ChangeProfile