import { Table } from 'antd'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { adminCancelOrder, changeStatusOrder, getOrderByStatus } from '../../../../redux/slice/admin/orderProcessSlice'
import useConvertToVND from '../../../../client/hooks/useConvertToVND'
import { Space } from 'antd'
import '../orderProcess.scss'
import { message } from 'antd'
import { ConvertToTimeVN } from '../../../utils/ConvertTimeVn'
import { Image } from 'antd'
import {BsSearch} from 'react-icons/bs'
import { useState } from 'react'

const WaitConfirm = () => {
    const {VND} = useConvertToVND()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getOrderByStatus(1))
    }, [])
    const {listOrderByStatus, listOrderByOrderCode} = useSelector((state) => state?.orderProcess)

    const handleConfirmOrder = (record) => {
        dispatch(changeStatusOrder({
            order_id: record?.key,
            status: 2
        })).then((res) => {
            if(res.payload?.status === 200) {
              message.success('Đơn hàng đã được Xác nhận')
              dispatch(getOrderByStatus(1))
            } else {
              message.error('Xác nhận đơn hàng thất bại')
            }
          })
    }

    const handleCancelOrder = (record) => {
        dispatch(adminCancelOrder(record?.key)).then((res) => {
          if(res.payload?.status === 200) {
            message.success('Hủy đơn hàng thành công')
            dispatch(getOrderByStatus(1))
          } else {
            message.error('Hủy đơn hàng thất bại')
          }
        })
    }

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
                    // console.log(item)
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
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (record) => (
                <p className='status'>
                    {record === 1 && 'Chờ xác nhận'}
                </p>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
              <Space size="middle">
                <button className='btn-confirm' onClick={() => handleConfirmOrder(record)}>Xác nhận</button>
                <button className='btn-cancel' onClick={() => handleCancelOrder(record)}>Hủy</button>
              </Space>
            ),
        },
      ];

      const [search, setSearch] = useState('')
      const handleSearch = (e) => {
        setSearch(e.target.value)
        dispatch(getOrderByOrderCode({
          status: 1,
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
        created_at: new Date(item?.created_at)
      }))

    return (
        <div className='order-process'>
            <h2>ĐƠN HÀNG CHỜ XÁC NHẬN</h2>
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

export default WaitConfirm