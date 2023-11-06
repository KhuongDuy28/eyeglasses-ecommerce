import React from 'react'
import Slider from 'react-slick'
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import useConvertToVND from '../../../hooks/useConvertToVND';
import './newProducts.scss'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllProductClient } from '../../../../redux/slice/admin/productSlice';

const NewProducts = () => {
    const {VND} = useConvertToVND()
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(getAllProductClient())
    }, [])
    const {listProductClient} = useSelector((state) => state?.product)
    const dataGlassesNew = listProductClient?.filter((item) => item?.category_id === 1)
    const data10GlassesNew = dataGlassesNew?.slice(0, 10)

    return (
        <Slider 
            className='slider-new__products'
            infinite={true}
            autoplay
            autoplaySpeed={5000}
            pauseOnHover={true}
            speed={500}
            slidesToShow={3}
            slidesToScroll={1}
            prevArrow={<MdSkipPrevious/>}
            nextArrow={<MdSkipNext/>}
            >
             {data10GlassesNew.map((item) => (
              <Link to={`/products/details-product/${item?.id}`} className='element' key={item?.id}>
                {
                  item?.price_new === null 
                  ? <></>
                  : <p className='sale'>SALE</p>
                }
                <img src={item?.thumbnail} />
                <div className='info'>
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

export default NewProducts