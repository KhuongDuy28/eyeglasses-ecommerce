import React from 'react'
import './theLens.scss'
import ProductsType from '../../../components/products-type/ProductsType'
import PaginationProducts from '../../../components/pagination-product/PaginationProducts'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sortProductClient } from '../../../../redux/slice/admin/productSlice'
import { useEffect } from 'react'
import SortProduct from '../../../components/sort-product/SortProduct'

const TheLens = ({dataProducts}) => {
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
    <div className='the-lens'>
      <div className='title-the__lens'>
        <h2>TRÒNG KÍNH</h2>
        <p>Tròng kính tại Anna là tròng chính hãng, mỏng, nhẹ, ít làm biến dạng hình ảnh. Đồng thời bạn cũng có thể nâng cấp tròng kính đa tròng với các lựa chọn như đổi màu, cận râm, chống tia sáng xanh, lắp tròng kính màu...</p>
        <div>
          <div className='all-the__lens'>
            <div className='sort-the__lens'>
              <SortProduct 
                onGetShape={onGetShape} 
                onGetMaterial={onGetMaterial} 
                onGetPrice={onGetPrice}
                setCurrentPage={setCurrentPage} 
              />
            </div>
            <div className='the__lens-by-pagination'>
            <ProductsType dataProducts={currentPageData}/>
            <PaginationProducts 
              currentPage={currentPage} // Trang hiện tại
              total={
                (shape !== undefined || material !== undefined || price !== undefined ? listSortProductClient : dataProducts).length
              } 
              // Tổng số trang
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

export default TheLens