import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AddressApi from "../../../service/apis/AddressApi";

export const getAllTinh = createAsyncThunk('category/getAllTinh', async() => {
    const listTinh = await AddressApi.getAllTinh()
    return listTinh
})

export const getAllQuanByTinh = createAsyncThunk('category/getAllQuanByTinh', async(tinh_id) => {
    const listQuanByTinh = await AddressApi.getAllQuanByTinh(tinh_id)
    return listQuanByTinh
})

export const getAllXaByQuan = createAsyncThunk('category/getAllXa', async(quan_id) => {
    const listXaByQuan = await AddressApi.getAllXaByQuan(quan_id)
    return listXaByQuan
})


const addressSlice = createSlice({
    name: 'address',
    initialState: {
        loading: false,
        listTinh: [],
        listQuanByTinh: [],
        listXaByQuan: [],
    },
    extraReducers: {
        [getAllTinh.pending]: (state) => {
            state.loading = true
        },
        [getAllTinh.rejected]: (state) => {
            state.loading = false
        },
        [getAllTinh.fulfilled]: (state, action) => {
            state.loading = false
            state.listTinh = action?.payload?.data?.data
        },


        [getAllQuanByTinh.pending]: (state) => {
            state.loading = true
        },
        [getAllQuanByTinh.rejected]: (state) => {
            state.loading = false
        },
        [getAllQuanByTinh.fulfilled]: (state, action) => {
            state.loading = false
            state.listQuanByTinh = action?.payload?.data?.data
        },


        [getAllXaByQuan.pending]: (state) => {
            state.loading = true
        },
        [getAllXaByQuan.rejected]: (state) => {
            state.loading = false
        },
        [getAllXaByQuan.fulfilled]: (state, action) => {
            state.loading = false
            state.listXaByQuan = action?.payload?.data?.data
        },

    }
})

export default addressSlice