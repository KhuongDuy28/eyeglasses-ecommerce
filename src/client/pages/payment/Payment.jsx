import React from 'react'
import './payment.scss'
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useDispatch, useSelector } from 'react-redux'
import { Select, Table } from 'antd'
import { useEffect } from 'react'
import { getAllQuanByTinh, getAllTinh, getAllXaByQuan } from '../../../redux/slice/client/addressSlice'
import { getCartByUser } from '../../../redux/slice/client/cartSlice'
import useConvertToVND from '../../hooks/useConvertToVND'
import { orderClient } from '../../../redux/slice/client/orderSlice'
import { message } from 'antd'
import { Navigate } from 'react-router-dom'

const {Option} = Select

const schema = yup
  .object({
    name: yup.string().required('Bạn cần nhập Họ tên'),
    phone: yup.string().required('Bạn cần nhập Số điện thoại'),
    tinh: yup.mixed().required('Bạn cần chọn Tỉnh/Thành phố'),
    quan: yup.mixed().required('Bạn cần chọn Quận/Huyện'),
    xa: yup.mixed().required('Bạn cần chọn Xã/Phường'),
    address: yup.string().required('Bạn cần nhập Địa chỉ nhận hàng'),
  }).required()

const Payment = () => {
  const user_id = JSON.parse(localStorage.getItem('user_id'))
  return user_id ? <PaymentContainer /> : <Navigate to="/login" />
}
const PaymentContainer = () => {
  const {VND} = useConvertToVND()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllTinh())
  }, [])
  const {listTinh, listQuanByTinh, listXaByQuan} = useSelector((state) => state?.address)

  const user_id = JSON.parse(localStorage.getItem('user_id'))
  useEffect(() => {
    dispatch(getCartByUser())
  }, [user_id])

  const {listCartLogged} = useSelector((state) => state?.cart)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, 
    control, 
    setValue,
  } = useForm({
    resolver: yupResolver(schema)
  })

  const selectTinhThanhpho = (matp) => {
    setValue('tinh', matp); // Đặt giá trị trong React Hook Form
    dispatch(getAllQuanByTinh(matp))
  }

  const selectQuanHuyen = (maqh) => {
    setValue('quan', maqh);
    dispatch(getAllXaByQuan(maqh))
  }

  const onSubmit = (data) => {
    const dataOrder = {
      name: data.name,
      phone: data.phone,
      tinh: data.tinh,
      quan: data.quan,
      xa: data.xa,
      duong: data.address,
      note: data.note
    }
    // console.log(dataOrder);
    dispatch(orderClient(dataOrder)).then((res) => {
      if(res.payload?.data.status === 200) {
        message.success('Đặt hàng thành công')
        dispatch(getCartByUser())
        reset({
          name: '',
          phone: '',
          tinh: '',
          quan: '',
          xa: '',
          address: '',
        })
      } else {
        message.error('Đặt hàng thất bại')
      }
    })
  }

  const columns = [
    {
      title: 'Sản phẩm',
      dataIndex: 'info',
      key: 'info',
      width: 400,
      render: (record) => (
        <div className='info'>
          <img src={record.image} alt="" />
          <div className='text'>
            <p>{record.name}</p>
            <p>x</p>
            <p>{record.quantity}</p>
          </div>
        </div>
      )
    },
    {
      title: 'Thành tiền',
      dataIndex: 'money',
      key: 'money',
      render: (text) => <a>{VND.format(text)}</a>,
    }
  ];

  const data = listCartLogged.map((item) => ({
    key: item?.id,
    info: {
      image: item?.product[0]?.thumbnail,
      name: item?.product[0]?.name,
      quantity: item?.quantity,
    },
    money: item?.quantity * (item?.product[0]?.price_new === null ? item?.product[0]?.price_old : item?.product[0]?.price_new) 
  }))

  const totalPrice = data?.reduce((total, item) => {
    return total = total + item.money
  }, 0)

  return (
    <div className='payment'>
      <h2>THANH TOÁN</h2>
      <form onSubmit={handleSubmit(onSubmit)}>

          <div className='top'>
            <div className='info-payment'>
              <div className='fullname'>
                <h4>Họ tên <span>*</span></h4>
                <input {...register("name")} placeholder='Họ tên'/>
                <p>{errors.name?.message}</p>
              </div>

              <div className='phone'>
                <h4>Số điện thoại <span>*</span></h4>
                <input {...register("phone")} type='number' placeholder='Số điện thoại'/>
                <p>{errors.phone?.message}</p>
              </div>

              <div className='address'>
                <h4>Tỉnh/Thành phố <span>*</span></h4>
                <Controller
                  name="tinh"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} 
                      control={control}
                      placeholder='Chọn tỉnh/thành phố'
                      onChange={selectTinhThanhpho}
                      >
                    {
                      listTinh.map((item) => (
                      <Option key={item.id} value={item.matp}>
                        {item.name}
                      </Option>
                    ))}
                  </Select> 
                  )}/>   
                  <p>{errors.tinh?.message}</p>
              </div>

              <div className='address'>
                <h4>Quận/Huyện <span>*</span></h4>
                <Controller
                  name="quan"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} 
                      control={control}                        
                      placeholder='Chọn quận/huyện'
                      onChange={selectQuanHuyen} 
                    >
                    {
                      listQuanByTinh.map((item) => (
                      <Option key={item.id} value={item.maqh}>
                        {item.name}
                      </Option>
                    ))}
                  </Select> 
                  )}/>   
                  <p>{errors.quan?.message}</p>
              </div>

              <div className='address'>
                <h4>Xã/Phường <span>*</span></h4>
                <Controller
                  name="xa"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} control={control} placeholder='Chọn xã/phường'>
                    {
                      listXaByQuan.map((item) => (
                      <Option key={item.id} value={item.id}>
                        {item.name}
                      </Option>
                    ))}
                  </Select> 
                  )}/>   
                  <p>{errors.xa?.message}</p>
              </div>

              <div className='address'>
                <h4>Địa chỉ cụ thể <span>*</span></h4>
                <input {...register("address")} placeholder='Địa chỉ nhận hàng ( tên đường, số nhà )'/>
                <p>{errors.address?.message}</p>
              </div>

              <div className='description'>
                <h4>Ghi chú <span>*</span></h4>
                <textarea {...register("note")} placeholder='Ghi chú thêm nếu như bạn cần...'/>
              </div>

            </div>

            <div className='info-cart'>
              <Table 
                columns={columns} 
                dataSource={data} 
                pagination={false} 
                locale={{emptyText: 'Bạn chưa có sản phẩm nào để có thể Đặt hàng'}}
              />
              <div className='total-price'>
                <h3>TỔNG TIỀN</h3>
                <h3>{VND.format(totalPrice)}</h3>
              </div>
            </div>

          </div>

          <div className='btn-payment'>
            <button style={{display: `${listCartLogged.length === 0 ? 'none' : 'block'}`}}>ĐẶT HÀNG</button>
          </div>
            
        </form>
    </div>
  )
}

export default Payment