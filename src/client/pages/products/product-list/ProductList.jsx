import React from 'react'
import './productList.scss'
import PaginationProducts from '../../../components/pagination-product/PaginationProducts'
import ProductsType from '../../../components/products-type/ProductsType'
import { useState } from 'react'
import SortProduct from '../../../components/sort-product/SortProduct'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { searchProductClient, sortProductClient } from '../../../../redux/slice/admin/productSlice'
import { getCategoryByIDClient } from '../../../../redux/slice/admin/categorySlice'
import { BsBarChartSteps, BsSearch } from 'react-icons/bs'
import { Select } from 'antd'

const ProductList = ({dataProducts}) => {
  const dispatch = useDispatch()
  const [shape, setShape] = useState()
  const [material, setMaterial] = useState()
  const [min_price, setMinPrice] = useState()
  const [max_price, setMaxPrice] = useState()
  useEffect(() => {
    dispatch(sortProductClient())
  }, [])
  const {listSortProductClient, listProductByNameClient} = useSelector((state) => state?.product)
  // console.log(listProductByNameClient);

  const category_id = JSON.parse(sessionStorage.getItem('category_id'))
  useEffect(() => {
    dispatch(getCategoryByIDClient(category_id))
  }, [category_id]) 
  const {categoryByIDClient} = useSelector((state) => state?.category)
  
  const onGetShape = (shape) => {
    setShape(shape)
  }
  const onGetMaterial = (material) => {
    setMaterial(material)
  }
  const onGetMinPrice = (min_price) => {
    setMinPrice(min_price)
  }
  const onGetMaxPrice = (max_price) => {
    setMaxPrice(max_price)
  }
  const [search, setSearch] = useState('')
  const handleSearch = (e) => {
    setSearch(e.target.value)
    setCurrentPage(1)
    // if(shape !== undefined || material !== undefined || min_price !== undefined || max_price !== undefined) {
      dispatch(searchProductClient({
        category: category_id,
        productName: e.target.value,
        shape_id: (shape !== undefined ? shape : ''),
        material_id: (material !== undefined ? material : ''),
        min_price: (min_price !== undefined ? min_price : ''),
        max_price: (max_price !== undefined ? max_price : '')
      }))
    // } else {
    //   dispatch(searchProductClient({
    //     category: category_id,
    //     productName: e.target.value,
    //     shape_id: '',
    //     material_id: '',
    //     min_price: '',
    //     max_price: ''
    //   }))
    // }
  }
  const [orderBy, setOrderBy] = useState('')
  const changeOrderBy = (value) => {
    setCurrentPage(1)
    setOrderBy(value)
    dispatch(searchProductClient({
      category: category_id,
      productName: search,
      shape_id: (shape !== undefined ? shape : ''),
      material_id: (material !== undefined ? material : ''),
      min_price: (min_price !== undefined ? min_price : ''),
      max_price: (max_price !== undefined ? max_price : ''),
      orderBy: value
    }))
  }

  // const [pageSize, setPageSize] = useState(8); // Số lượng mục trên mỗi trang
  const pageSize = 8
  const [currentPage, setCurrentPage] = useState(1);
  const startIdx = (currentPage - 1) * pageSize;
  const endIdx = currentPage * pageSize;
  const currentPageData = (((shape || material|| min_price || max_price) !== undefined || (search || orderBy) !== '')
    ?  listProductByNameClient : dataProducts).slice(startIdx, endIdx);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 500);
  };

  // console.log(shape, material, max_price, min_price);
  
  return (
    <div className='eyeglass-frames'>
      <div className='title-eyeglass__frames'>
        <div className='title-container'>
          <h2>{categoryByIDClient?.name}</h2>
          <div className='desc-search'>
            <p>{categoryByIDClient?.description}</p>
            <div className='search-product'>
              <input placeholder='Nhập tên sản phẩm bạn muốn tìm kiếm' onChange={handleSearch}/>
              <BsSearch className='icon-search'/>
              <Select suffixIcon={<BsBarChartSteps />} 
                className='select-orderby' 
                placeholder='-- Sắp xếp theo giá --' 
                onChange={changeOrderBy}
              >
                <Select.Option value='asc'>Tăng dần</Select.Option>
                <Select.Option value='desc'>Giảm dần</Select.Option>
              </Select>
            </div>
          </div>
        </div>
        <div>
          <div className='all-eyeglass__frames'>
            <div className='sort-eyeglass__frames'>
              <SortProduct 
                onGetShape={onGetShape} 
                onGetMaterial={onGetMaterial} 
                onGetMinPrice={onGetMinPrice}
                onGetMaxPrice={onGetMaxPrice}
                setCurrentPage={setCurrentPage} 
                search={search}
                orderBy={orderBy}
              />
            </div>
            <div className='eyeglass__frames-by-pagination'>
              <ProductsType dataProducts={currentPageData}/>
              <PaginationProducts 
                currentPage={currentPage} // Trang hiện tại
                total={
                  (((shape || material|| min_price || max_price) !== undefined || (search || orderBy) !== '') 
                  ? listProductByNameClient : dataProducts).length
                } // Tổng số trang
                pageSize={pageSize} // Số lượng mục trên mỗi trang
                handlePageChange={handlePageChange} 
                // pageSizeOptions={['8', '16']} // Danh sách lựa chọn kích thước trang
                // onShowSizeChange={(current, size) => {
                //   setPageSize(size)
                // }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductList