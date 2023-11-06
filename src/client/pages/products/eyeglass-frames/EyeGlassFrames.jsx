import React from 'react'
import './eyeGlassFrames.scss'
import PaginationProducts from '../../../components/pagination-product/PaginationProducts'
import ProductsType from '../../../components/products-type/ProductsType'
import { useState } from 'react'
import SortProduct from '../../../components/sort-product/SortProduct'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { sortProductClient } from '../../../../redux/slice/admin/productSlice'

const EyeGlassFrames = ({dataProducts}) => {
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
  const currentPageData = ((shape !== undefined || material !== undefined || price !== undefined) ? listSortProductClient 
  : dataProducts).slice(startIdx, endIdx);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 500);
  };

  const onGetShape = (shape) => {
    setShape(shape)
  }
  const onGetMaterial = (material) => {
    setMaterial(material)
  }
  const onGetPrice = (price) => {
    setPrice(price)
  }
  
  return (
    <div className='eyeglass-frames'>
      <div className='title-eyeglass__frames'>
        <h2>GỌNG KÍNH</h2>
        <p>Gọng kính được xem như bộ khung vững chắc, là giá đỡ vững chắc cho mắt kính. Không những thế, các loại gọng kính còn được thiết kế như là một phụ kiện thời trang hấp dẫn giúp chủ sở hữu nổi bần bật, thu hút mọi ánh nhìn.</p>
        <div>
          <div className='all-eyeglass__frames'>
            <div className='sort-eyeglass__frames'>
              <SortProduct 
                onGetShape={onGetShape} 
                onGetMaterial={onGetMaterial} 
                onGetPrice={onGetPrice}
                setCurrentPage={setCurrentPage} 
              />
            </div>
            <div className='eyeglass__frames-by-pagination'>
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

export default EyeGlassFrames