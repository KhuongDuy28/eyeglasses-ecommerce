import React from 'react'
import './aboutUs.scss'
import ImgAboutUs1 from '../../assets/img/Rectangle-619-1.jpg'
import ImgAboutUs2 from '../../assets/img/Rectangle-620-1.jpg'
import ImgAboutUs3 from '../../assets/img/background.jpg'
import {BsInstagram} from 'react-icons/bs'
import {FaFacebookSquare, FaTiktok} from 'react-icons/fa'
import SliderMyCustomer from '../../components/slider-home/my-customer/SliderMyCustomer'

const AboutUs = () => {
  return (
    <div className='abouts-us'>
      <div className='abouts-us__1'>
        <img className='img-1' src={ImgAboutUs1} alt="" />
        <img className='img-2' src={ImgAboutUs2} alt="" />
        <div className='title__abouts-us__1'>
          <h2>CẢM ƠN VÌ BẠN ĐÃ LỰA CHỌN CHÚNG TÔI</h2>
        </div>
      </div>
      <div className='abouts-us__2'>
        <div className='content'>
          <h2>VŨ TRỤ TRUYỀN THÔNG</h2>
          <p>Kính mắt Anna chắc không còn quá xa lạ với giới trẻ nữa. Đây là kênh thông tin mua sắm và giải trí dành cho giới trẻ, là “món ăn tinh thần” hằng ngày không thể thiếu của mỗi người trẻ.</p>
          <p>Được thành lập từ năm 2015, trải qua hơn 7 năm phát triển kính mắt Anna đã, đang và sẽ chiếm vị trí không thể thiếu đối với các bạn trẻ. Cập nhật thông tin thời trang nhanh chóng và phù hợp với thị hiếu của khán giả thông qua các mạng xã hội như Facebook, Tiktok, Instagram, Youtube, kính mắt Anna là lựa chọn hàng đầu cho những ai muốn tận hưởng các bài viết, video vừa mang tính giải trí mà vẫn có đầy đủ thông tin cần thiết.</p>
        </div>
        <div className='media-channel'>
          <img src={ImgAboutUs3} alt="" />
          <div className='ig'>
            <BsInstagram/>
            <div className='topic'>
              <h4>ANNA</h4>
              <p>@kinhmatanna</p>
            </div>
          </div>
          <div className='fb'>
            <FaFacebookSquare/>
            <div className='topic'>
              <h4>ANNA</h4>
              <p>@kinhmatanna</p>
            </div>
          </div>
          <div className='tiktok'>
            <FaTiktok/>
            <div className='topic'>
              <h4>ANNA</h4>
              <p>@kinhmatanna</p>
            </div>
          </div>
        </div>
      </div>

      <div className='abouts-us__3'>
        <h2>KHÁCH HÀNG THÂN YÊU</h2>
        <SliderMyCustomer/>
      </div>
    </div>
  )
}

export default AboutUs