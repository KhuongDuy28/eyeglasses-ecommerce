import React from 'react'
import './sunGlass.scss'
import ProductsType from '../../../components/products-type/ProductsType'
import PaginationProducts from '../../../components/pagination-product/PaginationProducts'
import { useState } from 'react'
import SortProduct from '../../../components/sort-product/SortProduct'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { sortProductClient } from '../../../../redux/slice/admin/productSlice'

const SunGlass = ({dataProducts}) => {
  const dispatch = useDispatch()
  const [shape, setShape] = useState()
  const [material, setMaterial] = useState()
  const [price, setPrice] = useState()
  useEffect(() => {
    dispatch(sortProductClient())
  }, [])
  const {listSortProductClient} = useSelector((state) => state?.product)
  
  const pageSize = 8; // Số lượng mục trên mỗi trang
  const [currentPage, setCurrentPage] = useState(1);

  const startIdx = (currentPage - 1) * pageSize;
  const endIdx = currentPage * pageSize;
  const currentPageData = (shape !== undefined || material !== undefined || price !== undefined 
    ? listSortProductClient : dataProducts).slice(startIdx, endIdx);

    
  const onGetShape = (shape) => {
    setShape(shape)
  }
  const onGetMaterial = (material) => {
    setMaterial(material)
  }
  const onGetPrice = (price) => {
    setPrice(price)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 500);
  };

  return (
    <div className='sunglass'>
      <div className='title-sunglass'>
        <h2>KÍNH RÂM</h2>
        <p>Kính râm là loại kính có tác dụng bảo vệ mắt khỏi ảnh hưởng của tia cực tím, hay tia UV. Đồng thời, nó cũng làm hạn chế nguy cơ mắc các bệnh như bỏng mắt, đục thủy tinh thể hay thoái hóa điểm vàng. Thế nhưng, nhiều người hầu hết lại bỏ qua đôi mắt và đánh giá chưa đúng về tầm quan trọng của kính râm.</p>
        <div>
          <div className='all-sunglass'>
            <div className='sort-sunglass'>
              <SortProduct
                onGetShape={onGetShape} 
                onGetMaterial={onGetMaterial} 
                onGetPrice={onGetPrice}
                setCurrentPage={setCurrentPage}
               />
            </div>
            <div className='sunglass-by-pagination'>
            <ProductsType dataProducts={currentPageData}/>
            <PaginationProducts 
              currentPage={currentPage} // Trang hiện tại
              total={
                (shape !== undefined || material !== undefined || price !== undefined ? listSortProductClient : dataProducts).length
              } // Tổng số trang
              pageSize={pageSize} // Số lượng mục trên mỗi trang
              handlePageChange={handlePageChange} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SunGlass