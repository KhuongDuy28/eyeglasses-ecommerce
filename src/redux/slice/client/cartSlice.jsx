import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CartApi from "../../../service/apis/CartApi";

export const addProductInCartLogged = createAsyncThunk('cart/addProductInCartLogged', async(data) => {
    const res = await CartApi.addProductInCartLogged(data)
    return res
})

export const getCartByUser = createAsyncThunk('cart/getCartByUser', async() => {
    const res = await CartApi.getCartByUser()
    return res
})

export const deleteProductInCartLogged = createAsyncThunk('cart/deleteProductInCartLogged', async(id) => {
    const res = await CartApi.deleteProductInCartLogged(id)
    return res
})

export const deleteMultipleProductOfCart = createAsyncThunk('cart/deleteMultipleProductOfCart', (data) => {
    const res = CartApi.deleteMultipleProductOfCart(data)
    return res
})

export const updateQuantity = createAsyncThunk('cart/updateQuantity', async(data) => {
    // console.log(data);
    const res = await CartApi.updateQuantity(data)
    return res
})

export const addMultipleProductOfCart = createAsyncThunk('cart/addMultipleProductOfCart', (data) => {
    // console.log(data);
    const res = CartApi.addMultipleProductOfCart(data)
    return res
})

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        loading: false,
        listCartLogged: [],
        listCartNotLogin: JSON.parse(sessionStorage.getItem('cart')),
        data: []
    },
    reducers: {
        addProductInCartNotLogin: (state, action) => {
            return {
                ...state,
                listCartNotLogin: action.payload
            }
        },
    },
    extraReducers: {
        [getCartByUser.pending]: (state) => {
            state.loading = true
        },
        [getCartByUser.rejected]: (state) => {
            state.loading = false
        },
        [getCartByUser.fulfilled]: (state, action) => {
            state.loading = false,
            state.listCartLogged = action?.payload?.data?.data
        }
    }
})

export default cartSlice
export const {addProductInCartNotLogin} = cartSlice.actions