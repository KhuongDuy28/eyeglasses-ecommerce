import React from 'react'
import './productChart.scss'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getReport } from '../../../../redux/slice/admin/reportSlice'
import { Bar, BarChart, CartesianGrid, Legend, Rectangle, Tooltip, XAxis, YAxis } from 'recharts'
import { DatePicker, Table } from 'antd'
import {SiMicrosoftexcel} from 'react-icons/si'
import { useDownloadExcel } from 'react-export-table-to-excel';
import { useRef } from 'react'
import moment from 'moment';

const ProductChart = () => {
  const dispatch = useDispatch()
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  useEffect(() => {
      dispatch(getReport({
          date_from: startTime,
          date_to: endTime
      }))
  }, [startTime, endTime])
  const {dataReport} = useSelector((state) => state?.report)
  // console.log(startTime);
  const onChangeStartTime = (date, dateString) => {
      setStartTime(dateString)
  };
  const onChangeEndTime = (date, dateString) => {
      setEndTime(dateString)
  }

  // Lấy thời gian hiện tại
  const currentDate = moment();
  const timeCurrent = currentDate.format('YYYY-MM-DD');
  // Lấy thời gian 7 ngày trước. Định dạng ngày theo yyyy-mm-dd
  const timeSevenDaysAgo = (currentDate.subtract(7, 'days')).format('YYYY-MM-DD');

  const mergedArray = (dataReport?.total_product_sell)?.reduce((acc, current) => {
    const existingItem = acc.find(item => item.product_id === current.product_id);
  
    if (existingItem) {
      existingItem.total_quantity_sell += parseInt(current.total_quantity_sell);
    } else {
      acc.push({ product_id: current.product_id, name:current.name, total_quantity_sell: parseInt(current.total_quantity_sell)});
    }
  
    return acc;
  }, []);

  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Số lượng bán ra',
      dataIndex: 'quantity',
      key: 'quantity',
    }
  ];

    const data = mergedArray?.map((item, index) => ({
      key: index,
      name: item?.name,
      quantity: item?.total_quantity_sell,
    }))

    const [size, setSize] = useState(5)
    const customTextPagination = {
      items_per_page: 'sản phẩm'
    }

    const tableRef = useRef(null);

    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: 'Thống kê số lượng sản phẩm bán ra',
        sheet: 'Kết quả thống kê'
    })

  return (
    <div className='product-chart'>
      <h2>SẢN PHẨM BÁN RA</h2>
      <hr />
      <div className='date'>
        <DatePicker onChange={onChangeStartTime} placeholder='Thời gian bắt đầu'/>
        <DatePicker onChange={onChangeEndTime} placeholder='Thời gian kết thúc' disabled={startTime !== '' ? false : true}/>
      </div>
      <div className='export-excel'>
          <SiMicrosoftexcel className='btn-excel' onClick={onDownload}/>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize: size,
          total: data?.length,
          pageSizeOptions: ['5', '10', '20'],
          showSizeChanger: true,
          onShowSizeChange: (currentPage, size) => {
            setSize(size)
          },
          locale: {...customTextPagination}
        }}
        locale={{emptyText: 'KHÔNG CÓ SẢN PHẨM NÀO ĐƯỢC BÁN RA TRONG THỜI GIAN NÀY'}}
      />

      <div style={{ display: 'none' }}>
        <table ref={tableRef}>
          <thead>
            <tr>
              <th colspan="3" style={{textAlign: 'center'}}>
               {
                (startTime  === '' && endTime  === '') ? `THỐNG KÊ SỐ LƯỢNG SẢN PHẨM BÁN TRONG THỜI GIAN TỪ ${timeSevenDaysAgo.split('-').reverse().join('-')} ĐẾN ${timeCurrent.split('-').reverse().join('-')}` : ''
               }
               {
                (startTime !== '' && endTime === '') ? `THỐNG KÊ SỐ LƯỢNG SẢN PHẨM BÁN TRONG THỜI GIAN TỪ ${startTime.split('-').reverse().join('-')} ĐẾN ${timeCurrent.split('-').reverse().join('-')}` : ''
               }
               {
                (startTime && endTime) !== '' ? `THỐNG KÊ SỐ LƯỢNG SẢN PHẨM BÁN TRONG THỜI GIAN TỪ ${startTime.split('-').reverse().join('-')} ĐẾN ${endTime.split('-').reverse().join('-')}` : ''
               }
              </th>
            </tr>
            <tr>
              <th style={{textAlign: 'center'}}>STT</th>
              <th style={{textAlign: 'center'}}>Tên sản phẩm</th>
              <th style={{textAlign: 'center'}}>Số lượng bán</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) =>               
              <tr key={index}>
                <td style={{textAlign: 'start'}}>{index}</td>
                <td style={{textAlign: 'center'}}>{item?.name}</td>
                <td style={{textAlign: 'center'}}>{item?.quantity}</td>
              </tr>)}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default ProductChart