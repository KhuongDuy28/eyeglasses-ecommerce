import React from 'react'
import './sortProduct.scss'
import { Radio } from 'antd';
import useConvertToVND from '../../hooks/useConvertToVND';
import { useDispatch, useSelector } from 'react-redux';
import { searchProductClient } from '../../../redux/slice/admin/productSlice';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { getAllCategotyClient } from '../../../redux/slice/admin/categorySlice';
import { getAllMaterialClient } from '../../../redux/slice/admin/materialSlice';
import { getAllShapeClient } from '../../../redux/slice/admin/shapeSlice';

const SortProduct = (props) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllMaterialClient())
        dispatch(getAllShapeClient())
    }, [])
    const {listMaterialClient} = useSelector((state) => state?.material)
    const {listShapeClient} = useSelector((state) => state?.shape)
    // const location = useLocation()
    // const arrLocation = location.pathname.split('/')
    // const lastLocation = arrLocation[arrLocation.length - 1]
    const [material, setMaterial] = useState('')
    const [shape, setShape] = useState('')
    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')

    const category_id = JSON.parse(sessionStorage.getItem('category_id'))
    
    const getShape = (e) => {
        props.setCurrentPage(1)
        if (shape === e.target.value) {
            setShape('');
            props.onGetShape(undefined)
            dispatch(searchProductClient({
                category: category_id,
                material_id: material,
                shape_id: '',
                min_price: minPrice,
                max_price: maxPrice,
                productName: props.search,
                orderBy: props.orderBy
            }))
        } else {
            setShape(e.target.value)
            props.onGetShape(e.target.value)
            dispatch(searchProductClient({
                category: category_id,
                material_id: material,
                shape_id: e.target.value,
                min_price: minPrice,
                max_price: maxPrice,
                productName: props.search,
                orderBy: props.orderBy
            }))
        }
    };

    const getMaterial = (e) => {
        props.setCurrentPage(1)
        if(material === e.target.value) {
            setMaterial('')
            props.onGetMaterial(undefined)
            dispatch(searchProductClient({
                category: category_id,
                material_id: '',
                shape_id: shape,
                min_price: minPrice,
                max_price: maxPrice,
                productName: props.search,
                orderBy: props.orderBy
            }))
        }
        else {
            setMaterial(e.target.value)
            props.onGetMaterial(e.target.value)
            dispatch(searchProductClient({
                category: category_id,
                material_id: e.target.value,
                shape_id: shape,
                min_price: minPrice,
                max_price: maxPrice,
                productName: props.search,
                orderBy: props.orderBy
            }))
        }
    }
    
    const getPrice = (e) => {
        props.setCurrentPage(1)
        // console.log(e.target.checked);
        if(minPrice === ((e.target.value).split('-'))[0] && maxPrice === ((e.target.value).split('-'))[1]) {
            setMinPrice('')
            setMaxPrice('')
            props.onGetMinPrice(undefined)
            props.onGetMaxPrice(undefined)
            dispatch(searchProductClient({
                category: category_id,
                material_id: material,
                shape_id: shape,
                min_price: '',
                max_price: '',
                productName: props.search,
                orderBy: props.orderBy
            })) 
        } else {
            setMinPrice(((e.target.value).split('-'))[0])
            setMaxPrice(((e.target.value).split('-'))[1])
            props.onGetMinPrice(((e.target.value).split('-'))[0])
            props.onGetMaxPrice(((e.target.value).split('-'))[1])
            dispatch(searchProductClient({
                category: category_id,
                material_id: material,
                shape_id: shape,
                min_price: ((e.target.value).split('-'))[0],
                max_price: ((e.target.value).split('-'))[1],
                productName: props.search,
                orderBy: props.orderBy
            }))  
        }
    }

    // console.log(dataListShape);
    return (
        <div className='sort'>
            <div className='sort-by-shape'>
                <p>Hình dáng</p>
                {listShapeClient.map((item) => 
                    <Radio value={item?.id} checked={shape == item?.id} onClick={getShape} >{item?.name}</Radio>
                )}
                {/* <Radio value='1' checked={shape === "1"} onClick={getShape} >Browline</Radio>
                <Radio value='2' checked={shape === "2"} onClick={getShape} >Hình vuông</Radio>
                <Radio value='3' checked={shape === "3"} onClick={getShape} >Mắt mèo</Radio>
                <Radio value='4' checked={shape === "4"} onClick={getShape} >Oval</Radio> */}
            </div>

            <div className='sort-by-material'>
                <p>Chất liệu</p>
                {listMaterialClient.map((item) => 
                    <Radio value={item?.id} checked={material == item?.id} onClick={getMaterial} >{item?.name}</Radio>
                )}
                {/* <Radio value='1' checked={material === "1"} onClick={getMaterial} >Acetate</Radio>
                <Radio value='2' checked={material === "2"} onClick={getMaterial} >Kim loại</Radio>
                <Radio value='3' checked={material === "3"} onClick={getMaterial} >Nhựa</Radio>
                <Radio value='4' checked={material === "4"} onClick={getMaterial} >Nhựa Dẻo</Radio> */}
            </div>

            <div className='sort-by-price'>
                <p>Khoảng giá</p>
                <Radio value='100000-500000' checked={minPrice === "100000" && maxPrice === "500000"} onClick={getPrice} >
                    100.000 đ - 500.000 đ
                </Radio>
                <Radio value='500000-1000000' checked={minPrice === "500000" && maxPrice === "1000000"} onClick={getPrice} >
                    500.000 đ - 1.000.000 đ
                </Radio>
                <Radio value='1000000-2000000' checked={minPrice === "1000000" && maxPrice === "2000000"} onClick={getPrice} >
                    1.000.000 đ - 2.000.000 đ
                </Radio>
                <Radio value='2000000-5000000' checked={minPrice === "2000000" && maxPrice === "5000000"} onClick={getPrice} >
                    2.000.000 đ - 5.000.000 đ
                </Radio>
            </div>
        </div>
    )
}

export default SortProduct