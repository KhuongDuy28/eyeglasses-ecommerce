import { Table } from 'antd'
import React from 'react'
import useConvertToVND from '../../../../client/hooks/useConvertToVND'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { changeStatusOrder, getOrderByStatus } from '../../../../redux/slice/admin/orderProcessSlice'
import { message } from 'antd'
import '../orderProcess.scss'
import { ConvertToTimeVN } from '../../../utils/ConvertTimeVn'
import { Image } from 'antd'

const Transported = () => {
  const {VND} = useConvertToVND()
  const dispatch = useDispatch()
  useEffect(() => {
      dispatch(getOrderByStatus(3))
  }, [])
  const {listOrderByStatus} = useSelector((state) => state?.orderProcess)

  const handleSuccessfulOrder = (record) => {
      dispatch(changeStatusOrder({
          order_id: record?.key,
          status: 4
      })).then((res) => {
          if(res.payload?.status === 200) {
            message.success('Đơn hàng đã được giao Thành công')
            dispatch(getOrderByStatus(3))
          } else {
            message.error('Thay đổi trạng thái đơn hàng thất bại')
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
          width: 150,
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
          title: 'Transported time',
          dataIndex: 'updated_at',
          key: 'updated_at',
          render: (text) => <p>{ConvertToTimeVN(text)}</p>,
      },
      {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
          render: (record) => (
              <p className='status'>
                  {record === 3 && 'Đang vận chuyển'}
              </p>
          ),
      },
      {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
              <button className='btn-successful' onClick={() => handleSuccessfulOrder(record)}>Giao hàng thành công</button>
          ),
      },
    ];
  
    const data = listOrderByStatus.map((item) => ({
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
      updated_at: new Date(item?.updated_at)
    }))
  return (
    <div className='order-process'>
      <h2>ĐƠN HÀNG ĐANG VẬN CHUYỂN</h2>
      <hr />
      <Table 
          columns={columns}
          dataSource={data}
          locale={{emptyText: ''}}
          pagination={{
            pageSize: 5,
            total: listOrderByStatus.length
        }}
      />
    </div>
  )
}

export default Transported