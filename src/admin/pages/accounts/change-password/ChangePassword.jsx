import React from 'react'
import './changePassword.scss'
import { Modal } from 'antd'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useDispatch } from 'react-redux'
import { changePassword } from '../../../../redux/slice/admin/userSlice'
import { message } from 'antd'

const schema = yup
  .object({
    password: yup.string().required('Bạn cần nhập Mật khẩu'),
  }).required()


const ChangePassword = (props) => {
    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            password: ''
        }
    })
    const onSubmit = (data) => {
        const dataChange = {
            user_id: props.idChangePass,
            password: data.password
        }
        dispatch(changePassword(dataChange)).then((res) => {
            if(res.payload.data.status === 200) {
                message.success('Thay đổi Mật khẩu thành công')
                handleCancel()
                reset()
            }
            else {
                message.error('Thay đổi mật khẩu thất bại')
            }
        })
    }
    

    const handleCancel = () => {
        props.setIsModalOpen(false);
        reset()
    };

    return (
        <Modal
            className='modal-changepass'
            title='THAY ĐỔI MẬT KHẨU'
            width={500}
            open={props.isModalOpen} 
            onCancel={handleCancel}
            footer={null}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='password-new'>
                    <h4>Mật khẩu mới</h4>
                    <input {...register("password")} />
                    <p>{errors.password?.message}</p>
                </div>
                <div className='btn'>
                    <button>Xác nhận</button>
                </div>
            </form>
        </Modal>
    )
}

export default ChangePassword