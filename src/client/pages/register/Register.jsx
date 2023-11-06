import React from 'react'
import LogoRegister from '../../assets/img/register.jpg'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import './register.scss'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { clientRegister } from '../../../redux/slice/client/registerSlice'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'

const schema = yup
  .object({
    email: yup.string().email('Bạn cần nhập đúng định dạng Email').required('Bạn cần nhập Email'),
    fullname: yup.string().required('Bạn cần nhập Họ tên'),
    password: yup.string().required('Bạn cần nhập Mật khẩu'),
    confirm_password: yup.string().required('Bạn cần nhập lại Mật khẩu')
    .oneOf([yup.ref('password')], "Nhâp lại mật khẩu phải giống với Mật khẩu"),
  }).required()

const Register = () => {
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
    const dataRegister = {
      email: data.email,
      fullname: data.fullname,
      password: data.password
    }
    dispatch(clientRegister(dataRegister)).then((res) => {
      console.log(res);
      if(res.payload === undefined) {
        message.error('Email đã được đăng ký')
      } else if(res.payload.data.status === 200) {
        message.success('Đăng ký tài khoản thành công')
        navigate('/login')
      } else {
        message.error('Đăng ký thất bại')
      }
    })
  }
  return (
    <div className='register'>
      <div className='logo'>
        <img src={LogoRegister} alt="" />
      </div>
      <div className='form-register'>
        <div className='title-register'>
          <h1>ĐĂNG KÝ</h1>
          <p>Hãy đăng ký để được hưởng nhiều đặc quyền riêng dành cho bạn</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          
          <div className='email'>
            <h4>Tài khoản <span>*</span></h4>
            <input {...register("email")} placeholder='Nhập email của bạn'/>
            <p className='error'>{errors.email?.message}</p>
          </div>

          <div className='fullname'>
            <h4>Họ tên <span>*</span></h4>
            <input {...register("fullname")}/>
            <p className='error'>{errors.fullname?.message}</p>
          </div>

          <div className='password'>
            <h4>Mật khẩu <span>*</span></h4>
            <input {...register("password")} />
            <p className='error'>{errors.password?.message}</p>
          </div>

          <div className='confirm-password'>
            <h4>Nhập lại mật khẩu <span>*</span></h4>
            <input {...register("confirm_password")} />
            <p className='error'>{errors.confirm_password?.message}</p>
          </div>

          <p className='note'>Thông tin của bạn sẽ được bảo mật theo <span>chính sách riêng tư</span> của chúng tôi</p>
          <button className='btn-register'>ĐĂNG KÝ</button>
        </form>
        
        <div className='support-register'>
          <span>Bạn đã có tài khoản Anna ?</span>
          <Link to={'/login'}>
            <p className='login-now'>Đăng nhập ngay</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register