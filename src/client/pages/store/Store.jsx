import React from 'react'
import StoreImage1 from '../../assets/img/store.jpg'
import StoreImage2 from '../../assets/img/store2.jpg'
import './store.scss'
import { Select } from 'antd'
import { useState } from 'react'
import dataListCity from '../../../admin/utils/City'
import dataListStore from '../../../admin/utils/Store'

const { Option } = Select

const Store = () => {

  const [dataStore, setDataStore] = useState()

  const handleGetCity = (value) => {
    setDataStore(dataListStore.filter((item) => (item?.address.toLowerCase()).includes(value.toLowerCase())))
  }

  // console.log(dataStore);

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
                dataListCity.map((item) => 
                  <Option key={item.id} value={item.name}>{item.name}</Option>
                )
              }
            </Select>
          </div>
          <div className='location-store'>
            {
              (dataStore === undefined ? dataListStore : dataStore).map((item) =>
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