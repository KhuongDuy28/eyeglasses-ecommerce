import React from 'react'
import './dashboard.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getTotalAccount, getTotalProduct } from '../../../redux/slice/admin/reportSlice'
import { Pie } from 'react-chartjs-2';
import {} from 'chart.js/auto';

const Dashboard = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getTotalProduct())
    dispatch(getTotalAccount())
  }, [])
  const {dataTotalProduct, dataTotalAccount} = useSelector((state) => state?.report)
  const totalProduct = dataTotalProduct?.reduce((total, item) => {
    return total = total + item?.total_product
  }, 0)
  const totalAccount = dataTotalAccount?.reduce((total, item) => {
    return total = total + item?.total_user
  }, 0)

  const dataProduct = {
    labels: dataTotalProduct.map((item) => item?.name),
    datasets: [{
        data: dataTotalProduct.map((item) => item?.total_product),
        backgroundColor: ['#ff4d4f', '#9932cc', '#52c41a', '#faad14']
    }]
  };  

  const dataAccount = {
    labels: dataTotalAccount.map((item) => (
        item?.role === 1 ? 'Quản trị viên' 
        : (item?.role === 2 ? 'Nhân viên' 
        : (item?.role === 3 && 'Khách hàng'))
    )),
    datasets: [{
        data: dataTotalAccount.map((item) => item?.total_user),
        backgroundColor: ['#deb887', '#ffb6c1', '#1677ff']
    }]
  }; 
  
  const role = JSON.parse(localStorage.getItem('role'))
  return (
    <div className='dashboard'>
      <h1>HELLO, HAVE A NICE WORKING DAY</h1>
      <hr />
      <div className='dashboard-container' style={{display: `${role === 1 ? 'block' : 'none'}`}}>
        <div className='total-analys'>
          <div className='total-product'>
            <p>Tổng số sản phẩm: {totalProduct}</p>
            <Pie data={dataProduct} />
            {/* {dataTotalProduct?.map((item, index) => 
              <p key={index} className='product__by__category'>{item?.name}: {item?.total_product}</p>
            )} */}
          </div>
    
          <div className='total-user'>
            <p>Tổng số tài khoản: {totalAccount}</p>
            <Pie data={dataAccount} />
            {/* {dataTotalAccount?.map((item) => 
              <p className='product__by__category'>
                {
                  item?.role === 1 && 'Quản trị viên'
                } 
                {
                  item?.role === 2 && 'Khách hàng'
                }
                {
                  item?.role === 3 && 'Nhân viên'
                }
                : {item?.total_user}</p>
            )} */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard