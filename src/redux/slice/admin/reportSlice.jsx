import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ReportApi from "../../../service/apis/ReportApi";

export const getReport = createAsyncThunk('report/getReport', async(data) => {
    const res =  await ReportApi.getReport(data)
    return res
})

export const getTotalProduct = createAsyncThunk('report/getTotalProduct', async() => {
    const res =  await ReportApi.getTotalProduct()
    return res
})

export const getTotalAccount = createAsyncThunk('report/getTotalAccount', async() => {
    const res =  await ReportApi.getTotalAccount()
    return res
})

const reportSlice = createSlice({
    name: 'report',
    initialState: {
        loading: false,
        dataReport: {},
        dataTotalProduct: [],
        dataTotalAccount: [],
    },
    extraReducers: {
        [getReport.pending]: (state) => {
            state.loading = true
        },
        [getReport.rejected]: (state) => {
            state.loading = false
        },
        [getReport.fulfilled]: (state, action) => {
            state.loading = false
            state.dataReport = action?.payload?.data?.data
        },


        [getTotalProduct.pending]: (state) => {
            state.loading = true
        },
        [getTotalProduct.rejected]: (state) => {
            state.loading = false
        },
        [getTotalProduct.fulfilled]: (state, action) => {
            state.loading = false
            state.dataTotalProduct = action?.payload?.data?.total_product
        },


        [getTotalAccount.pending]: (state) => {
            state.loading = true
        },
        [getTotalAccount.rejected]: (state) => {
            state.loading = false
        },
        [getTotalAccount.fulfilled]: (state, action) => {
            state.loading = false
            state.dataTotalAccount = action?.payload?.data?.total_user
        }
    }
})

export default reportSlice