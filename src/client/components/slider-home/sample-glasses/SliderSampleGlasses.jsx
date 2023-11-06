import React from 'react'
import './sliderSampleGlasses.scss'
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai';

const SliderSampleGlasses = ({data}) => {

  return (
    <Slider 
    className='slider-sample-glasses'
    infinite={true}
    speed={500}
    slidesToShow={2}
    slidesToScroll={1}
    prevArrow={<AiOutlineLeft/>}
    nextArrow={<AiOutlineRight/>}
    >
      {data.map((item, index) => (
        <div className='sample' key={index}>
            <img src={item.imgUrl} />
        </div>
      ))}
    </Slider>
  )
}

export default SliderSampleGlasses