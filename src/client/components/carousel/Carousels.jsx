import React from 'react'
import { Carousel } from 'antd'
import Banner1 from '../../assets/img/banner1.png'
import Banner2 from '../../assets/img/banner2.jpg'
import Banner3 from '../../assets/img/banner3.png'
import './carousels.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getAllSlider } from '../../../redux/slice/admin/sliderSlice'

const Carousels = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllSlider())
    }, [])
    const dataListSlider = useSelector((state) => state?.slider?.listSlider)
    // console.log(dataListSlider);
    return (
        <>
            <div className='carousels'>
                <Carousel 
                autoplay 
                autoplaySpeed={5000}
                dots={false}>
                    {
                        dataListSlider.map((item) => 
                        <div key={item?.id} className='element-carousel'>
                            <p>{item?.name}</p>
                        </div>)
                    }
                </Carousel>
            </div>
            <div className='carousels'>
                <Carousel 
                autoplay 
                autoplaySpeed={5000}
                dots={false}>
                    {
                        dataListSlider.map((item) => 
                        <div key={item?.id} className='element-carousel'>
                            <img src={item?.image}/>
                        </div>)
                    }
                </Carousel>
            </div>
        </>
    )
}

export default Carousels