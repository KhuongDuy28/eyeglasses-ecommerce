import React from 'react'
import './addCategory.scss'
import { Modal } from 'antd'
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useDispatch, useSelector } from 'react-redux'
import { addCategory, getAllCategoty, getCategoryByID, searchCategoryByName, updateCategory } from '../../../../redux/slice/admin/categorySlice'
import { message } from 'antd'
import { useEffect } from 'react'
import { useState } from 'react'

const schema = yup
  .object({
    name: yup.string().required()
  }).required()

const AddCategory = (props) => {
    const dispatch = useDispatch()

    const handleCancel = () => {
        props.setIsModalOpen(false);
        props.setIdUpdate('')
        reset()
        if(props?.categoryName !== '') {
            dispatch(searchCategoryByName(props?.categoryName))
        }
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
      } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            description: ''
        }
    })

    useEffect(() => {
        if(props?.idUpdate !== '') {
            dispatch(getCategoryByID(props?.idUpdate)).then((res) => {
                console.log(res);
                reset({
                    name: res.payload.data.data.name,
                    description: res.payload.data.data.description
                })
            })
        } else {
            reset({
                name: '',
                description: ''
            })
        }
    }, [props?.idUpdate])

    const onSubmit = (data) => {
        if(props.idUpdate === '') {
            dispatch(addCategory(data)).then((res) => {
                if(res.payload.status === 200) {
                    message.success('Thêm danh mục thành công')
                    handleCancel()
                    reset()
                    dispatch(getAllCategoty())
                } else {
                    message.error('Thêm danh mục thất bại')
                }
            })
        } else if(props.idUpdate !== '') {
            dispatch(updateCategory({
                id: props?.idUpdate,
                dataUpdate: data
            })).then((res) => {
                if(res.payload.status === 200) {
                    handleCancel()
                    message.success('Cập nhật danh mục thành công')
                    dispatch(getAllCategoty())
                } else {
                    message.error('Cập nhật danh mục thất bại')
                }
            })
        }
    }

    return (
        <>
            <Modal 
                className='modal-category'
                title={props.idUpdate !== '' ? 'CẬP NHẬT DANH MỤC' : 'THÊM MỚI DANH MỤC'}
                width={620}
                open={props.isModalOpen} 
                onCancel={handleCancel}
                footer={null}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='name'>
                        <h4>Tên danh mục</h4>
                        <input {...register("name")} />
                        <p>{errors.name?.message}</p>
                    </div>

                    <div className='desc'>
                        <h4>Mô tả</h4>
                        <textarea {...register("description")} />
                        <p>{errors.description?.message}</p>
                    </div>

                    {
                        props?.idUpdate !== '' ? <button>XÁC NHẬN</button> : <button>ĐỒNG Ý</button>
                    }
                </form>
            </Modal>
        </>
    )
}

export default AddCategory