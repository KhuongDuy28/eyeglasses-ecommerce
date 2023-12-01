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
import { useState } from 'react'
import useUnidecode from '../../hooks/useUnidecode'

const {Option} = Select


const schema = yup
  .object({
    name: yup.string().required('Bạn cần nhập Họ tên'),
    phone: yup.string().required('Bạn cần nhập Số điện thoại')
    .min(10, 'Số điện thoại phải có đủ 10 ký tự')
    .max(10, 'Số điện thoại không được nhiều hơn 10 ký tự'),
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

  const [idTinh, setIdTinh] = useState()
  const selectTinhThanhpho = (matp) => {
    dispatch(getAllQuanByTinh(matp))
    setValue('tinh', matp); // Đặt giá trị trong React Hook Form
    setIdTinh((listTinh?.find((item) => item?.matp === matp))?.id)
  }

  const [idQuan, setIdQuan] = useState()
  const selectQuanHuyen = (maqh) => {
    dispatch(getAllXaByQuan(maqh))
    setValue('quan', maqh);
    setIdQuan((listQuanByTinh?.find((item) => item?.maqh === maqh))?.id)
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
      render: (text) => <p>{VND.format(text)}</p>,
    }
  ];

  const data = listCartLogged?.map((item) => ({
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


  const {searchUnidecode} = useUnidecode()
  const filterOption = (text, option) => {
    return searchUnidecode(text, option);
  };

  const onSubmit = (data) => {
    // console.log(data);
    const dataOrder = {
      name: data.name,
      phone: data.phone,
      tinh: idTinh,
      quan: idQuan,
      // tinh: data.tinh,
      // quan: data?.quan,
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
          note: ''
        })
      } else {
        message.error('Đặt hàng thất bại')
      }
    })
  }

  const transportFee = totalPrice >= 2000000 ? 0 : 40000

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
                      showSearch
                      filterOption={filterOption}
                      >
                    {
                      listTinh.map((item) => (
                      <Option key={item.id} value={item.matp} label={item.name}>
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
                      showSearch
                      filterOption={filterOption}
                    >
                    {
                      listQuanByTinh.map((item) => (
                      <Option key={item.id} value={item.maqh} label={item.name}>
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
                    <Select {...field} 
                      control={control} 
                      placeholder='Chọn xã/phường'
                      showSearch
                      filterOption={filterOption}
                    >
                    {
                      listXaByQuan.map((item) => (
                      <Option key={item.id} value={item.id} label={item.name}>
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
              <h3 className='title-order'>ĐƠN HÀNG CỦA BẠN</h3>
              <Table 
                columns={columns} 
                dataSource={data} 
                pagination={false} 
                locale={{emptyText: 'Bạn chưa có sản phẩm nào để có thể Đặt hàng'}}
              />
              <div className='transport-fee'>
                <p>Thanh toán khi nhận hàng</p>
                <p>Phí vận chuyển: { totalPrice === 0 ? (VND.format(0)) : (VND.format(transportFee))}</p>
              </div>
              <hr />
              <div className='total-price'>
                <h3>
                TỔNG TIỀN: { totalPrice === 0 ? (VND.format(totalPrice)) : (VND.format(totalPrice + transportFee)) }
                </h3>
              </div>
              <hr />
              <div className='btn-payment'>
                <button style={{display: `${listCartLogged.length === 0 ? 'none' : 'block'}`}}>ĐẶT HÀNG</button>
              </div>
            </div>

          </div>

         
            
        </form>
    </div>
  )
}

export default Payment