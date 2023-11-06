import React from 'react'
import './sliderSaleProducts.scss'
import {MdSkipPrevious, MdSkipNext} from 'react-icons/md'
import Slider from "react-slick";
import useConvertToVND from '../../../hooks/useConvertToVND';
import { Link } from 'react-router-dom';

const SliderSaleProducts = ({data}) => {
  const {VND} = useConvertToVND() 
  return (
    <Slider 
    className='slider-sale-products'
    infinite={true}
    autoplay
    autoplaySpeed={5000}
    pauseOnHover={true}
    speed={500}
    slidesToShow={5}
    slidesToScroll={1}
    prevArrow={<MdSkipPrevious/>}
    nextArrow={<MdSkipNext/>}
    >
        {data.map((item) => (
        <Link to={`/products/details-product/${item?.id}`} className='element' key={item?.id}>
            <p className='sale'>SALE</p>
            <img src={item?.thumbnail} />
            <div className='info-product'>
              <p className='name'>{item?.name}</p>
              <div className='price'>
                {
                  item?.price_new === null 
                  ? <p className='price-sale'>{VND.format(item?.price_old)}</p>
                  : <>
                      <del className='price-old'>{VND.format(item?.price_old)}</del>
                      <p className='price-sale'>{VND.format(item?.price_new)}</p>
                    </>
                }
              </div>
            </div>
        </Link>
        ))}
    </Slider>
  )
}

export default SliderSaleProducts