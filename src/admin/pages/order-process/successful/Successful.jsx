import { Table } from 'antd'
import React from 'react'
import useConvertToVND from '../../../../client/hooks/useConvertToVND'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderByOrderCode, getOrderByStatus } from '../../../../redux/slice/admin/orderProcessSlice'
import { useEffect } from 'react'
import '../orderProcess.scss'
import { ConvertToTimeVN } from '../../../utils/ConvertTimeVn'
import { Image } from 'antd'
import {BsSearch} from 'react-icons/bs'
import { useState } from 'react'

const Successful = () => {
  const {VND} = useConvertToVND()
  const dispatch = useDispatch()
  useEffect(() => {
      dispatch(getOrderByStatus(4))
  }, [])
  const {listOrderByStatus, listOrderByOrderCode} = useSelector((state) => state?.orderProcess)

  const columns = [
      {
          title: 'Order code',
          dataIndex: 'order_code',
          key: 'order_code',
          render: (text) => <p>{text}</p>,
      },
          {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render: (text) => <p>{text}</p>,
      },
      {
          title: 'Phone',
          dataIndex: 'phone',
          key: 'phone',
          render: (text) => <p>{text}</p>,
      },
      {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
          width: 200,
          render: (text) => <p>{text}</p>,
      },
      {
          title: 'Product',
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
          title: 'Price total',
          dataIndex: 'total_price',
          key: 'total_price',
          render: (text) => <p>{VND.format(text)}</p>,
      },
      {
          title: 'Ordered time',
          dataIndex: 'created_at',
          key: 'created_at',
          render: (text) => <p>{ConvertToTimeVN(text)}</p>,
      },
      {
          title: 'Successful time',
          dataIndex: 'updated_at',
          key: 'updated_at',
          render: (text) => <p>{ConvertToTimeVN(text)}</p>,
      },
      {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
          render: (record) => (
              <p className='status successfully'>
                  {record === 4 && 'Giao hàng thành công'}
              </p>
          ),
      }
    ];

    const [search, setSearch] = useState('')
    const handleSearch = (e) => {
      setSearch(e.target.value)
      dispatch(getOrderByOrderCode({
        status: 4,
        order_code: e.target.value
      }))
    }

    const data = (search !== '' ? listOrderByOrderCode : listOrderByStatus)?.map((item) => ({
      key: item?.id,
      order_code: item?.order_code,
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
            pageSize: 5,
            total: search !== '' ? listOrderByOrderCode.length : listOrderByStatus.length
        }}
      />
    </div>
  )
}

export default Successful