import React from 'react'
import useConvertToVND from '../../../../client/hooks/useConvertToVND';
import './salesChart.scss'
import { DatePicker } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getReport } from '../../../../redux/slice/admin/reportSlice';
import { useState } from 'react';

const SalesChart = () => {
    const {VND} = useConvertToVND()
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
    console.log(dataReport);
    const onChangeStartTime = (date, dateString) => {
        setStartTime(dateString)
    };
    const onChangeEndTime = (date, dateString) => {
        setEndTime(dateString)
    }

    const totalPrice = (dataReport?.total_sum_money)?.reduce((total, item) => {
        return total + item?.total_price
    }, 0) 
    // console.log(totalPrice);
    return (
        <div className='sales-chart'>
            <h2>DOANH SỐ BÁN HÀNG</h2>
            <hr />
            <div className='date'>
                <DatePicker onChange={onChangeStartTime} placeholder='Thời gian bắt đầu'/>
                <DatePicker onChange={onChangeEndTime} placeholder='Thời gian kết thúc' disabled={startTime !== '' ? false : true}/>
            </div>
            <div className='chart'>
                {
                    (dataReport?.total_sum_money)?.length > 0 
                    ? (
                        <p>{VND.format(totalPrice)}</p>
                    )
                    : (
                        <p>{VND.format(0)}</p>
                    )
                }
            </div>
        </div>
    )
}

export default SalesChart