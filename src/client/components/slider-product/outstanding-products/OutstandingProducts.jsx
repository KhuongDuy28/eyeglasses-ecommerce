import React from 'react'
import './outstandingProducts.scss'
import Slider from 'react-slick'
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import useConvertToVND from '../../../hooks/useConvertToVND';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getProductsSale } from '../../../../redux/slice/admin/productSlice';
import { Link } from 'react-router-dom';

const OutstandingProducts = () => {
    const {VND} = useConvertToVND() 
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(getProductsSale())
    }, [])
    const {listProductSale} = useSelector((state) => state?.product)

    return (
        <Slider 
        className='slider-outstanding__products'
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
        {listProductSale.map((item) => (
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

export default OutstandingProducts