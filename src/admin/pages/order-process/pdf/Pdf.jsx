import React from 'react'
import './pdf.scss'
import Logo from '../../../assets/img/logo-admin.jpg'
import { QRCode } from 'antd'
import { ConvertToTimeVN } from '../../../utils/ConvertTimeVn'
import useConvertToVND from '../../../../client/hooks/useConvertToVND'

const Pdf = React.forwardRef((props, ref) => {
  // console.log(props);
  const transportFee = props?.orderByID?.total_price >= 2000000 ? 0 : 40000
  const {VND} = useConvertToVND()
  return (
    <div className="hidden-for-print" ref={ref}>
        <div className='invoice'>
          <div className='title-invoice'>
            <img className='logo-invoice' src={Logo} alt="" />
            <h2>HÓA ĐƠN BÁN HÀNG</h2>
          </div>
          <hr className='hr1'/>
          <p>Mã hóa đơn: {props?.orderByID?.order_code}</p>
          <p>Gửi từ: Cửa hàng kính mắt ANNA</p>
          <p>Người nhận: {props?.orderByID?.name}</p>
          <p>Số điện thoại: {props?.orderByID?.phone}</p>
          <p>Địa chỉ nhận hàng: {props?.orderByID?.address}</p>
          <p>Thời gian đặt hàng: {ConvertToTimeVN(new Date(props?.orderByID?.created_at))}</p>
          <div className='order-details'>
            {props?.orderByID?.order_detail?.map((item, index) => 
              <div className='info-product-order' key={index}>
                <img src={item?.product[0].thumbnail} alt="" />
                <div className='info'>
                  <p>Tên sản phẩm: {item?.product[0].name}</p>
                  <p>Giá tiền: {VND.format(item?.price)}</p>
                  <p>Số lượng: {item?.quantity}</p>
                </div>
              </div>
            )}
          </div>
          <p>Phí vận chuyển: {VND.format(transportFee)}</p>
          <hr className='hr2'/>
          <div className='price-qr'>
            <QRCode 
              size={95} 
              value={'http://localhost:5173/'} 
            />
            <h4>Tổng tiền: {VND.format(props?.orderByID?.total_price)}</h4>
          </div>
          <hr className='hr2'/>
          <div className='position'>
            <h3>Giám đốc</h3>
            <p>Nguyễn Khương Duy</p>
          </div>
        </div>
      </div>
  )
})

export default Pdf