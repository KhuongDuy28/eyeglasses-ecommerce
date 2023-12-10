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
import { momoOrder, orderClient, orderClientMomo, orderClientVNPay, vnpayOrder } from '../../../redux/slice/client/orderSlice'
import { message } from 'antd'
import { Navigate } from 'react-router-dom'
import { useState } from 'react'
import useUnidecode from '../../hooks/useUnidecode'
import randomStringOrderCode from '../../utils/RandomStringOrderCode'
import { Radio } from 'antd'
import { useNavigate } from 'react-router-dom'
import PaymentMethod1 from '../../assets/img/cash-on-delivery.png'
import PaymentMethod2 from '../../assets/img/logo-vnpay.png'
import PaymentMethod3 from '../../assets/img/logo-momo.png'

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

  const [paymentMethod, setPaymentMethod] = useState()
  const onPaymentMethod = (e) => {
    setPaymentMethod(e.target.value)
  }
  // console.log(paymentMethod);
  // const [dataOrderVNPay, setDataOrderVNPay] = useState()
  const onSubmit = (data) => {
    // console.log(data);
    const dataOrder = {
      name: data.name,
      phone: data.phone,
      tinh: idTinh,
      quan: idQuan,
      xa: data.xa,
      duong: data.address,
      note: data.note
    }
    sessionStorage.setItem('dataWalletPayment', JSON.stringify(dataOrder))
    // console.log(dataOrder);
    if(!paymentMethod) {
      return message.warning('Vui lòng chọn phương thức thanh toán')
    }
    if(paymentMethod === 1) {
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
          setPaymentMethod(undefined)
        } else {
          message.error('Đặt hàng thất bại')
        }
      })
    } else if(paymentMethod === 2) {
      dispatch(vnpayOrder(
        {
          order_code: 'ANNA-' + randomStringOrderCode(8),
          total_price: totalPrice + transportFee,
          redirect: null
        }
      )).then((res) => {
      // console.log(res);
        window.location.href = res.payload?.data?.url_vnpay
      })
    } else if(paymentMethod === 3) {
      dispatch(momoOrder(
        {
          order_code: 'ANNA-' + randomStringOrderCode(8),
          total_price: totalPrice + transportFee,
          redirect: null
        }
      )).then((res) => {
      // console.log(res);
        window.location.href = res.payload?.data?.url_momo
      })
    } 
  }

  const transportFee = totalPrice >= 2000000 ? 0 : 40000

  const navigate = useNavigate()
  const params = new URLSearchParams(window.location.search);
  // Lấy giá trị của các tham số từ URL
  const dataWallet = JSON.parse(sessionStorage.getItem('dataWalletPayment'))
  useEffect(() => {
    //vnpay
    const vnp_ResponseCode = params.get('vnp_ResponseCode');
    const vnp_TxnRef = params.get('vnp_TxnRef');
    // console.log(vnp_TxnRef);
    // console.log(dataOrderVNPay);
    //momo
    const orderId = params.get('orderId')
    const resultCode = params.get('resultCode')
    if(vnp_ResponseCode == '00') {
      dispatch(orderClientVNPay({
        order_code: vnp_TxnRef,
        name: dataWallet?.name,
        phone: dataWallet?.phone,
        tinh: dataWallet?.tinh,
        quan: dataWallet?.quan,
        xa: dataWallet?.xa,
        duong: dataWallet?.duong,
        note: dataWallet?.note
      })).then((res) => {
        // console.log(res);
        if(res.payload?.data.status === 200) {
          message.success('Đặt hàng thành công')
          dispatch(getCartByUser())
          navigate(`/payment`)
          sessionStorage.removeItem('dataWalletPayment')
        } else {
          message.error('Đặt hàng thất bại')
        }
      })
    } else if(resultCode == '0') {
      dispatch(orderClientMomo({
        order_code: orderId,
        name: dataWallet?.name,
        phone: dataWallet?.phone,
        tinh: dataWallet?.tinh,
        quan: dataWallet?.quan,
        xa: dataWallet?.xa,
        duong: dataWallet?.duong,
        note: dataWallet?.note
      })).then((res) => {
        // console.log(res);
        if(res.payload?.data.status === 200) {
          message.success('Đặt hàng thành công')
          dispatch(getCartByUser())
          navigate(`/payment`)
          sessionStorage.removeItem('dataWalletPayment')
        } else {
          message.error('Đặt hàng thất bại')
        }
      })
    }
  }, [])
  
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
                <p>Phí vận chuyển: { totalPrice === 0 ? (VND.format(0)) : (VND.format(transportFee))}</p>
              </div>
              <hr />
              <div className='total-price'>
                <h3>
                TỔNG TIỀN: { totalPrice === 0 ? (VND.format(totalPrice)) : (VND.format(totalPrice + transportFee)) }
                </h3>
              </div>
              <hr />
              <div className='payment-mothod'>
              <Radio.Group onChange={onPaymentMethod} value={paymentMethod}>
                <Radio value={1}>
                  <img src={PaymentMethod1}/> Thanh toán khi nhận hàng
                </Radio>
                <Radio value={2}>
                  <img src={PaymentMethod2}/> Thanh toán bằng ví VNPAY
                </Radio>
                <Radio value={3}>
                  <img src={PaymentMethod3}/> Thanh toán bằng ví Momo
                </Radio>
              </Radio.Group>
              </div>
              <div className='btn-payment'>
                <button style={{display: `${listCartLogged.length === 0 ? 'none' : 'block'}`}}>ĐẶT HÀNG</button>
              </div>
            </div>

          </div>
         
        </form>
        {/* <button onClick={handleMomo}>Thanh Toán MOMO</button> */}
    </div>
  )
}

export default Payment