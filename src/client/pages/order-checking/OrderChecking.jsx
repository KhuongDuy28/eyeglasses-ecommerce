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
import { useNavigate } from 'react-router-dom'
import { Modal } from 'antd'

const OrderChecking = () => {
  const {VND} = useConvertToVND()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(orderHistory())
  }, [])
  const {listOrder} = useSelector((state) => state?.order)
  // console.log(listOrder);

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

  const [dataExists, setDataExists] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    const dataAddCart = dataExists?.map((item) => ({
      product_id: item?.product_id,
      quantity: 1
    }))
    dispatch(addMultipleProductOfCart(dataAddCart)).then((res) => {
      // console.log(res);
      if(res.meta?.requestStatus === "fulfilled") {
        dispatch(getCartByUser())
        setTimeout(() => {
          navigate('/cart')
        }, 1000)
      } 
      setIsModalOpen(false);
    })
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleBuy = (record) => {
    if(record?.order_detail?.every((item) => item?.product[0]?.status === 2 || item?.product[0]?.quantity === 0)) {
      return message.error('Sản phẩm đang có tình trạng Hết Hàng hoặc Không Còn Tồn Tại trong hệ thống cửa hàng ANNA')
    } else if(record?.order_detail?.some((item) => item?.product[0]?.status === 2 || item?.product[0]?.quantity === 0)) {
      showModal()
      setDataExists(record?.order_detail?.filter((item) => item?.product[0]?.status === 1 && item?.product[0]?.quantity > 0))
    } else {
      const dataBuy = record?.order_detail?.filter((item) => item?.product[0]?.status === 1)
      const dataAddCart = dataBuy?.map((item) => ({
        product_id: item?.product_id,
        quantity: 1
      }))
      dispatch(addMultipleProductOfCart(dataAddCart)).then((res) => {
        // console.log(res);
        if(res.meta?.requestStatus === "fulfilled") {
          dispatch(getCartByUser())
          setTimeout(() => {
            navigate('/cart')
          }, 1000)
        } 
      })
    }
  }

  const columns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'order_code',
      key: 'order_code',
      width: 110,
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Người nhận',
      dataIndex: 'name',
      key: 'name',
      width: 180,
      render: (_, record) => <>
        <p>Tên: {record?.name}</p>
        <p>Số điện thoại: {record?.phone}</p>
      </>,
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
      render: (_, record) => 
        <div className='price'>
         <p>Phí vận chuyển: {
            (record?.order_detail)?.reduce((total, item) => total + item?.price * item?.quantity, 0) >= 2000000 
            ? VND.format(0) : VND.format(40000)
          }
        </p>
        <p>Tổng tiền: {VND.format(record?.total_price)}</p>
      </div>,
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
      title: 'Phương thức thanh toán',
      dataIndex: 'payment_method',
      key: 'payment_method',
      render: (record) => (
          <p className='payment-method'>
              {record === 1 && 'Thanh toán khi nhận hàng'}
              {record === 2 && 'Thanh toán bằng ví VNPAY'}
              {record === 3 && 'Thanh toán bằng ví Momo'}
          </p>
      ),
    },
    {
      // title: '#',
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

  // console.log(dataExists);

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
    payment_method: item?.payment_method,
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
      <Modal 
        title='Thêm vào giỏ hàng'
        open={isModalOpen} 
        onOk={handleOk} 
        onCancel={handleCancel} 
        // closeIcon={null}
        footer={[
          <button className='btn-oke' key="ok" type="primary" onClick={handleOk}>
            Đã hiểu
          </button>
        ]}>
        <div className='modal-content'>
          {dataExists?.map((item) => 
            <div className='modal-element'>
              <Image src={item?.product[0]?.thumbnail}/>
              <div className='element-content'>
                <p>Tên sản phẩm: {item?.product[0]?.name}</p>
                <p>Số lượng: 1</p>
                <p>Giá tiền: {VND.format(item?.price)}</p>
                <p className='status'>{item?.product[0]?.status}</p>
              </div>
            </div>
          )}
          <p className='note'>Sản phẩm đang có tình trạng <span>Hết Hàng</span> hoặc <span>Không Còn Tồn Tại</span> trong hệ thống cửa hàng ANNA đã bị loại bỏ!</p>
        </div>
      </Modal>
    </div>
  )
}

export default OrderChecking