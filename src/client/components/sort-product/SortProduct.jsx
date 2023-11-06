import React from 'react'
import './sortProduct.scss'
import { Radio } from 'antd';
import useConvertToVND from '../../hooks/useConvertToVND';
import { useDispatch } from 'react-redux';
import { sortProductClient } from '../../../redux/slice/admin/productSlice';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

const SortProduct = (props) => {
    const {VND} = useConvertToVND()
    const dispatch = useDispatch()
    const location = useLocation()
    const arrLocation = location.pathname.split('/')
    const lastLocation = arrLocation[arrLocation.length - 1]
    const [material, setMaterial] = useState('')
    const [shape, setShape] = useState('')
    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')


    const getShape = (e) => {
        props.setCurrentPage(1)
        if (shape === e.target.value) {
            setShape('');
            props.onGetShape('')
            if(lastLocation === 'eyeglass-frames') {
                dispatch(sortProductClient({
                    category: 1,
                    material_id: material,
                    shape_id: '',
                    min_price: minPrice,
                    max_price: maxPrice
                }))
            } else if(lastLocation === 'the-lens') {
                dispatch(sortProductClient({
                    category: 2,
                    material_id: material,
                    shape_id: '',
                    min_price: minPrice,
                    max_price: maxPrice
                }))
            } else if(lastLocation === 'sunglass') {
                dispatch(sortProductClient({
                    category: 3,
                    material_id: material,
                    shape_id: '',
                    min_price: minPrice,
                    max_price: maxPrice
                }))
            } else if(lastLocation === 'children-glasses') {
                dispatch(sortProductClient({
                    category: 4,
                    material_id: material,
                    shape_id: '',
                    min_price: minPrice,
                    max_price: maxPrice
                }))
            } 
        } else {
            setShape(e.target.value)
            props.onGetShape(e.target.value)
            if(lastLocation === 'eyeglass-frames') {
                dispatch(sortProductClient({
                    category: 1,
                    material_id: material,
                    shape_id: e.target.value,
                    min_price: minPrice,
                    max_price: maxPrice
                }))
            } else if(lastLocation === 'the-lens') {
                dispatch(sortProductClient({
                    category: 2,
                    material_id: material,
                    shape_id: e.target.value,
                    min_price: minPrice,
                    max_price: maxPrice
                }))
            } else if(lastLocation === 'sunglass') {
                dispatch(sortProductClient({
                    category: 3,
                    material_id: material,
                    shape_id: e.target.value,
                    min_price: minPrice,
                    max_price: maxPrice
                }))
            } else if(lastLocation === 'children-glasses') {
                dispatch(sortProductClient({
                    category: 4,
                    material_id: material,
                    shape_id: e.target.value,
                    min_price: minPrice,
                    max_price: maxPrice
                }))
            } 
        }
    };

    const getMaterial = (e) => {
        props.setCurrentPage(1)
        if(material === e.target.value) {
            setMaterial('')
            props.onGetMaterial('')
            if(lastLocation === 'eyeglass-frames') {
                dispatch(sortProductClient({
                    category: 1,
                    material_id: '',
                    shape_id: shape,
                    min_price: minPrice,
                    max_price: maxPrice
                }))
            } else if(lastLocation === 'the-lens') {
                dispatch(sortProductClient({
                    category: 2,
                    material_id: '',
                    shape_id: shape,
                    min_price: minPrice,
                    max_price: maxPrice
                }))
            } else if(lastLocation === 'sunglass') {
                dispatch(sortProductClient({
                    category: 3,
                    material_id: '',
                    shape_id: shape,
                    min_price: minPrice,
                    max_price: maxPrice
                }))
            } else if(lastLocation === 'children-glasses') {
                dispatch(sortProductClient({
                    category: 4,
                    material_id: '',
                    shape_id: shape,
                    min_price: minPrice,
                    max_price: maxPrice
                }))
            } 
        }
        else {
            setMaterial(e.target.value)
            props.onGetMaterial(e.target.value)
            if(lastLocation === 'eyeglass-frames') {
                dispatch(sortProductClient({
                    category: 1,
                    material_id: e.target.value,
                    shape_id: shape,
                    min_price: minPrice,
                    max_price: maxPrice
                }))
            } else if(lastLocation === 'the-lens') {
                dispatch(sortProductClient({
                    category: 2,
                    material_id: e.target.value,
                    shape_id: shape,
                    min_price: minPrice,
                    max_price: maxPrice
                }))
            } else if(lastLocation === 'sunglass') {
                dispatch(sortProductClient({
                    category: 3,
                    material_id: e.target.value,
                    shape_id: shape,
                    min_price: minPrice,
                    max_price: maxPrice
                }))
            } else if(lastLocation === 'children-glasses') {
                dispatch(sortProductClient({
                    category: 4,
                    material_id: e.target.value,
                    shape_id: shape,
                    min_price: minPrice,
                    max_price: maxPrice
                }))
            } 
        }
    }
    
    const getPrice = (e) => {
        props.setCurrentPage(1)
        // console.log(e.target.checked);
        if(minPrice === ((e.target.value).split('-'))[0] && maxPrice === ((e.target.value).split('-'))[1]) {
            setMinPrice('')
            setMaxPrice('')
            props.onGetPrice('')
            if(lastLocation === 'eyeglass-frames') {
                dispatch(sortProductClient({
                    category: 1,
                    material_id: material,
                    shape_id: shape,
                    min_price: '',
                    max_price: ''
                }))
            } else if(lastLocation === 'the-lens') {
                dispatch(sortProductClient({
                    category: 2,
                    material_id: material,
                    shape_id: shape,
                    min_price: '',
                    max_price: ''
                }))
            } else if(lastLocation === 'sunglass') {
                dispatch(sortProductClient({
                    category: 3,
                    material_id: material,
                    shape_id: shape,
                    min_price: '',
                    max_price: ''
                }))
            } else if(lastLocation === 'children-glasses') {
                dispatch(sortProductClient({
                    category: 4,
                    material_id: material,
                    shape_id: shape,
                    min_price: '',
                    max_price: ''
                }))
            } 
        } else {
            setMinPrice(((e.target.value).split('-'))[0])
            setMaxPrice(((e.target.value).split('-'))[1])
            props.onGetPrice(e.target.value)
            if(lastLocation === 'eyeglass-frames') {
                dispatch(sortProductClient({
                    category: 1,
                    material_id: material,
                    shape_id: shape,
                    min_price: ((e.target.value).split('-'))[0],
                    max_price: ((e.target.value).split('-'))[1]
                }))
            } else if(lastLocation === 'the-lens') {
                dispatch(sortProductClient({
                    category: 2,
                    material_id: material,
                    shape_id: shape,
                    min_price: ((e.target.value).split('-'))[0],
                    max_price: ((e.target.value).split('-'))[1]
                }))
            } else if(lastLocation === 'sunglass') {
                dispatch(sortProductClient({
                    category: 3,
                    material_id: material,
                    shape_id: shape,
                    min_price: ((e.target.value).split('-'))[0],
                    max_price: ((e.target.value).split('-'))[1]
                }))
            } else if(lastLocation === 'children-glasses') {
                dispatch(sortProductClient({
                    category: 4,
                    material_id: material,
                    shape_id: shape,
                    min_price: ((e.target.value).split('-'))[0],
                    max_price: ((e.target.value).split('-'))[1]
                }))
            }   
        }
    }

    return (
        <div className='sort'>
            <div className={lastLocation === 'the-lens' ? 'the__lens' : 'sort-by-shape'}>
                <p>Hình dáng</p>
                <Radio value='1' checked={shape === "1"} onClick={getShape} >Browline</Radio>
                <Radio value='2' checked={shape === "2"} onClick={getShape} >Hình vuông</Radio>
                <Radio value='3' checked={shape === "3"} onClick={getShape} >Mắt mèo</Radio>
                <Radio value='4' checked={shape === "4"} onClick={getShape} >Oval</Radio>
            </div>

            <div className={lastLocation === 'the-lens' ? 'the__lens' : 'sort-by-material'}>
                <p>Chất liệu</p>
                <Radio value='1' checked={material === "1"} onClick={getMaterial} >Acetate</Radio>
                <Radio value='2' checked={material === "2"} onClick={getMaterial} >Kim loại</Radio>
                <Radio value='3' checked={material === "3"} onClick={getMaterial} >Nhựa</Radio>
                <Radio value='4' checked={material === "4"} onClick={getMaterial} >Nhựa Dẻo</Radio>
            </div>

            <div className='sort-by-price'>
                <p>Khoảng giá</p>
                <Radio value='100000-300000' checked={minPrice === "100000" && maxPrice === "300000"} onClick={getPrice} >
                    100.000 đ - 300.000 đ
                </Radio>
                <Radio value='300000-500000' checked={minPrice === "300000" && maxPrice === "500000"} onClick={getPrice} >
                    300.000 đ - 500.000 đ
                </Radio>
                <Radio value='500000-1000000' checked={minPrice === "500000" && maxPrice === "1000000"} onClick={getPrice} >
                    500.000 đ - 1.000.000 đ
                </Radio>
                <Radio value='1000000-2000000' checked={minPrice === "1000000" && maxPrice === "2000000"} onClick={getPrice} >
                    1.000.000 đ - 2.000.000 đ
                </Radio>
            </div>
        </div>
    )
}

export default SortProduct