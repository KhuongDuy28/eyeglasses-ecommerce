import React from 'react'
import LogoLogin from '../../assets/img/login.jpg'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import './login.scss'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { loginClient } from '../../../redux/slice/client/authClientSlice'

const schema = yup
  .object({
    email: yup.string().required('Bạn cần nhập Tài khoản'),
    password: yup.string().required('Bạn cần nhập Mật khẩu'),
  }).required()

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const onSubmit = (data) => {
    dispatch(loginClient(data)).then((res) => {
      // console.log(res);
      if(res.payload === undefined) {
          message.error('Tài khoản hoặc mật khẩu không đúng?')
      }

      else {
          if(res.payload?.info?.role === 3) {
              if(res.payload.status_code === 200) {
                  message.success('Đăng nhập thành công')
                  navigate('/')
              } else {
                  message.error('Đăng nhập thất bại')
              }
          } else {
              message.error('Đăng nhập thất bại')
          }
      }
        
    })
  }

  return (
    <div className='login'>
      <div className='logo'>
        <img src={LogoLogin} alt="" />
      </div>
      <div className='form-login'>
        <div className='title-login'>
          <h1>ĐĂNG NHẬP</h1>
          <p>Hãy đăng nhập để được hưởng đặc quyền riêng dành cho bạn</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          
          <div className='account'>
            <h4>Tài khoản <span>*</span></h4>
            <input className='input-account' {...register("email")} placeholder='Hãy nhập Email của bạn'/>
            <p className='error'>{errors.email?.message}</p>
          </div>

          <div className='password'>
            <h4>Mật khẩu <span>*</span></h4>
            <input className='input-password' {...register("password")} />
            <p className='error'>{errors.password?.message}</p>
          </div>

          <div className='save-account'>
            <input type="checkbox"/>
            <label>Lưu tài khoản</label>
          </div>

          <button className='btn-login'>ĐĂNG NHẬP</button>
        </form>

        <div className='support-login'>
          <p className='forgot-password'>Quên mật khẩu ?</p>
          <Link to={'/register'}> 
            <p className='register-now'>Đăng ký ngay</p>
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Login