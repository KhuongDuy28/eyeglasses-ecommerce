import React from 'react'
import './addShape.scss'
import { Modal } from 'antd'
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { message } from 'antd'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { addShape, getAllShape } from '../../../../redux/slice/admin/shapeSlice'


const schema = yup
  .object({
    name: yup.string().required('Bạn cần nhập tên Hình dáng'),
  }).required()

const AddShape = (props) => {
    const dispatch = useDispatch()

    const handleCancel = () => {
        props.setIsModalOpen(false);
        reset()
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset, control, setValue
      } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            // description: ''
        }
    })

    const onSubmit = (data) => {
        const dataShape = {
          name: data?.name,
        //   description: data?.description,
        }
        dispatch(addShape(dataShape)).then((res) => {
            // console.log(res);
            if(res.payload.status === 200) {
                message.success('Thêm hình dáng mới thành công')
                handleCancel()
                reset()
                dispatch(getAllShape())
            } else {
                message.error('Thêm hình dáng thất bại')
            }
        })
        
    }
    return (
        <Modal 
            className='modal-shape'
            title={'THÊM MỚI HÌNH DÁNG'}
            width={620}
            open={props.isModalOpen} 
            onCancel={handleCancel}
            footer={null}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='name'>
                    <h4>Tên hình dáng</h4>
                    <input {...register("name")} />
                    <p>{errors.name?.message}</p>
                </div>

                  <div className='btn'>
                    <button>XÁC NHẬN</button>
                  </div>
            </form>
        </Modal>
    )
}

export default AddShape