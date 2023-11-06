import React from 'react'
import './loginAdmin.scss'
import LoginImg from '../../assets/img/login-img.jpg'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useDispatch, useSelector } from 'react-redux'
import { loginAdmin } from '../../../redux/slice/admin/authAdminSlice'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import { useState } from 'react'

const schema = yup
  .object({
    email: yup.string().required('Bạn cần nhập Tài khoản'),
    password: yup.string().required('Bạn cần nhập Mật khẩu'),
  }).required()

const LoginAdmin = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onSubmit = (data) => {
        dispatch(loginAdmin(data)).then((res) => {
            if(res.payload === undefined) {
                message.error('Tài khoản hoặc mật khẩu không đúng?')
            }

            else {
                if(res.payload?.info?.role === 1 || res.payload?.info?.role === 2) {
                    if(res.payload.status_code === 200) {
                        message.success('Đăng nhập thành công')
                        navigate('/admin')
                    } else {
                        message.error('Đăng nhập thất bại')
                    }
                } else {
                    message.error('Đăng nhập thất bại')
                    localStorage.clear()
                }
            }
            
        })
    }

    const [eye, setEye] = useState(false)
    const handleChangeEye = () => {
        if(eye) {
            setEye(false)
        } else {
            setEye(true)
        }
    }

    return (
        <div className='login-admin'>
            <div className='login-main__container'>
                <div className='login-left'>
                    <img src={LoginImg}/>
                </div>

                <div className='login-right'>
                    <h1>ĐĂNG NHẬP</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='account'>
                            <h4>Tài khoản <span>*</span></h4>
                            <input {...register("email")} placeholder='Hãy nhập Email của bạn'/>
                            <p>{errors.email?.message}</p>
                        </div>

                        <div className='password'>
                            <h4>Mật khẩu <span>*</span></h4>
                            <div className='check-pass'>
                                <input type={`${eye ? 'text' : 'password'}`} {...register("password")} />
                                {
                                    eye ? <EyeInvisibleOutlined className='ic-eye' onClick={handleChangeEye}/> 
                                    : <EyeOutlined className='ic-eye' onClick={handleChangeEye}/>
                                }
                            </div>
                            <p>{errors.password?.message}</p>
                        </div>

                        <button className='btn-login__admin'>ĐĂNG NHẬP</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginAdmin