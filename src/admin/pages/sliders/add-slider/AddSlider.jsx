import React from 'react'
import './addSlider.scss'
import { Modal } from 'antd'
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { message } from 'antd'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { addSupplier } from '../../../../redux/slice/admin/supplierSlice'
import { addSlider, getAllSlider } from '../../../../redux/slice/admin/sliderSlice'


const schema = yup
  .object({
    name: yup.string().required('Bạn cần nhập Tên Slider'),
    image: yup.mixed().required('Bạn cần chọn 1 ảnh')
  }).required()

const AddSlider = (props) => {
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
            image: undefined
        }
    })

    const [fileUpload, setFileUpload] = useState(null)
    const handleFileUpload = (e) => {
      setValue('image', e.target.files[0])
      setFileUpload(e.target.files[0])
    }

    const onSubmit = (data) => {
        console.log(data);
        dispatch(addSlider(data)).then((res) => {
            console.log(res);
            if(res.payload.status === 200) {
                message.success('Thêm slider thành công')
                handleCancel()
                setFileUpload(null)
                reset()
                dispatch(getAllSlider())
            } else {
                message.error('Thêm slider thất bại')
            }
        })
        
    }
    return (
        <Modal 
            className='modal-slider'
            title={'THÊM MỚI SLIDER'}
            width={620}
            open={props.isModalOpen} 
            onCancel={handleCancel}
            footer={null}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='name'>
                    <h4>Tên slider</h4>
                    <input {...register("name")} />
                    <p>{errors.name?.message}</p>
                </div>

                
                <div className='image'>
                    <h4>Ảnh</h4>
                    <label htmlFor="image" className='upload-file'>
                      {
                        fileUpload ? <img src={URL.createObjectURL(fileUpload)} alt='avatar' />
                        : <PlusOutlined/>
                      }
                    </label>
                    <Controller
                      name=""
                      control={control}
                      render={({field}) => <input {...field} type='file' id='image' control={control}
                      onChange={handleFileUpload}
                       style={{display: 'none'}}/>} 
                    />
                    <p>{errors.image?.message}</p>
                  </div>

                  <div className='btn'>
                    <button>XÁC NHẬN</button>
                  </div>
            </form>
        </Modal>
    )
}

export default AddSlider