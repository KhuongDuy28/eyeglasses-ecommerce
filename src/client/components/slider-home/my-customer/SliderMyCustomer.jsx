import React from 'react'
import './sliderMyCustomer.scss'
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Customer1 from '../../../assets/img/Customer-1.jpg'
import Customer2 from '../../../assets/img/Customer-2.webp'
import Customer3 from '../../../assets/img/Customer-3.webp'
import Customer4 from '../../../assets/img/Customer-4.jpg'
import Customer5 from '../../../assets/img/Customer-5.jpg'
import Customer6 from '../../../assets/img/Customer-6.jpg'
import { useRef } from 'react';

const SliderMyCustomer = () => {
    const sliderRef = useRef(null);
    const handleSlideClick = (index) => {
        sliderRef.current.slickGoTo(index);
      }
    const customer = [
        {
            name: 'Khánh Huyền',
            image: Customer1
        },
        {
            name: 'Ngọc Matcha',
            image: Customer2
        },
        {
            name: 'Trần Vân',
            image: Customer3
        },
        {
            name: 'Gia Bảo & Gia Khiêm',
            image: Customer4
        },
        {
            name: 'Trâm Anh',
            image: Customer5
        },
        {
            name: 'Vanh',
            image: Customer6
        }
    ]

    
    return (
        <Slider
            dots={true}
            autoplay={true}
            infinite={true}
            autoplaySpeed={2500}
            speed={500}
            slidesToShow={3}
            arrows={false}
            centerMode={true}
            slidesPerRow={1}
            className='slider-my-customer'
            dotsClass='slick-dots'
            afterChange={(currentSlide) => {
                sliderRef.current.slickGoTo(currentSlide)
            }}
            ref={sliderRef}
        >
            {customer.map((item, index) => (
                <div className='customer' key={index} onClick={() => handleSlideClick(index)} >
                    <img src={item.image} alt="" />
                    <p>{item.name}</p>
                </div>  
            ))}         
        </Slider>
    )
}

export default SliderMyCustomer