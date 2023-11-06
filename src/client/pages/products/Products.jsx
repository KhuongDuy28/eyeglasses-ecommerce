import React from 'react'
import './products.scss'
import BannerProducts from '../../assets/img/banner-products.jpg'
import { useLocation } from 'react-router-dom'
import EyeGlassFrames from './eyeglass-frames/EyeGlassFrames'
import TheLens from './the-lens/TheLens'
import SunGlass from './sunglass/SunGlass'
import SaleGlasses from '../../assets/img/2009.-300x300.jpg'
import IMGContactLens from '../../assets/img/TA405-300x300.png'
import TrongKinh from '../../assets/img/TrongKinh.jpg'
import KinhRam from '../../assets/img/KinhRam.jpg'
import ImgNewProduct from '../../assets/img/Rectangle-416.jpg'
import OutstandingProducts from '../../components/slider-product/outstanding-products/OutstandingProducts'
import NewProducts from '../../components/slider-product/new-products/NewProducts'
import { ConvertFromLocationToText } from '../../utils/ConvertFromLocationToText.js'
import {BsCircleFill} from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getAllProductByCategory } from '../../../redux/slice/admin/productSlice'
import ChildrenGlasses from './children-glasses/ChildrenGlasses'

const Products = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const arrLocation = location.pathname.split('/')
  const lastLocation = arrLocation[arrLocation.length - 1]
  const arrPath = arrLocation.splice(1)
  
  useEffect(() => {
    if(lastLocation === 'eyeglass-frames') {
      dispatch(getAllProductByCategory(1))
    } else if(lastLocation === 'the-lens') {
      dispatch(getAllProductByCategory(2))
    } else if(lastLocation === 'sunglass') {
      dispatch(getAllProductByCategory(3))
    } else if(lastLocation === 'children-glasses') {
      dispatch(getAllProductByCategory(4))
    } 
  }, [lastLocation])
  const {listProductByCategory} = useSelector((state) => state?.product)

  // console.log(listSortProductClient);

  return (
    <div className='products'>
        <div className='banner-products'>
          <img src={BannerProducts} alt="" />
          <h1>SẢN PHẨM</h1>
          <div className='location-string'>
            <p>Trang chủ</p>

            {arrPath.map((item, index) => (
              <p key={index}>
                <BsCircleFill/>
                {ConvertFromLocationToText(item)}
              </p>
            ))}

          </div>
        </div>
        <div className='eyeglass-products' style={{ display: `${lastLocation === 'products' ? 'none' : 'block'}`}}>
          {
            lastLocation === 'eyeglass-frames' && <EyeGlassFrames dataProducts={listProductByCategory}/>
          }
          {
            lastLocation === 'the-lens' && <TheLens dataProducts={listProductByCategory}/>
          }
          {
            lastLocation === 'sunglass' && <SunGlass dataProducts={listProductByCategory}/>
          }
          {
            lastLocation === 'children-glasses' && <ChildrenGlasses dataProducts={listProductByCategory}/>
          }
        </div>

        <div className='outstanding-products'>
          <h2>SẢN PHẨM NỔI BẬT</h2>
          <OutstandingProducts/>
        </div>

        <div className='new-products'>
          <h2>SẢN PHẨM MỚI NHẤT</h2>
          <div className='elementor-container'>
            <img className='banner__new-product' src={ImgNewProduct} alt="" />
            <NewProducts/>
          </div>
        </div>
    </div>
  )
}

export default Products