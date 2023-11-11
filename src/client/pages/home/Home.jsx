import React from 'react'
import './home.scss'
import ChooseGlasses from '../../assets/img/choose-glasses.jpg'
import Carousels from '../../components/carousel/Carousels'
import Sample1 from '../../assets/img/sample1.jpg'
import Sample2 from '../../assets/img/sample2.jpg'
import Sample3 from '../../assets/img/sample3.jpg'
import Sample4 from '../../assets/img/sample4.jpg'
import Sample5 from '../../assets/img/sample5.jpg'
import ImgStoresInfo1 from '../../assets/img/Untitled-1.png'
import ImgStoresInfo2 from '../../assets/img/Untitled-2.jpg'
import SliderSampleGlasses from '../../components/slider-home/sample-glasses/SliderSampleGlasses'
import SliderSaleProducts from '../../components/slider-home/sale-products/SliderSaleProducts'
import {FaMapMarkerAlt} from 'react-icons/fa'
import { useState } from 'react'
import useConvertToVND from '../../hooks/useConvertToVND'
import SliderMyCustomer from '../../components/slider-home/my-customer/SliderMyCustomer'
import {GrFormAdd} from 'react-icons/gr'
import {HiMinusSm} from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import {getAllProductClient, getProductsSale } from '../../../redux/slice/admin/productSlice'
import { Link } from 'react-router-dom'

const Home = () => {
  const {VND} = useConvertToVND()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProductsSale())
    dispatch(getAllProductClient())
  }, [])
  const {listProductSale, listProductClient} = useSelector((state) => state?.product)
  const dataGlassesSale = listProductSale?.filter((item) => item?.category_id === 1)
  const dataGlassesNew = listProductClient?.filter((item) => item?.category_id === 1)
  const data10GlassesNew = dataGlassesNew?.slice(0, 10)

  const dataSampleGlasses = [
    {
      id: 1,
      imgUrl: Sample1
    },
    {
      id: 2,
      imgUrl: Sample2
    },
    {
      id: 3,
      imgUrl: Sample3
    },
    {
      id: 4,
      imgUrl: Sample4
    },
    {
      id: 5,
      imgUrl: Sample5
    },
  ]

  const [isOpenAnswer1, setIsOpenAnswer1] = useState(false)
  const [isOpenAnswer2, setIsOpenAnswer2] = useState(false)
  const [isOpenAnswer3, setIsOpenAnswer3] = useState(false)
  const [isOpenAnswer4, setIsOpenAnswer4] = useState(false)
  const [isOpenAnswer5, setIsOpenAnswer5] = useState(false)
  const [isOpenAnswer6, setIsOpenAnswer6] = useState(false)

  return (
    <div className='home'>
      <Carousels />
      <div className='sample-introduction'>
        <div className='choose-glasses'>
          <img src={ChooseGlasses} />
          <button className='btn-choose'>CHỌN KÍNH NGAY</button>
        </div>
        <div className='sample-glasses'>
          <SliderSampleGlasses 
            data={dataSampleGlasses}
          />
        </div>
      </div>

      <div className='flash-sale'>
          <div className='title-sale'>
            <h2>SĂN FLASH SALE</h2>
            <p>Hàng trăm sản phẩm bắt trend mới nhất</p>
          </div>
          <div className='products-sale'>
            <SliderSaleProducts 
              data={dataGlassesSale}
            />
          </div>
      </div>

      <div className='glasses-trend'>
        <p className='title-1'>HOT TREND</p>
        <div className='hot-trend'>
          <div className='title-2'>
            <h2>HÀNG MỚI LÊN KỆ</h2>
          </div>
        </div>
        <div className='trending-glasses'>
          <div className='trending-products'>
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
          </div>
        </div>
      </div>

      <div className='stores-system'>
        <div className='location'>
          <div className='title-location'>
            <p>ĐỊA ĐIỂM</p>
            <h2>HỆ THỐNG CỬA HÀNG</h2>
          </div>
          <div className='search-store'>
            <button className='btn-search__store' onClick={() => navigate('/store')}>
              <FaMapMarkerAlt/>
              Tìm kiếm cơ sở
            </button>
          </div>
        </div>
        <div className='img-stores__vatar'>
          <img className='img-stores__vatar-1' src={ImgStoresInfo1} alt="" />
          <img className='img-stores__vatar-2' src={ImgStoresInfo2} alt="" />
        </div>
      </div>

      <div className='my-customer'>
        <div className='title-customer'>
          <p>TÌNH THƯƠNG MẾN THƯƠNG</p>
          <h2>KHÁCH HÀNG THÂN YÊU</h2>
        </div>
        <SliderMyCustomer/>
      </div>

      <div className='q-a'>
        <div className='title-q__a'>
          <div className='title-1'>
            <hr />
            <span>HỎI ĐÁP</span>
          </div>
          <div className='title-2'>
            <h2>Q & A CÙNG ANNA</h2>
          </div>
        </div>
        <div className='question'>
          <div className='question-left'>
            <div className='question-1'>
              <div className='title-question'>
                <h4>Cận thị có tự giảm không ?</h4>
                <span onClick={() => {
                  if(isOpenAnswer1) {
                    setIsOpenAnswer1(false)
                  } else {
                    setIsOpenAnswer1(true)
                  }
                }}>
                  {!isOpenAnswer1 ? <GrFormAdd /> : <HiMinusSm/>}
                </span>
              </div>
              <div className='answer' style={{display: `${isOpenAnswer1 ? 'block' : 'none'}`}}>
                <p>Đáng tiếc câu trả lời là KHÔNG. Cận thị do 2 nguyên nhân</p>
                <p>– Mắt chiều trước-sau dài hơn bình thường (cận thị do trục)</p>
                <p>– Giác mạc và/hoặc thể thuỷ tinh cong nhiều quá (cận thị do tật khúc xạ)</p>
                <p>Mắt đã dài thì không thể ngắn lại. Giác mạc/thể thủy tinh quá cong cũng không thể tự nhiên trở lại như cũ. Vì thế nên, khi đã cận thì không thể tự giảm độ, chỉ có thể giữ cho hạn chế tăng độ mà thôi</p>
              </div>
            </div>
            <div className='question-2'>
              <div className='title-question'>
                <h4>Cho em xin chi phí đo mắt bên mình nhé ?</h4>
                <span onClick={() => {
                  if(isOpenAnswer2) {
                    setIsOpenAnswer2(false)
                  } else {
                    setIsOpenAnswer2(true)
                  }
                }}>
                  {!isOpenAnswer2 ? <GrFormAdd /> : <HiMinusSm/>}
                </span>
              </div>
              <div className='answer' style={{display: `${isOpenAnswer2 ? 'block' : 'none'}`}}>
                <p>Hệ thống kính mắt Anna luôn miễn phí kiểm tra mắt nhé các bạn thân yêu ơi.</p>
              </div>
            </div>
            <div className='question-3'>
              <div className='title-question'>
                <h4>Vừa loạn vừa cận có cắt tròng đổi màu được không ?</h4>
                <span onClick={() => {
                  if(isOpenAnswer3) {
                    setIsOpenAnswer3(false)
                  } else {
                    setIsOpenAnswer3(true)
                  }
                }}>
                  {!isOpenAnswer3 ? <GrFormAdd /> : <HiMinusSm/>}
                </span>
              </div>
              <div className='answer' style={{display: `${isOpenAnswer3 ? 'block' : 'none'}`}}>
                <p>Hiện tại hệ thống kính mắt Anna có rất nhiều tròng đổi mầu cho các bạn vừa cận vừa loạn nhé bạn ơi.</p>
              </div>
            </div>
          </div>
          <div className='question-right'>
            <div className='question-4'>
              <div className='title-question'>
                <h4>Mặt tròn bự thì đeo kính gì đẹp ạ ?</h4>
                <span onClick={() => {
                  if(isOpenAnswer4) {
                    setIsOpenAnswer4(false)
                  } else {
                    setIsOpenAnswer4(true)
                  }
                }}>
                  {!isOpenAnswer4 ? <GrFormAdd /> : <HiMinusSm/>}
                </span>
              </div>
              <div className='answer' style={{display: `${isOpenAnswer4 ? 'block' : 'none'}`}}>
                <p>Với khuôn mặt tròn, hãy lựa chọn các dáng kính là <strong>hình vuông hoặc hình chữ nhật</strong>. Với kiểu dáng này sẽ giúp cân bằng cấu trúc cho khuôn mặt, giúp mặt trông thon thả, thanh thoát và mềm mại hơn nhé bạn ơi.</p>
              </div>
            </div>
            <div className='question-5'>
              <div className='title-question'>
                <h4>Em thấy có quảng cáo thuốc làm giảm độ cận thị mà ?</h4>
                <span onClick={() => {
                  if(isOpenAnswer5) {
                    setIsOpenAnswer5(false)
                  } else {
                    setIsOpenAnswer5(true)
                  }
                }}>
                  {!isOpenAnswer5 ? <GrFormAdd /> : <HiMinusSm/>}
                </span>
              </div>
              <div className='answer' style={{display: `${isOpenAnswer5 ? 'block' : 'none'}`}}>
                <p>Có 2 thứ đừng nên tin trên đời này: đó là đàn ông và quảng cáo.</p>
              </div>
            </div>
            <div className='question-6'>
              <div className='title-question'>
                <h4>Màu của kính râm có ảnh hưởng tới chống tia cực tím không ?</h4>
                <span onClick={() => {
                  if(isOpenAnswer6) {
                    setIsOpenAnswer6(false)
                  } else {
                    setIsOpenAnswer6(true)
                  }
                }}>
                  {!isOpenAnswer6 ? <GrFormAdd /> : <HiMinusSm/>}
                </span>
              </div>
              <div className='answer' style={{display: `${isOpenAnswer6 ? 'block' : 'none'}`}}>
                <p>Mức độ tối màu của thấu kính không ảnh hưởng đến tác dụng bảo vệ mắt khỏi tia cực tím. Thay vào đó, khả năng này được xác định bằng công nghệ sản xuất thấu kính hoặc loại polyme nhựa của thấu kính nhé bạn ơi.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home