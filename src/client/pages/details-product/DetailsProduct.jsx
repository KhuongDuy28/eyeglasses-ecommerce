import React from 'react'
import './detailsProduct.scss'
import { Image } from 'antd'
import {LiaShippingFastSolid} from 'react-icons/lia'
import {BsFillHeartFill, BsBox2Heart, BsHouseCheck} from 'react-icons/bs'
import {AiOutlinePlus, AiOutlineMinus} from 'react-icons/ai'
import {GoIssueReopened} from 'react-icons/go'
import IMGlogo1 from '../../assets/img/Rectangle-147.jpg'
import ImgNewProduct from '../../assets/img/Rectangle-416.jpg'
import { useState } from 'react';
import useConvertToVND from '../../hooks/useConvertToVND';
import OutstandingProducts from '../../components/slider-product/outstanding-products/OutstandingProducts'
import NewProducts from '../../components/slider-product/new-products/NewProducts'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getProductDetailsClientByID } from '../../../redux/slice/admin/productSlice'
import { addProductInCartLogged, addProductInCartNotLogin, getCartByUser } from '../../../redux/slice/client/cartSlice'
import { message } from 'antd'
import { addListFavoritesProduct } from '../../../redux/slice/client/favoritesProductSlice'
import { Spin } from 'antd'

const DetailsProduct = () => {
  const {VND} = useConvertToVND()
  const dispatch = useDispatch()
  const {id} = useParams()
  useEffect(() => {
    dispatch(getProductDetailsClientByID(id))
  }, [id])
  const {productDetailsClientByID, loadingDetailsProduct} = useSelector((state) => state?.product)

  const [active, setActive] = useState(0)
  const [mainPicture, setMainPicture] = useState(undefined)
  const handleCheckImage = (index) => {
    setActive(index)
    if((productDetailsClientByID?.image_product).length > 0) {
      setMainPicture(productDetailsClientByID?.image_product[index]?.image)
    }
    else {
      setMainPicture(productDetailsClientByID?.thumbnail)
    }
  }

  // console.log(mainPicture);
  const [quantityProduct, setQuantityProduct] = useState(1)
  const changeQuantityProduct = (e) => {
    setQuantityProduct(e.target.value)
  }

  const handleReduce = () => {
    if(parseInt(quantityProduct) > 1) {
      setQuantityProduct(parseInt(quantityProduct) - 1)
    }
  }

  const handleIncrease = () => {
    setQuantityProduct(parseInt(quantityProduct) + 1)
  }

  const user_id = JSON.parse(localStorage.getItem('user_id'))

  const addProductOfCart = () => {
    if(!user_id) {
      const dataProductCart = {
        product_id: productDetailsClientByID?.id,
        name: productDetailsClientByID?.name,
        image: productDetailsClientByID?.thumbnail,
        price: productDetailsClientByID?.price_new === null ? productDetailsClientByID?.price_old : productDetailsClientByID?.price_new,
        quantity: parseInt(quantityProduct)
      }
  
      const existingArray = JSON.parse(sessionStorage.getItem('cart')) || [];
  
      const existingObjectIndex = existingArray.findIndex(item => item.product_id === dataProductCart.product_id);
  
      if (existingObjectIndex !== -1) {
        const dataRepeatID = existingArray.find((item) => item.product_id === dataProductCart.product_id)
        const newDataProductCart = {
          product_id: dataRepeatID?.product_id,
          name: dataRepeatID?.name,
          image: dataRepeatID?.image,
          price: dataRepeatID?.price_new === null ? productDetailsClientByID?.price_old : productDetailsClientByID?.price_new,
          quantity: parseInt(quantityProduct) + parseInt(dataRepeatID.quantity)
        }
        // Nếu ID đã tồn tại, cập nhật object
        existingArray[existingObjectIndex] = { ...newDataProductCart };
      } else {
        // Nếu không, thêm object mới
        existingArray.push({ ...dataProductCart });
      }
      sessionStorage.setItem('cart', JSON.stringify(existingArray));
      dispatch(addProductInCartNotLogin(existingArray))
    } else {
      const data = {
        user_id: user_id,
        product_id: productDetailsClientByID?.id,
        quantity: parseInt(quantityProduct)
      }
      dispatch(addProductInCartLogged(data)).then((res) => {
        // console.log(res);
        if(res.payload?.data?.status === 200) {
          dispatch(getCartByUser())
        } else if(res.payload?.data?.status === 400 || res.payload === undefined) {
          message.error('Hiện tại sản phẩm này không đủ số lượng bạn muốn mua')
        }
      })
    }
  }

  const [heart, setHeart] = useState(false)
  const addFavoritesList = () => {
    dispatch(addListFavoritesProduct({
      product_id: id
    })).then((res) => {
      // console.log(res);
      if(res?.payload?.data?.status === 200) {
        setHeart(true)
        message.success('Đã thêm sản phẩm vào danh sách Yêu thích')
      } else if(res?.payload?.data?.status === 400) {
        message.warning('Sản phẩm đã có trong danh sách Yêu thích')
      }
    })
  }


  return (
   <>
    {
      loadingDetailsProduct === false 
      ? <div className='details'>
          <div className='details-product'>
            <div className='details-picture'>
              <Image
                width={505}
                src={mainPicture ===  undefined ? productDetailsClientByID?.thumbnail : mainPicture}
              />
              <div className='extra-picture'>
                {
                  (productDetailsClientByID?.image_product)?.length > 0 
                  ? (productDetailsClientByID?.image_product)?.map((item, index) => (
                    <img className={active == index ? 'active' : ''} 
                    src={item.image} key={item?.id} onClick={() => handleCheckImage(index)} width={115}/>
                  ))
                  : <></>
                }
              </div>
            </div>

            <div className='info-detail'> 
              <div className='info-detail__product'>
                <h3>{productDetailsClientByID?.name}</h3>
                <div className='price'>
                  {
                    productDetailsClientByID?.price_new !== null
                    && 
                      <>
                        <h2>{VND.format(productDetailsClientByID?.price_new)}</h2>
                        <del>{VND.format(productDetailsClientByID?.price_old)}</del>
                      </>
                  }
                  {
                    productDetailsClientByID?.price_new === null
                    && 
                      <h2>{VND.format(productDetailsClientByID?.price_old)}</h2>
                  }
                </div>
                <p>Hình dáng: {productDetailsClientByID?.shape?.name}</p>
                <p>Chất liệu: {productDetailsClientByID?.material?.name}</p>
                <p>Màu sắc: <div className='color' style={{background : `${productDetailsClientByID?.color}`}}/></p>
                <p>
                Tình trạng: {
                  productDetailsClientByID?.quantity > 0 
                  ? `${productDetailsClientByID?.quantity} sản phẩm có sẵn`
                  : 'hết hàng'
                  }
                </p>
                <div className='transport'>
                  <LiaShippingFastSolid/>
                  <p>Miễn phí giao hàng từ 2.000.000đ ( vận chuyển 3 - 5 ngày )</p>
                </div>
                <div className='change-quantity'>
                  <AiOutlineMinus onClick={handleReduce}/>
                  <input type="number" value={quantityProduct} onChange={changeQuantityProduct}/>
                  <AiOutlinePlus onClick={handleIncrease}/>
                </div>
                <div className='shopping'>
                  <button style={{
                    background: `${heart ? '#e9e9e9' : '#000'}`
                  }} className='btn-favourite' onClick={addFavoritesList}>
                    <BsFillHeartFill style={{color: `${heart ? '#ff594f' : '#fff'}`}}/>
                  </button>
                  <button className={`btn-add__to-cart  ${productDetailsClientByID?.quantity === 0 ? 'disabled-button' : ''}`} onClick={addProductOfCart}>Thêm vào giỏ hàng</button>
                </div>
              </div>
              <div className='interests'>
                <div className='element-interest'>
                  <div className='tittle-interest'><GoIssueReopened/><span>Bảo hành trọn đời</span></div>
                  <p>Bảo hành ốc vít rơi ra, gọng lệch, gọng kênh vênh, lỏng chật, rơi ve đệm mũi trọn đời.</p>
                </div>
                <div className='element-interest'>
                  <div className='tittle-interest'><BsHouseCheck/><span>Giao hàng tận nơi</span></div>
                  <p>Giao hàng tận nơi, được kiểm tra hàng trước khi thanh toán.</p>
                </div>
                <div className='element-interest'>
                  <div className='tittle-interest'><BsBox2Heart/><span>Đổi trả dễ dàng</span></div>
                  <p>Bảo hành 1 đổi 1 khi có lỗi của nhà sản xuất, lỗi do đo mắt sai (trong 10 ngày đầu), hỗ trợ giảm 50% nếu đổi gọng mới.</p>
                </div>
              </div>
            </div>

          </div>

          <div className='company-info'>
            <div className='introduce'>
              <h4>Thông tin</h4>
              <div className='content'>
                <p>Chịu trách nhiệm sản phẩm: Công Ty TNHH Dịch vụ và Thương mại Anna Việt Nam</p>
                <p>Cảnh báo: Bảo quản trong hộp kính</p>
                <p>Hướng dẫn sử dụng:</p>
                <p>+ Tháo kính bằng 2 tay.</p>
                <p>+ Không bỏ kính vào cốp xe hoặc những nơi có nhiệt độ cao làm biến dạng kính.</p>
                <p>+ Không bỏ kính vào túi sách nếu không có hộp kính, vật dụng nhọn như chìa khóa sẽ làm xước kính.</p>
                <p>+ Không rửa kính lau kính bằng các chất có tính tẩy rửa mạnh làm bong tróc lớp váng phủ.</p>
                </div>
            </div>
            <img src={IMGlogo1} alt="" />
          </div>

          <OutstandingProducts/>

          <div className='new-products'>
            <h2>SẢN PHẨM MỚI NHẤT</h2>
            <div className='element-container'>
              <img className='banner__new-product' src={ImgNewProduct} alt="" />
              <NewProducts/>
            </div>
          </div>
        </div>
      : <Spin size="large" />
    }
   </>
  )
}

export default DetailsProduct