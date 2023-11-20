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
          title: 'Tài khoản đặt hàng',
          dataIndex: 'email',
          key: 'email',
          render: (email) => 
            <p style={{color: `${!email ? '#ff6565' : '#000'}`}}>
              {!email ? 'Tài khoản này đã bị xóa' : email}
            </p>,
      },
      {
          title: 'Người nhận',
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
          width: 150,
          render: (text) => <p>{text}</p>,
      },
      {
          title: 'Chi tiết đơn hàng',
          dataIndex: 'order_detail',
          key: 'order_detail',
          render: (record) => (
              record.map((item) => (
                //   console.log(item)
                <div className='info'>
                <Image  width={55} src={item?.product[0]?.thumbnail} alt="" />
                <div className='text'>
                  <p>{item?.product[0]?.name}</p>
                  <p>{item?.quantity}</p>
                  <p>{VND.format(item?.price)}</p>
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
          title: 'Thời gian đặt hàng',
          dataIndex: 'created_at',
          key: 'created_at',
          render: (text) => <p>{ConvertToTimeVN(text)}</p>,
      },
      {
        title: 'Thời gian hủy đơn hàng',
        dataIndex: 'updated_at',
        key: 'updated_at',
        render: (text) => <p>{ConvertToTimeVN(text)}</p>,
      },
      {
          title: 'Trạng thái',
          dataIndex: 'status',
          key: 'status',
          render: (record) => (
              <p className='status cancel'>
                  {record === 5 && 'Đã Hủy'}
              </p>
          ),
      }
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