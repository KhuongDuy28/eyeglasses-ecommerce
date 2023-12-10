import { Table } from 'antd'
import React from 'react'
import useConvertToVND from '../../../../client/hooks/useConvertToVND'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderByID, getOrderByOrderCode, getOrderByStatus } from '../../../../redux/slice/admin/orderProcessSlice'
import { useEffect } from 'react'
import '../orderProcess.scss'
import { ConvertToTimeVN } from '../../../utils/ConvertTimeVn'
import { Image } from 'antd'
import {BsSearch} from 'react-icons/bs'
import { useState } from 'react'
import { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { Space } from 'antd'
import { AiOutlinePrinter } from 'react-icons/ai'
import Pdf from '../pdf/Pdf'

const Successful = () => {
  const {VND} = useConvertToVND()
  const dispatch = useDispatch()
  useEffect(() => {
      dispatch(getOrderByStatus(4))
  }, [])
  const {listOrderByStatus, listOrderByOrderCode, orderByID} = useSelector((state) => state?.orderProcess)

  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Hóa Đơn'
  })

  const handlePrintInvoice = (record) => {
    dispatch(getOrderByID(record?.key)).then((res) => {
      if(res.payload?.status === 200) {
        handlePrint()
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
        render: (_, record) => <>
          <p>SĐT: {record?.phone}</p>
          <p>Địa chỉ nhận: {record?.address}</p>
        </>,
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
              {record === 4 && 'Giao hàng thành công'}
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
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <AiOutlinePrinter className='btn-print' onClick={() => handlePrintInvoice(record)}/>
        </Space>
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
        status: 4,
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
      <h2>ĐƠN HÀNG ĐÃ GIAO THÀNH CÔNG</h2>
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

      <Pdf ref={componentRef} orderByID={orderByID}/>

    </div>
  )
}

export default Successful