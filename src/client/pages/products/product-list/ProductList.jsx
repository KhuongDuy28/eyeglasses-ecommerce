import React from 'react'
import './productList.scss'
import PaginationProducts from '../../../components/pagination-product/PaginationProducts'
import ProductsType from '../../../components/products-type/ProductsType'
import { useState } from 'react'
import SortProduct from '../../../components/sort-product/SortProduct'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { sortProductClient } from '../../../../redux/slice/admin/productSlice'
import { getCategoryByIDClient } from '../../../../redux/slice/admin/categorySlice'

const ProductList = ({dataProducts}) => {
  const dispatch = useDispatch()
  const [shape, setShape] = useState()
  const [material, setMaterial] = useState()
  const [price, setPrice] = useState()
  useEffect(() => {
    dispatch(sortProductClient())
  }, [])
  const {listSortProductClient} = useSelector((state) => state?.product)
  console.log(listSortProductClient);

  const category_id = JSON.parse(sessionStorage.getItem('category_id'))
  useEffect(() => {
    dispatch(getCategoryByIDClient(category_id))
  }, [category_id]) 
  const {categoryByIDClient} = useSelector((state) => state?.category)
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
        <h2>{categoryByIDClient?.name}</h2>
        <p>{categoryByIDClient?.description}</p>
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

export default ProductList