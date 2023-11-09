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

export const getOrderByOrderCode = createAsyncThunk('orderProcess/getOrderByOrderCode', async(data) => {
    const res = await OrderProcessApi.getOrderByOrderCode(data)
    return res
})

export const getOrderByID = createAsyncThunk('orderProcess/getOrderByID', async(order_id) => {
    const res = await OrderProcessApi.getOrderByID(order_id)
    return res
})

const orderProcessSlice = createSlice({
    name: 'orderProcess',
    initialState: {
        loading: false,
        listOrderByStatus: [],
        listOrderByOrderCode: [],
        orderByID: {}
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
        },


        [getOrderByOrderCode.pending]: (state) => {
            state.loading = true
        },
        [getOrderByOrderCode.rejected]: (state) => {
            state.loading = false
        },
        [getOrderByOrderCode.fulfilled]: (state, action) => {
            state.loading = false
            state.listOrderByOrderCode = action?.payload?.data?.data
        },


        [getOrderByID.pending]: (state) => {
            state.loading = true
        },
        [getOrderByID.rejected]: (state) => {
            state.loading = false
        },
        [getOrderByID.fulfilled]: (state, action) => {
            state.loading = false
            state.orderByID = action?.payload?.data?.data
        }
    }
})

export default orderProcessSlice