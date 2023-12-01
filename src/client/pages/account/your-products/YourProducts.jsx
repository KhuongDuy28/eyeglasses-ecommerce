import React from 'react'
import './yourProducts.scss'
import { Table } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { deleteFavoritesProduct, deleteMultipleFavoritesProduct, getListFavoritesProduct } from '../../../../redux/slice/client/favoritesProductSlice';
import { Image } from 'antd';
import {MdDelete} from 'react-icons/md'
import { message } from 'antd';
import { Link } from 'react-router-dom';

const YourProducts = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getListFavoritesProduct())
  }, [])
  const {listFavoritesProduct} = useSelector((state) => state?.favoritesProduct)

  const columns = [
    {
      title: 'DANH SÁCH',
      dataIndex: 'product',
      render: (product, record) => (
        <Link className='info' to={`/products/details-product/${record?.product_id}`}>
          <p>Tên sản phẩm: {product?.name}</p>
          <Image src={product?.thumbnail}/>
        </Link>
      )
    }
  ];
  const data = listFavoritesProduct.map((item) => ({
    key: item?.id,
    product_id: item?.product_id,
    product: (item?.product)[0]
  }))
  
  const [dataRequest, setDataRequest] = useState([])
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      const id = selectedRows?.map((item) => item?.product_id)
      setDataRequest([...id])
    }
  };

  const handleDeleteMultiple = () => {
    if(dataRequest.length === 0) {
      return message.warning('Bạn chưa chọn sản phẩm để thực hiện xóa')
    };
    dispatch(deleteMultipleFavoritesProduct(dataRequest)).then((res) => {
        // console.log(res);
        if(res?.meta?.requestStatus === 'fulfilled') {
            message.success('Bạn đã xóa sản phẩm khỏi danh sách Yêu thích')
            dispatch(getListFavoritesProduct())
            setDataRequest([])
        } else {
            message.error('Thất bại')
        }
    })
}

  const buttonDetete = () => (
    <button className='btn-delete__multiple' onClick={handleDeleteMultiple}>Xóa</button>
  )

  return (
    <div className='your-products'>
      <div className='title'>
        <h2>SẢN PHẨM YÊU THÍCH</h2>
      </div>
      <hr />
      <Table
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
        locale={{emptyText: 'BẠN CHƯA CÓ SẢN PHẨM NÀO TRONG DANH SÁCH YÊU THÍCH'}}
        columns={columns}
        dataSource={data}
        pagination={{
          total: data.length,
          pageSize: 5
        }}
        footer={listFavoritesProduct.length > 0 ? buttonDetete : ''}
      />
    </div>
  )
}

export default YourProducts