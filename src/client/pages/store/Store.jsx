import React from 'react'
import StoreImage1 from '../../assets/img/store.jpg'
import StoreImage2 from '../../assets/img/store2.jpg'
import './store.scss'
import { Select } from 'antd'
import { useState } from 'react'

const { Option } = Select

const Store = () => {
  const dataCity = [
    { id: 1, name: 'Hà Nội' },
    { id: 2, name: 'Hà Giang' },
    { id: 3, name: 'Cao Bằng' },
    { id: 4, name: 'Lào Cai' },
    { id: 5, name: 'Tuyên Quang' },
    { id: 6, name: 'Lạng Sơn' },
    { id: 7, name: 'Bắc Kạn' },
    { id: 8, name: 'Thái Nguyên' },
    { id: 9, name: 'Lai Châu' },
    { id: 10, name: 'Sơn La' },
    { id: 11, name: 'Yên Bái' },
    { id: 12, name: 'Phú Thọ' },
    { id: 13, name: 'Quảng Ninh' },
    { id: 14, name: 'Bắc Giang' },
    { id: 15, name: 'Bắc Ninh' },
    { id: 16, name: 'Hải Dương' },
    { id: 17, name: 'Hưng Yên' },
    { id: 18, name: 'Nam Định' },
    { id: 19, name: 'Thái Bình' },
    { id: 20, name: 'Ninh Bình' },
    { id: 21, name: 'Thanh Hóa' },
    { id: 22, name: 'Nghệ An' },
    { id: 23, name: 'Hà Tĩnh' },
    { id: 24, name: 'Quảng Bình' },
    { id: 25, name: 'Quảng Trị' },
    { id: 26, name: 'Thừa Thiên-Huế' },
    { id: 27, name: 'Đà Nẵng' },
    { id: 28, name: 'Quảng Nam' },
    { id: 29, name: 'Quảng Ngãi' },
    { id: 30, name: 'Bình Định' },
    { id: 31, name: 'Phú Yên' },
    { id: 32, name: 'Khánh Hòa' },
    { id: 33, name: 'Ninh Thuận' },
    { id: 34, name: 'Bình Thuận' },
    { id: 35, name: 'Kon Tum' },
    { id: 36, name: 'Gia Lai' },
    { id: 37, name: 'Đắk Lắk' },
    { id: 38, name: 'Đắk Nông' },
    { id: 39, name: 'Lâm Đồng' },
    { id: 40, name: 'Bình Phước' },
    { id: 41, name: 'Tây Ninh' },
    { id: 42, name: 'Bình Dương' },
    { id: 43, name: 'Đồng Nai' },
    { id: 44, name: 'Bà Rịa-Vũng Tàu' },
    { id: 45, name: 'TP. Hồ Chí Minh' },
    { id: 46, name: 'Long An' },
    { id: 47, name: 'Tiền Giang' },
    { id: 48, name: 'Bến Tre' },
    { id: 49, name: 'Trà Vinh' },
    { id: 50, name: 'Vĩnh Long' },
    { id: 51, name: 'Đồng Tháp' },
    { id: 52, name: 'An Giang' },
    { id: 53, name: 'Kiên Giang' },
    { id: 54, name: 'Cần Thơ' },
    { id: 55, name: 'Hậu Giang' },
    { id: 56, name: 'Sóc Trăng' },
    { id: 57, name: 'Bạc Liêu' },
    { id: 58, name: 'Cà Mau' },
    { id: 59, name: 'Tây Nguyên' },
    { id: 60, name: 'Bình Phước' },
    { id: 61, name: 'Đông Nam Bộ' },
    { id: 62, name: 'Bà Rịa - Vũng Tàu' },
    { id: 63, name: 'Kiên Giang' }
  ]
  const dataMap = [
    {
      id: 1,
      name: 'KÍNH MẮT ANNA – 2235 HÙNG VƯƠNG',
      address: 'Số 2235 Đ. Hùng Vương, P. Nông Trang, Tp. Việt Trì, T. Phú Thọ',
      hotline: '0849 341 668',
      worktime: '09:00 - 21:00'
    },
    {
      id: 2,
      name: 'KÍNH MẮT ANNA – 9999 LÁNG THƯỢNG',
      address: 'Số 9999 Đ. Láng, P. Láng Thương, Q. Đống Đa, TP. Hà Nội',
      hotline: '0849 341 668',
      worktime: '09:00 - 21:00'
    },
    {
      id: 3,
      name: 'KÍNH MẮT ANNA – 295 NGUYỄN TRÃI',
      address: 'Số 295 Đ. Nguyễn Trãi, P. Thanh Xuân Bắc, Q. Thanh Xuân, TP. Hà Nội',
      hotline: '0849 341 668',
      worktime: '09:00 - 21:00'
    },
    {
      id: 4,
      name: 'KÍNH MẮT ANNA – 1900 ĐẠI CỒ VIỆT',
      address: 'Số 1900 Đ. Giải Phóng, P. Bách Khoa, Q. Hai Bà Trưng, TP. Hà Nội',
      hotline: '0849 341 668',
      worktime: '09:00 - 21:00'
    },
    {
      id: 5,
      name: 'KÍNH MẮT ANNA – 85 PHỐ HUẾ',
      address: 'Số 85 Đ. Phố Huệ, P. Phố Huế, Q. Hai Bà Trưng, TP. Hà Nội',
      hotline: '0849 341 668',
      worktime: '09:00 - 21:00'
    },
    {
      id: 6,
      name: 'KÍNH MẮT ANNA – 88 TRẦN DUY HƯNG',
      address: 'Số 88 Đ. Trần Duy Hưng, P. Trung Hòa, Q. Cầu Giấy, TP. Hà Nội',
      hotline: '0849 341 668',
      worktime: '09:00 - 21:00'
    },
    {
      id: 7,
      name: 'KÍNH MẮT ANNA – 1000 TRẦN QUỐC VƯỢNG',
      address: 'Số 1000 Đ. Trần Quốc Vượng, P. Dịch Vọng Hậu, Q. Cầu Giấy, TP. Hà Nội',
      hotline: '0849 341 668',
      worktime: '09:00 - 21:00'
    },
    {
      id: 8,
      name: 'KÍNH MẮT ANNA – 858 TÂN BÌNH',
      address: 'Số 858 Tân Bình Đ. Tân Bình, P. Tân Bình, Q. 1, TP. Hồ Chí Minh',
      hotline: '0849 341 668',
      worktime: '09:00 - 21:00'
    },
    {
      id: 9,
      name: 'KÍNH MẮT ANNA – 99 CỘNG HÒA',
      address: 'Số 99 Đ. Nguyễn Đình Viên, P. Cộng Hòa, Tp. Chí Linh, T. Hải Dương',
      hotline: '0849 341 668',
      worktime: '09:00 - 21:00'
    },
    {
      id: 10,
      name: 'KÍNH MẮT ANNA – 61 TRÚC THÔN',
      address: 'Số 61 Đ. Nguyễn Đình Viên, P. Cộng Hòa, Tp. Chí Linh, T. Hải Dương',
      hotline: '0849 341 668',
      worktime: '09:00 - 21:00'
    },
    {
      id: 11,
      name: 'KÍNH MẮT ANNA – 22 TÂN PHÚ',
      address: 'Số 22 Đ. Tân Phú, P. Tân Phú, Q. 2, TP. Hồ Chí Minh',
      hotline: '0849 341 668',
      worktime: '09:00 - 21:00'
    },
    {
      id: 12,
      name: 'KÍNH MẮT ANNA – 89 PHÚ NHUẬN',
      address: 'Số 89 Đ. Phú Nhuận, P. Phú Nhuận, Q. 9, TP. Hồ Chí Minh',
      hotline: '0849 341 668',
      worktime: '09:00 - 21:00'
    },
    {
      id: 13,
      name: 'KÍNH MẮT ANNA – 9898 BÌNH TÂN',
      address: 'Số 9898 Đ. Bình Tân, P. Bình Tân, Q. 10, TP. Hồ Chí Minh',
      hotline: '0849 341 668',
      worktime: '09:00 - 21:00'
    },
    {
      id: 14,
      name: 'KÍNH MẮT ANNA – 895 AN KHÊ',
      address: 'Số 895 Đ. An Khê, P. An Khê, Q. An Khê, TP. Đà Nẵng',
      hotline: '0849 341 668',
      worktime: '09:00 - 21:00'
    },
    {
      id: 15,
      name: 'KÍNH MẮT ANNA – 2235 AN HẢI BẮC',
      address: 'Số 2235 Đ. An Hải Bắc, P. An Hải Bắc, Q. An Hải Bắc, TP. Đà Nẵng',
      hotline: '0849 341 668',
      worktime: '09:00 - 21:00'
    },
    {
      id: 16,
      name: 'KÍNH MẮT ANNA – 100 AN HẢI ĐÔNG',
      address: 'Số 100 Đ. An Hải Đông, P. An Hải Đông, Q An Hải Đông, TP. Đà Nẵng',
      hotline: '0849 341 668',
      worktime: '09:00 - 21:00'
    },
  ] 

  const [dataStore, setDataStore] = useState()

  const handleGetCity = (value) => {
    setDataStore(dataMap.filter((item) => (item?.address.toLowerCase()).includes(value.toLowerCase())))
  }

  console.log(dataStore);

  return (
    <div className='all-stores'>
      <h1>DANH SÁCH ĐẠI LÝ KÍNH MẮT ANNA</h1>
      <div className='list-store'>
        <div className='select-store__by-city'>
          <div className='citis'>
            <Select 
              showSearch
              className='city-container' 
              placeholder='Chọn tỉnh/thành phố'
              onChange={handleGetCity}> 
              {
                dataCity.map((item) => 
                  <Option key={item.id} value={item.name}>{item.name}</Option>
                )
              }
            </Select>
          </div>
          <div className='location-store'>
            {
              (dataStore === undefined ? dataMap : dataStore).map((item) =>
                <div key={item.id} className='store'>
                  <h3>{item.name}</h3>
                  <p>{item.address}</p>
                  <p>{item.hotline}</p>
                  <p>{item.worktime}</p>
                </div>
              )
            }
            {
              dataStore?.length === 0 && <p className='no-data'>Hiện tại cửa hàng không có ở khu vực này</p> 
            }
          </div>
        </div>

        <div className='map'>
          <img src={StoreImage1} alt="" />
          {/* <img src={StoreImage2} alt="" /> */}
        </div>
      </div>
    </div>
  )
}

export default Store