import React from 'react'
import LogoFooter from '../../assets/Anna-footer.svg'
import LogoBCTNotification from '../../assets/img/logo-BCT-noti.gif'
import LogoDMCA from '../../assets/img/dmca.png'
import {BsShieldCheck, BsEye} from 'react-icons/bs'
import {RxUpdate} from 'react-icons/rx'
import {PiPaintBrushBroad} from 'react-icons/pi'
import './footer.scss'
import {FaSquareFacebook, FaSquareInstagram} from 'react-icons/fa6'
import {SiShopee} from 'react-icons/si'
import {BiLogoTiktok} from 'react-icons/bi'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer-top'>
        <div className='logo-footer'>
          <img src={LogoFooter} />
        </div>
        <div className='list'>
          <div className='element'>
            <BsShieldCheck className='i'/>
            <p>
              <Link to={'/'}>Chính sách bảo hành</Link>
            </p>
          </div>
          <div className='element'>
            <BsEye className='ic'/>
            <p>
              <Link to={'/'}>Khám mắt miễn phí</Link>
            </p>
          </div>
          <div className='element'>
            <RxUpdate className='ic'/>
            <p>
              <Link to={'/'}>Thu cũ đổi mới</Link>
            </p>
          </div>
          <div className='element'>
            <PiPaintBrushBroad className='ic'/>
            <p>
              <Link to={'/'}>Vệ sinh & bảo quản kính mắt</Link>
            </p>
          </div>
        </div>
      </div>
      <div className='footer-center'>
        <div className='all-product'>
          <h3>Tất cả sản phẩm</h3>
          <p>Gọng kính</p>
          <p>Tròng kính</p>
          <p>Kính râm</p>
          <p>Phụ kiện</p>
        </div>
        <div className='purchase-policy'>
          <h3>Chính sách mua hàng</h3>
          <p>Hình thức thanh toán</p>
          <p>Chính sách giao hàng</p>
          <p>Chính sách bảo hành</p>
        </div>
        <div className='contact-info'>
          <h3>Thông tin liên hệ</h3>
          <p>Điện thoại: 1900 0359</p>
          <p>Email: marketing@kinhmatanna.com</p>
          <p>Website: kinhmatanna.com</p>
          <div className='e-commerce'>
            <FaSquareFacebook className='ic facebook'/>
            <FaSquareInstagram className='ic instagram'/>
            <SiShopee className='ic shopee'/>
            <BiLogoTiktok className='ic tiktok'/>
          </div>
        </div>
        <div className='about-anna'>
          <h3>Về Anna</h3>
          <p>Mã số thuế: 0108195925</p>
          <img className='logo-bct-noti' src={LogoBCTNotification} />
          <img className='logo-dmca' src={LogoDMCA} />
        </div>
      </div>
      <div className='footer-bottom'>
        <p>&copy; <span>2023 annaeyeglasses. Powered by OkHub Việt Nam. Copyright belong to Nguyễn Khương Duy</span></p>
      </div>
    </div>
  )
}

export default Footer