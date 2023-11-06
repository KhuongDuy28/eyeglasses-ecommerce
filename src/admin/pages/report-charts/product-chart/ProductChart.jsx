import React from 'react'
import './productChart.scss'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getReport } from '../../../../redux/slice/admin/reportSlice'
import { Bar, BarChart, CartesianGrid, Legend, Rectangle, Tooltip, XAxis, YAxis } from 'recharts'
import { DatePicker, Table } from 'antd'

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
  // console.log(dataReport);
  const onChangeStartTime = (date, dateString) => {
      setStartTime(dateString)
  };
  const onChangeEndTime = (date, dateString) => {
      setEndTime(dateString)
  }

  const mergedArray = (dataReport?.total_product_sell)?.reduce((acc, current) => {
    const existingItem = acc.find(item => item.product_id === current.product_id);
  
    if (existingItem) {
      existingItem.total_quantity_sell += parseInt(current.total_quantity_sell);
    } else {
      acc.push({ product_id: current.product_id, name:current.name, total_quantity_sell: parseInt(current.total_quantity_sell)});
    }
  
    return acc;
  }, []);

  // // console.log(mergedArray);

  // const data = mergedArray?.map((item) => ({
  //   product_id: item?.product_id,
  //   total_quantity_sell: item?.total_quantity_sell,
  // }))

  // const CustomTooltip = ({ active, payload, label }) => {
  //   if (active) {
  //     return (
  //       <div className="custom-tooltip">
  //         <p className="label">{`${payload[0].value}`}</p>
  //       </div>
  //     );
  //   }
  
  //   return null;
  // };

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

  console.log(mergedArray);
    const data = mergedArray?.map((item) => ({
    name: item?.name,
    quantity: item?.total_quantity_sell,
  }))
  
  return (
    <div className='product-chart'>
      <h2>SẢN PHẨM BÁN RA</h2>
      <hr />
      <div className='date'>
        <DatePicker onChange={onChangeStartTime} placeholder='Start time'/>
        <DatePicker onChange={onChangeEndTime} placeholder='End time'/>
      </div>
      {/* <BarChart
      width={1150}
      height={350}
      data={data}
      margin={{
        top: 5,
        bottom: 5,
      }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="product_id" />
        <YAxis domain={[0, 100]}/>
        <Tooltip content={<CustomTooltip />}/>
        <Legend payload={[
          {
            value: 'Số lượng bán ra mỗi sản phẩm',
            type: 'rect',
            color: '#81c8c2'
          }
        ]}/>
        <Bar dataKey="total_quantity_sell" fill="#81c8c2" activeBar={<Rectangle fill="gold"/>} barSize={20}/>
      </BarChart> */}
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize: 5,
          total: data?.length
        }}
        locale={{emptyText: 'KHÔNG CÓ SẢN PHẨM NÀO TRONG THỜI GIAN NÀY'}}
      />
    </div>
  )
}

export default ProductChart