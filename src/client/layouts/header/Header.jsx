import React from 'react'
import Logo from '../../assets/Logo-anna.svg'
import {Dropdown} from 'antd';
import {RiAccountCircleLine} from 'react-icons/ri'
import {HiOutlineShoppingBag} from 'react-icons/hi'
import {AiFillCaretDown} from 'react-icons/ai'
import './header.scss'
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { Drawer } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategoty, getAllCategotyClient } from '../../../redux/slice/admin/categorySlice';
import useConvertToVND from '../../hooks/useConvertToVND';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { addProductInCartNotLogin, deleteProductInCartLogged, getCartByUser } from '../../../redux/slice/client/cartSlice';
import { message } from 'antd';

const Header = () => {
  // const role = JSON.parse(localStorage.getItem('role'))
  const user_id = JSON.parse(localStorage.getItem('user_id'))
  const {VND} = useConvertToVND()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllCategotyClient())
  }, [])

  useEffect(() => {
    if(user_id) {
      dispatch(getCartByUser())
    }
  }, [user_id])

  const {listCartNotLogin, listCartLogged } = useSelector((state) => state?.cart)
  // console.log(listCartLogged);

  const dataListCategory = useSelector((state) => state?.category?.listCategoryClient)

  const items =  dataListCategory.map((item) => ({
      key: item.id,
      label: <Link to={
          (item?.name === 'Gọng kính' ? '/products/eyeglass-frames'
        : (item?.name === 'Tròng kính' ? '/products/the-lens' 
        : (item?.name === 'Gọng kính trẻ em' ? '/products/children-glasses' 
        : (item?.name === 'Kính râm' && '/products/sunglass')
      )))
      }>
        {item.name}
      </Link>
    }))
  
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const dataCartNotLogin = JSON.parse(sessionStorage.getItem('cart'))
  // console.log(dataCartNotLogin);
  const totalPriceNotLogin = dataCartNotLogin?.reduce((total, item) => {
    return total + (item.price * item.quantity)
  }, 0);

  const totalPriceLogged = listCartLogged?.reduce((total, item) => {
    return total + ((item?.product[0]?.price_new === null ? item?.product[0]?.price_old : item?.product[0]?.price_new) * item.quantity)
  }, 0);

  const handleDeleteProductCart = (e) => {
    if(!user_id) {
      const indexToRemove = dataCartNotLogin.findIndex(item => item.product_id == e.target.id);

      if (indexToRemove !== -1) {
        // Nếu tìm thấy, xóa object đó khỏi mảng
        dataCartNotLogin.splice(indexToRemove, 1);

        // Lưu mảng đã cập nhật trở lại vào localStorage
        sessionStorage.setItem('cart', JSON.stringify(dataCartNotLogin));
        dispatch(addProductInCartNotLogin(dataCartNotLogin))
      }
    } else {
      dispatch(deleteProductInCartLogged(e.target.id)).then((res) => {
        if(res.payload.status === 200) {
          dispatch(getCartByUser())
        }
      })
    }
  }

  const goToOrderChecking = () => {
    if(user_id) {
      navigate('/order-checking')
    } else {
      message.warning('Bạn cần phải Đăng nhập')
      navigate('/login')
    }
  }

  const goAccount = () => {
    if(user_id) {
      navigate('/account')
    } else {
      message.warning('Bạn cần phải Đăng nhập')
      navigate('/login')
    }
  }

  const goToPayment = () => {
    if(!user_id) {
      message.warning('Bạn cần phải Đăng nhập')
      navigate('/login')
    } else if(user_id) {
      navigate('/payment')
      onClose()
    }
  }

  const goToCart = () => {
    if(!user_id) {
      message.warning('Bạn cần phải Đăng nhập')
      navigate('/login')
    } else if(user_id) {
      navigate('/cart')
      onClose()
    }
  }

  return (
    <div className='header'>
      <div className='logo'>
        <Link to={'/'} ><img src={Logo} /></Link>
      </div>
      <div className='widget-elements'>
        <li><NavLink to={'/'} >TRANG CHỦ</NavLink></li>
        <Dropdown
          className='dropdown-product'
          menu={{
            items,
          }}
          placement="bottomLeft"
        >
        <li>
            <NavLink to={'/products'}>
                SẢN PHẨM 
                <AiFillCaretDown/>
            </NavLink>
        </li>
        </Dropdown>
        <li>
          <NavLink to={'/about-us'} >
            ABOUT US
          </NavLink>
        </li>
        <li>
          <p onClick={goToOrderChecking}>
            ORDER CHECKING
          </p>
        </li>
        <li>
          <NavLink to={'/store'} >
            STORE
          </NavLink>
        </li>
      </div>
      <div className='icon-header'>
        <div className='account-ic__container' onClick={goAccount}> 
          <RiAccountCircleLine className='ic account'/>
        </div>
        <div className='quantity-product of-cart' onClick={showDrawer}>
          <HiOutlineShoppingBag className='ic cart'/>
          <span>
            {!user_id  && (dataCartNotLogin === null ? 0 : dataCartNotLogin?.length)}
            {user_id && listCartLogged.length}
          </span>
        </div>
        <Drawer 
          title="GIỎ HÀNG CỦA BẠN" 
          placement="right" 
          onClose={onClose} 
          width={450}
          open={open}>
              {
              !user_id 
                ? (dataCartNotLogin?.length > 0 
                    ? dataCartNotLogin?.map((item, index) =>
                    <div key={index} className='element-product'>
                      <Link to={`/products/details-product/${item?.product_id}`} className='left'>
                        <img src={item?.image} alt="" />
                      </Link>
                      <div className='right'>
                        <p>Tên sản phẩm: {item?.name}</p>
                        <p>Số lượng: {item?.quantity}</p>
                        <p>Giá tiền: {VND.format(item?.price)}</p>
                      </div>
                      <div className='x'>
                        <button id={item?.product_id} onClick={handleDeleteProductCart}>X</button>
                      </div>
                    </div>
                  ) : <h4>Bạn chưa có sản phẩm trong Giỏ hàng</h4>
                )
                : (listCartLogged.length > 0
                  ? listCartLogged?.map((item, index) =>
                  <div key={index} className='element-product'>
                    <Link to={`/products/details-product/${item?.product_id}`} className='left'>
                      <img src={item?.product[0]?.thumbnail} alt="" />
                    </Link>
                    <div className='right'>
                      <p>Tên sản phẩm: {item?.product[0]?.name}</p>
                      <p>Số lượng: {item?.quantity}</p>
                      <p>Giá tiền: {VND.format(item?.product[0]?.price_new === null ? item?.product[0]?.price_old : item?.product[0]?.price_new)}
                      </p>
                    </div>
                    <div className='x'>
                      <button id={item?.id} onClick={handleDeleteProductCart}>X</button>
                    </div>
                  </div>
                  )
                  : <h4>Bạn chưa có sản phẩm trong Giỏ hàng</h4>
                )
              }
            <div className='total-price'>
              <p>Tổng tiền: {user_id ? VND.format(totalPriceLogged) : (totalPriceNotLogin === undefined ? VND.format(0) : VND.format(totalPriceNotLogin))}</p>
            </div>

            <div className='btn'>
              <button onClick={goToCart}>Xem giỏ hàng</button>
              <button onClick={goToPayment}>Thanh toán</button>
            </div>
        </Drawer>
      </div>
    </div>
  )
}

export default Header