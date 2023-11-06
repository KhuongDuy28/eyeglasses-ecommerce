import React from 'react'
import './childrenGlasses.scss'
import ProductsType from '../../../components/products-type/ProductsType'
import PaginationProducts from '../../../components/pagination-product/PaginationProducts'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { sortProductClient } from '../../../../redux/slice/admin/productSlice'
import SortProduct from '../../../components/sort-product/SortProduct'

const ChildrenGlasses = ({dataProducts}) => {
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
    <div className='children-glasses'>
    <div className='title-children__glasses'>
      <h2>GỌNG KÍNH TRẺ EM</h2>
      <p>Gọng kính trẻ em mang lại nhiều lợi ích quan trọng. Chúng giúp cải thiện tầm nhìn, hỗ trợ quá trình học tập và phát triển mắt của trẻ. Ngoài ra, gọng kính còn bảo vệ mắt khỏi tác động của ánh sáng màn hình và môi trường. Việc sử dụng gọng kính cũng giúp trẻ tự tin hơn trong các hoạt động hằng ngày.</p>
      <div>

        <div className='all-children__glasses'>
          <div className='sort-children__glasses'>
            <SortProduct 
              onGetShape={onGetShape} 
              onGetMaterial={onGetMaterial} 
              onGetPrice={onGetPrice}
              setCurrentPage={setCurrentPage}
            />
          </div>
          <div className='children__glasses-by-pagination'>
            <ProductsType dataProducts={currentPageData}/>
            <PaginationProducts 
              dataProducts={currentPageData} 
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

export default ChildrenGlasses