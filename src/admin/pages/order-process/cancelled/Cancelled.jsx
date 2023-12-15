import React from 'react'
import '../orderProcess.scss'
import useConvertToVND from '../../../../client/hooks/useConvertToVND'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getOrderByOrderCode, getOrderByStatus } from '../../../../redux/slice/admin/orderProcessSlice'
import { Table } from 'antd'
import { ConvertToTimeVN } from '../../../utils/ConvertTimeVn'
import { Image } from 'antd'
import {BsSearch} from 'react-icons/bs'
import { useState } from 'react'

const Cancelled = () => {
  const {VND} = useConvertToVND()
  const dispatch = useDispatch()
  useEffect(() => {
      dispatch(getOrderByStatus(5))
  }, [])
  const {listOrderByStatus, listOrderByOrderCode} = useSelector((state) => state?.orderProcess)

  const columns = [
    {
        title: 'Mã đơn hàng',
        dataIndex: 'order_code',
        key: 'order_code',
        render: (text) => <p>{text}</p>,
    },
    {
      title: 'Người nhận',
      dataIndex: 'email',
      key: 'email',
      render: (_, record) => 
        <div className='client'>
          <p>Người nhận: {record?.name}</p>
          <p style={{color: `${!(record?.email) ? '#ff6565' : '#000'}`}}>
            Email: {!(record?.email) ? 'Tài khoản này đã bị xóa' : (record?.email)}
          </p>
        </div>,
    },
    {
        title: 'Liên hệ',
        dataIndex: 'phone',
        key: 'phone',
        render: (_, record) => <div className='contact'>
          <p>SĐT: {record?.phone}</p>
          <p>Địa chỉ nhận: {record?.address}</p>
        </div>,
    },
    {
        title: 'Chi tiết đơn hàng',
        dataIndex: 'order_detail',
        key: 'order_detail',
        render: (record) => (
            record.map((item) => (
                // console.log(item)
            <div className='info'>
              <Image width={55} src={item?.product[0]?.thumbnail} alt="" />
              <div className='text'>
                <p>Tên: {item?.product[0]?.name}</p>
                <p>Số lượng: {item?.quantity}</p>
                <p>Giá: {VND.format(item?.price)}</p>
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
          <p>Tổng tiền: {record?.total_price}</p>
        </div>,
    },
    {
      title: 'Thời gian',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (_, record) => <div className='time'>
        <p>Đặt hàng: {ConvertToTimeVN(record?.created_at)}</p>
        <p>Xác nhận: {ConvertToTimeVN(record?.updated_at)}</p>
      </div>,
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
        render: (record) => (
            <p className='status'>
                {record === 5 && 'Đã bị hủy'}
            </p>
        ),
    },
    {
      title: 'Phương thức thanh toán',
      dataIndex: 'payment_method',
      key: 'payment_method',
      render: (record) => (
          <div className='payment-method'>
              {record === 1 && 'Thanh toán khi nhận hàng'}
              {record === 2 && 'Thanh toán bằng ví VNPAY'}
              {record === 3 && 'Thanh toán bằng ví Momo'}
          </div>
      ),
    },
    ];

    const [currentPage, setCurrentPage] = useState(1)
    const handlePage = (page) => {
      setCurrentPage(page)
    }
    const [search, setSearch] = useState('')
    const handleSearch = (e) => {
      setSearch(e.target.value)
      setCurrentPage(1)
      dispatch(getOrderByOrderCode({
        status: 5,
        order_code: e.target.value
      }))
    }

    const data = (search !== '' ? listOrderByOrderCode : listOrderByStatus)?.map((item) => ({
      key: item?.id,
      order_code: item?.order_code,
      email: item?.user?.email,
      name: item?.name,
      phone: item?.phone,
      order_detail: item?.order_detail,
      total_price: item?.total_price,
      address: item?.address,
      note: item?.note,
      status: item?.status,
      payment_method: item?.payment_method,
      created_at: new Date(item?.created_at),
      updated_at: new Date(item?.updated_at),
    }))
    const [size, setSize] = useState(5)
    const customPaginationText = {
      items_per_page: 'đơn hàng',
    };
  return (
    <div className='order-process'>
      <h2>ĐƠN HÀNG ĐÃ HỦY</h2>
      <hr />
      <div className='search'>
        <input type="text" onChange={handleSearch}/>
        <BsSearch/>
      </div>
      <Table 
          columns={columns}
          dataSource={data}
          pagination={{
            pageSize: size,
            total: search !== '' ? listOrderByOrderCode.length : listOrderByStatus.length,
            current: currentPage,
            pageSizeOptions: ['5', '10', '15', '20', '25'],
            showSizeChanger: true,
            onShowSizeChange: (currentPage, size) => {
              setSize(size)
            },
            locale: {...customPaginationText},
            onChange: (page) => handlePage(page)
        }}
        locale={{emptyText: 'HIỆN TẠI KHÔNG CÓ ĐƠN HÀNG NÀO'}}
      />
    </div>
  )
}

export default Cancelled