import React from 'react'
import './addMaterial.scss'
import { Modal } from 'antd'
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { message } from 'antd'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { addMaterial, getAllMaterial } from '../../../../redux/slice/admin/materialSlice'

const schema = yup
  .object({
    name: yup.string().required('Bạn cần nhập tên Chất liệu'),
  }).required()

const AddMaterial = (props) => {
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
        const dataMaterial = {
          name: data?.name,
        //   description: data?.description,
        }
        dispatch(addMaterial(dataMaterial)).then((res) => {
            // console.log(res);
            if(res.payload.status === 200) {
                message.success('Thêm chất liệu mới thành công')
                handleCancel()
                reset()
                dispatch(getAllMaterial())
            } else {
                message.error('Thêm chất liệu thất bại')
            }
        })
        
    }
    return (
        <Modal 
            className='modal-material'
            title={'THÊM MỚI CHẤT LIỆU'}
            width={620}
            open={props.isModalOpen} 
            onCancel={handleCancel}
            footer={null}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='name'>
                    <h4>Tên chất liệu</h4>
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

export default AddMaterial