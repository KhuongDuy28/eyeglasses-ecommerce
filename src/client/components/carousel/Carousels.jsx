import React from 'react'
import { Carousel } from 'antd'
import './carousels.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getSliderActive } from '../../../redux/slice/admin/sliderSlice'

const Carousels = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getSliderActive())
    }, [])
    const {listSliderActive} = useSelector((state) => state?.slider)
    // console.log(dataListSlider);
    return (
        <>
            <div className='carousels'>
                <Carousel 
                autoplay 
                autoplaySpeed={3000}
                dots={false}>
                    {
                        listSliderActive.map((item) => 
                        <div key={item?.id} className='element-carousel'>
                            <p>{item?.name}</p>
                        </div>)
                    }
                </Carousel>
            </div>
            <div className='carousels'>
                <Carousel 
                autoplay 
                autoplaySpeed={3000}
                dots={false}>
                    {
                        listSliderActive.map((item) => 
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