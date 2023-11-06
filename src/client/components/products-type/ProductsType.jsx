import React from 'react'
import './productsType.scss'
import useConvertToVND from '../../hooks/useConvertToVND'
import { Link } from 'react-router-dom'

const ProductsType = ({dataProducts}) => {
    const {VND} = useConvertToVND()
    return (
        <div className='products-type' >
        {
            dataProducts.map((item) => (
                <Link key={item.id} to={`/products/details-product/${item.id}`}>
                    <div className='element' key={item.id}>
                        {
                            item.price_new !== null 
                            ? <p className='sale'>SALE</p>
                            : <></>
                        }
                        <img src={item.thumbnail} />
                        <div className='info'>
                            <p className='name'>{item.name}</p>
                            <div className='price-container'>
                                {
                                    item.price_new !== null 
                                    && <>
                                        <del className='price-old'>{VND.format(item.price_old)}</del>
                                        <p className='price'>{VND.format(item.price_new)}</p>
                                    </>
                                }
                                {
                                    item.price_new === null 
                                    && <p className='price'>{VND.format(item.price_old)}</p>
                                }
                            </div>
                        </div>
                    </div>
                </Link>
            ))
        }
        </div>
    )
}

export default ProductsType