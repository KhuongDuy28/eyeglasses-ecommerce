import React from 'react'
import './orderChecking.scss'
import { Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { cancelOrder, orderHistory } from '../../../redux/slice/client/orderSlice'
import useConvertToVND from '../../hooks/useConvertToVND'
import { useState } from 'react'
import { message } from 'antd'
import { Image } from 'antd'
import { Space } from 'antd'
import { addMultipleProductOfCart, addProductInCartLogged, getCartByUser } from '../../../redux/slice/client/cartSlice'

const OrderChecking = () => {
  const {VND} = useConvertToVND()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(orderHistory())
  }, [])
  const {listOrder} = useSelector((state) => state?.order)

  const handleCancelOrder = (record) => {
    dispatch(cancelOrder(record?.key)).then((res) => {
      if(res.payload?.status === 200) {
        message.success('Hủy đơn hàng thành công')
        dispatch(orderHistory())
      } else {
        message.error('Hủy đơn hàng thất bại')
      }
    })
  }


  const handleBuy = (record) => {
    const dataAddCart = record?.order_detail?.map((item) => ({
      product_id: item?.product_id,
      quantity: 1
    }))
    dispatch(addMultipleProductOfCart(dataAddCart)).then((res) => {
      // console.log(res);
      if(res.meta?.requestStatus === "fulfilled") {
        dispatch(getCartByUser())
      } 
    })
  }

  const columns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'order_code',
      key: 'order_code',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Họ tên',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Địa chỉ nhận hàng',
      dataIndex: 'address',
      key: 'address',
      width: 200,
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'order_detail',
      key: 'order_detail',
      render: (record) => (
        record.map((item) => (
          <div className='info'>
          <Image src={item?.product[0]?.thumbnail} alt="" />
          <div className='text'>
            <p>Tên sản phẩm: {item?.product[0]?.name}</p>
            <p>Số lượng: {item?.quantity}</p>
            <p>Giá tiền: {VND.format(item?.price)}</p>
          </div>
        </div>
        ))
      )
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'total_price',
      key: 'total_price',
      render: (text) => <p>{VND.format(text)}</p>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      width: 150,
      key: 'status',
      render: (status) => (
            <p className='status' 
              style={{
                color: (status === 4 ? '#52c41a' 
                  : (status === 5 ? '#ff4d4f': '#000'))
              }}>
              {status === 1 && 'Chờ xác nhận'}
              {status === 2 && 'Đang chuẩn bị hàng'}
              {status === 3 && 'Đang được vận chuyển'}
              {status === 4 && 'Đơn hàng đã giao thành công'}
              {status === 5 && 'Đơn hàng đã hủy'}
            </p>
      ),
    },
    {
      key: 'action',
      render: (_, record) => (
       <div className='action-container'>
         <button className={`btn-cancel ${record?.status === 1 ? '' : 'cancelled'}`} 
         onClick={() => handleCancelOrder(record)}>
            Hủy đơn hàng
        </button>
        <button className={`btn-buy ${record?.status === 4 || record?.status === 5  ? '' : 'repurchase'}`} 
        onClick={() => handleBuy(record)}>
          Mua lại
        </button>
       </div>
      ),
    },
  ];

  console.log(listOrder);

  const data = listOrder.map((item) => ({
    key: item?.id,
    order_code: item?.order_code,
    name: item?.name,
    phone: item?.phone,
    order_detail: item?.order_detail,
    total_price: item?.total_price,
    address: item?.address,
    note: item?.note,
    status: item?.status,
  }))
  
  return (
    <div className='order-checking'>
      {/* <h1>LỊCH SỬ MUA HÀNG</h1> */}
      <Table 
        columns={columns}
        dataSource={data}
        locale={{emptyText: ''}}
        pagination={{
          pageSize: 5,
          total: listOrder.length
        }}
      />
    </div>
  )
}

export default OrderChecking