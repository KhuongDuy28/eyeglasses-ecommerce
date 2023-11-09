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
import { getAllCategotyClient } from '../../../redux/slice/admin/categorySlice.jsx'
import ProductList from './product-list/ProductList.jsx'

const Products = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const arrLocation = location.pathname.split('/')
  const lastLocation = arrLocation[arrLocation.length - 1]
  const arrPath = arrLocation.splice(1)

  useEffect(() => {
    dispatch(getAllCategotyClient())
  }, [])
  // const {listCategoryClient} = useSelector((state) => state?.category)
  // const eyeglass = listCategoryClient?.find((item) => (item.name)?.toLowerCase()?.includes('gọng kính'))
  // const theLens = listCategoryClient?.find((item) => (item.name)?.toLowerCase()?.includes('tròng kính'))
  // const sunglass = listCategoryClient?.find((item) => (item.name)?.toLowerCase()?.includes('kính râm'))
  // const childrenGlasses = listCategoryClient?.find((item) => (item.name)?.toLowerCase()?.includes('kính trẻ em'))
  // useEffect(() => {
  //   if(lastLocation === 'eyeglass-frames') {
  //     // dispatch(getAllProductByCategory(1))
  //     dispatch(getAllProductByCategory(eyeglass?.id))
  //   } else if(lastLocation === 'the-lens') {
  //     // dispatch(getAllProductByCategory(2))
  //     dispatch(getAllProductByCategory(theLens?.id))
  //   } else if(lastLocation === 'sunglass') {
  //     // dispatch(getAllProductByCategory(3))

  //     dispatch(getAllProductByCategory(sunglass?.id))
  //   } else if(lastLocation === 'children-glasses') {
  //     // dispatch(getAllProductByCategory(4))
  //     dispatch(getAllProductByCategory(childrenGlasses?.id))
  //   } 
  // }, [lastLocation, eyeglass, theLens, sunglass, childrenGlasses])
  const category_id = JSON.parse(sessionStorage.getItem('category_id'))
  useEffect(() => {
    if(category_id) {
      dispatch(getAllProductByCategory(category_id))
    }
  }, [category_id])
  // console.log(category_id);
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
          {/* {
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
          } */}
          <ProductList dataProducts={listProductByCategory}/>
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