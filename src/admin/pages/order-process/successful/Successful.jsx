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
          title: 'Thời gian giao hàng',
          dataIndex: 'updated_at',
          key: 'updated_at',
          render: (text) => <p>{ConvertToTimeVN(text)}</p>,
      },
      {
          title: 'Trạng thái',
          dataIndex: 'status',
          key: 'status',
          render: (record) => (
              <p className='status successfully'>
                  {record === 4 && 'Giao hàng thành công'}
              </p>
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
      />

      <Pdf componentRef={componentRef} orderByID={orderByID}/>

    </div>
  )
}

export default Successful