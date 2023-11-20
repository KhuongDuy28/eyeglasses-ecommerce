import React from 'react'
import './cart.scss'
import { Table } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteMultipleProductOfCart, deleteProductInCartLogged, getCartByUser, updateQuantity} from '../../../redux/slice/client/cartSlice'
import useConvertToVND from '../../hooks/useConvertToVND'
import { useState } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Visa from '../../assets/img/visa.jpg'
import Amex from '../../assets/img/amex.jpg'
import Discover from '../../assets/img/discover.jpg'
import Mastercard from '../../assets/img/mastercard.jpg'
import { message } from 'antd'
import { Navigate } from 'react-router-dom'

const Cart = () => {
    const user_id = JSON.parse(localStorage.getItem('user_id'))
    return user_id ? <CartContainer/> : <Navigate to={'/login'}/>
}

const CartContainer = () => {
    const {VND} = useConvertToVND()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user_id = JSON.parse(localStorage.getItem('user_id'))
    useEffect(() => {
      dispatch(getCartByUser())
    }, [user_id])
  
    const {listCartLogged} = useSelector((state) => state?.cart)
    // console.log(listCartLogged);
    
    const handleReduce = (record) => {
        // console.log(record);
        if(record?.quantity > 1) {
            dispatch(updateQuantity({
                id: record?.key,
                dataUpdate: {
                    product_id: record?.product_id,
                    quantity: record?.quantity - 1
                }
            })).then((res) => {
                // console.log(res);
                if(res.payload.status === 200) {
                    dispatch(getCartByUser())
                }
            })
        } else if(record?.quantity === 1) {
            dispatch(deleteProductInCartLogged(record?.key)).then((res) => {
                if(res.payload.status === 200) {
                    message.warning(`Bạn đã xóa sản phẩm khỏi Giỏ hàng`)
                    dispatch(getCartByUser())
                }
            })
        }
    }

    const handleIncrease = (record) => {
        dispatch(updateQuantity({
            id: record?.key,
            dataUpdate: {
                product_id: record?.product_id,
                quantity: record?.quantity + 1
            }
        })).then((res) => {
            if(res.payload.status === 200) {
                dispatch(getCartByUser())
            }
        })
    }

    // console.log(listCartChanged);

    const columns = [
        {
          title: 'Thông tin sản phẩm',
          dataIndex: 'info',
          key: 'info',
          width: 400,
          render: (record) => (
            <div className='info'>
                <img src={record.image} alt="" />
                <p>{record.name}</p>
            </div>
          )
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            width: 100,
            render: (text) => <p>{VND.format(text)}</p>,
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            width: 125,
            render: (_, record) => (
                <div className='change-quantity'>
                    <AiOutlineMinus onClick={()=> handleReduce(record)}/>
                    {/* <input type="number" value={record.quantity} onChange={changeQuantityProduct}/> */}
                    <p>{record.quantity}</p>
                    <AiOutlinePlus onClick={()=> handleIncrease(record)}/>
              </div>
            )
        },
        {
          title: 'Thành tiền',
          dataIndex: 'money',
          key: 'money',
          width: 125,
          render: (text) => <p>{VND.format(text)}</p>,
        }
      ];
    
    const dataCartLogged = listCartLogged.map((item) => ({
        key: item?.id,
        info: {
            image: item?.product[0]?.thumbnail,
            name: item?.product[0]?.name,
        },
        price: item?.product[0]?.price_new === null ? item?.product[0]?.price_old : item?.product[0]?.price_new,
        quantity: item?.quantity,
        money: item?.quantity * (item?.product[0]?.price_new === null ? item?.product[0]?.price_old : item?.product[0]?.price_new) 
    }))

    const totalPrice = dataCartLogged?.reduce((total, item) => {
    return total = total + item.money
    }, 0)

    const [arrDeleteCart, setArrDeleteCart] = useState([])
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
        //   console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            setArrDeleteCart([...selectedRowKeys])
        },
    };

    const handleDelete = () => {
        if(arrDeleteCart.length === 0) {
            return message.warning('Bạn chưa chọn sản phẩm để thực hiện xóa')
        };
        dispatch(deleteMultipleProductOfCart(arrDeleteCart)).then((res) => {
            // console.log(res);
            if(res?.meta?.requestStatus === 'fulfilled') {
                message.success('Bạn đã xóa sản phẩm khỏi Giỏ hàng')
                dispatch(getCartByUser())
                setDataRequest([])
            } else {
                message.error('Thất bại')
            }
        })
    }

    const buttonDetete = () => (
        <button onClick={handleDelete}>Xóa sản phẩm</button>
    )

    return (
        <div className='cart-container'>
            <Table 
                rowSelection={{
                    type: 'checkbox',
                    ...rowSelection,
                }}
                columns={columns} 
                dataSource={dataCartLogged} 
                pagination={false} 
                locale={{emptyText: 'Bạn chưa có sản phẩm trong Giỏ hàng'}}
                footer={dataCartLogged.length > 0 ? buttonDetete : ''}
            />

            <div className='payment-info'>
                <h3>THÔNG TIN THANH TOÁN</h3>
                <div className='total'>
                    <p>Tổng</p>
                    <p>{VND.format(totalPrice)}</p>
                </div>
                <button onClick={() => navigate('/payment')}>Tiến hành thanh toán</button>
                <div className='payment-methods'>
                    <p>Chúng tôi chấp nhận thanh toán</p>
                    <div className='methods'>
                        <img src={Visa} alt="" />
                        <img src={Discover} alt="" />
                        <img src={Amex} alt="" />
                        <img src={Mastercard} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart