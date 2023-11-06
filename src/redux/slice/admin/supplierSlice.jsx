import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import SupplierApi from "../../../service/apis/SupplierApi";

export const getAllSupplier = createAsyncThunk('supplier/getAllSupplier', async() => {
    const listSupplier = await SupplierApi.getAllSupplier()
    return listSupplier
})

export const deleteSupplier = createAsyncThunk('supplier/deleteSupplier', async(id) => {
    const res = await SupplierApi.deleteSupplier(id)
    return res
})

export const addSupplier = createAsyncThunk('supplier/addSupplier', async(data) => {
    const res = await SupplierApi.addSupplier(data)
    return res
})

export const getSupplierByID = createAsyncThunk('supplier/getSupplierByID', async(id) => {
    const supplierByID = await SupplierApi.getSupplierByID(id)
    return supplierByID
})

export const updateSupplier = createAsyncThunk('supplier/updateSupplier', async(data) => {
    const res = await SupplierApi.updateSupplier(data)
    return res
})

export const searchSupplierByName = createAsyncThunk('supplier/searchSupplierByName', async(supplierName) => {
    const supplierByNameSearch = await SupplierApi.searchSupplier(supplierName)
    return supplierByNameSearch
}) 

const supplierSlice = createSlice({
    name: 'supplier',
    initialState: {
        loading: false,
        listSupplier: [],
        supplierByID: {},
        supplierByNameSearch: []
    },
    extraReducers: {
        // All Supplier
        [getAllSupplier.pending]: (state) => {
            state.loading = true
        },
        [getAllSupplier.rejected]: (state) => {
            state.loading = false
        },
        [getAllSupplier.fulfilled]: (state, action) => {
            state.loading = false
            state.listSupplier = action?.payload?.data?.data
        },

        //Supplier by ID
        [getSupplierByID.pending]: (state) => {
            state.loading = true
        },
        [getSupplierByID.rejected]: (state) => {
            state.loading = false
        },
        [getSupplierByID.fulfilled]: (state, action) => {
            state.loading = false
            state.supplierByID = action?.payload?.data?.data
        },
     
        
        [searchSupplierByName.pending]: (state) => {
            state.loading = true
        },
        [searchSupplierByName.rejected]: (state) => {
            state.loading = false
        },
        [searchSupplierByName.fulfilled]: (state, action) => {
            state.loading = false
            state.supplierByNameSearch = action?.payload?.data?.data
        }
    }
})

export default supplierSlice