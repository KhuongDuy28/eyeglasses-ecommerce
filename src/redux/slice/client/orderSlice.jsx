import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import OrderApi from "../../../service/apis/OrderApi";

export const orderClient = createAsyncThunk('order/orderClient', async(data) => {
    const res = await OrderApi.order(data)
    return res
})

export const orderHistory = createAsyncThunk('order/orderHistory', async() => {
    const listOrder = await OrderApi.orderHistory()
    return listOrder
})

export const cancelOrder = createAsyncThunk('order/cancelOrder', async(order_id) => {
    const res = await OrderApi.cancelOrder(order_id)
    return res
})

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        loading: false,
        listOrder: []
    }, 
    extraReducers: {
        [orderHistory.pending]: (state) => {
            state.loading = true
        },
        [orderHistory.rejected]: (state) => {
            state.loading = false
        },
        [orderHistory.fulfilled]: (state, action) => {
            state.loading = false
            state.listOrder = action?.payload?.data?.data
        }
    }
})

export default orderSlice