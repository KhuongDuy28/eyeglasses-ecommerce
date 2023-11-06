import React from 'react'
import './orderChart.scss'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReport } from '../../../../redux/slice/admin/reportSlice';
import { useState } from 'react';
import { DatePicker } from 'antd';
import { Bar, BarChart, CartesianGrid, Legend, Pie, PieChart, Rectangle, Tooltip, XAxis, YAxis } from 'recharts';
import {RiEmotionSadLine} from 'react-icons/ri'

const OrderChart = () => {
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
  // console.log(dataReport);
  const onChangeStartTime = (date, dateString) => {
      setStartTime(dateString)
  };
  const onChangeEndTime = (date, dateString) => {
      setEndTime(dateString)
  }

  const mergedArray = (dataReport?.total_order_by_status)?.reduce((acc, current) => {
    const existingItem = acc.find(item => item.status_order === current.status_order);
  
    if (existingItem) {
      existingItem.total_orders += current.total_orders;
    } else {
      acc.push({ status_order: current.status_order, total_orders: current.total_orders });
    }
  
    return acc;
  }, []);

  const data = mergedArray?.map((item) => ({
    status_order: (item?.status_order === 1 ? 'Chờ xác nhận' : (item?.status_order === 2 ? 'Đang chuẩn bị'
                  : (item?.status_order === 3 ? 'Đang vận chuyển' : (item?.status_order === 4 ? 'Giao hàng thành công' : (item?.status_order === 5 && 'Đã hủy'))))),
    total_orders: item?.total_orders,
  }))

  const CustomTooltip = ({ active, payload, label }) => {
    console.log(active, payload);
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${payload[0]?.value }`}</p>
        </div>
      );
    }
  
    return null 
  };

  return (
    <div className='order-chart'>
      <h2>ĐƠN HÀNG</h2>
      <hr className='hr1'/>
      <div className='chart-container'>
        <div className='date'>
          <DatePicker onChange={onChangeStartTime} placeholder='Start time'/>
          <DatePicker onChange={onChangeEndTime} placeholder='End time'/>
        </div>
        {
          data?.length !== 0
          ? <BarChart
          width={888}
          height={400}
          data={data}
          margin={{
            top: 5,
            bottom: 5,
          }}
          >
            <CartesianGrid strokeDasharray="1 2" />
            <XAxis dataKey="status_order" />
            <YAxis domain={[0, 40]}/>
            <Tooltip content={<CustomTooltip/>}/>
            <Legend payload={[
              {
                value: 'Trạng thái đơn hàng',
                type: 'rect',
                color: '#81c8c2'
              }
            ]}/>
            <Bar 
              dataKey="total_orders" 
              fill="#81c8c2" 
              activeBar={<Rectangle fill="gold"/>} 
              barSize={50}
            />
          </BarChart>
          : <div className='no-data'>
            <h3><RiEmotionSadLine className='ic-sad'/>KHÔNG CÓ ĐƠN HÀNG NÀO TRONG THỜI GIAN NÀY</h3>
          </div>
        }
      </div>
    </div>
  )
}

export default OrderChart