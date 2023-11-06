import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import OrderProcessApi from "../../../service/apis/OrderProcessApi";

export const getOrderByStatus = createAsyncThunk('orderProcess/getOrderByStatus', async(status) => {
    const res = await OrderProcessApi.getOrderByStatus(status)
    return res
})

export const changeStatusOrder = createAsyncThunk('orderProcess/changeStatusOrder', async(data) => {
    const res = await OrderProcessApi.changeStatusOrder(data)
    return res
})

export const adminCancelOrder = createAsyncThunk('orderProcess/adminCancelOrder', async(order_id) => {
    const res = await OrderProcessApi.cancelOrder(order_id)
    return res
})

const orderProcessSlice = createSlice({
    name: 'orderProcess',
    initialState: {
        loading: false,
        listOrderByStatus: []
    }, 
    extraReducers: {
        [getOrderByStatus.pending]: (state) => {
            state.loading = true
        },
        [getOrderByStatus.rejected]: (state) => {
            state.loading = false
        },
        [getOrderByStatus.fulfilled]: (state, action) => {
            state.loading = false
            state.listOrderByStatus = action?.payload?.data?.data
        }
    }
})

export default orderProcessSlice