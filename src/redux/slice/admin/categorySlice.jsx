import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CategoryApi from "../../../service/apis/CategoryApi";

export const getAllCategoty = createAsyncThunk('category/getAllCategoty', async() => {
    const listCategory = await CategoryApi.getAllCategoty()
    return listCategory
})

export const deleteCategory = createAsyncThunk('category/deleteCategory', async(id) => {
    const res = await CategoryApi.deleteCategory(id)
    return res
})

export const addCategory = createAsyncThunk('category/addCategory', async(data) => {
    const res = await CategoryApi.addCategory(data)
    return res
})

export const getCategoryByID = createAsyncThunk('category/getCategoryByID', async(id) => {
    const categoryByID = await CategoryApi.getCategoryByID(id)
    return categoryByID
})

export const updateCategory = createAsyncThunk('category/updateCategory', async(data) => {
    const res = await CategoryApi.updateCategory(data)
    return res
})

export const searchCategoryByName = createAsyncThunk('/category/searchCategory', async(categoryName) => {
    const categoryByNameSearch = await CategoryApi.searchCategory(categoryName)
    return categoryByNameSearch
})

export const getAllCategotyClient = createAsyncThunk('category/getAllCategotyClient', async() => {
    const listCategoryClient = await CategoryApi.getAllCategotyClient()
    return listCategoryClient
})

export const getCategoryByIDClient = createAsyncThunk('category/getCategoryByIDClient', async(id) => {
    const res = await CategoryApi.getCategoryByIDClient(id)
    return res
})

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        loading: false,
        listCategory: [],
        listCategoryClient: [],
        categoryByID: {},
        categoryByNameSearch: [],
        categoryByIDClient: {},
        loadingCategoryByIDClient: false
    },
    extraReducers: {
        // All Category
        [getAllCategoty.pending]: (state) => {
            state.loading = true
        },
        [getAllCategoty.rejected]: (state) => {
            state.loading = false
        },
        [getAllCategoty.fulfilled]: (state, action) => {
            state.loading = false
            state.listCategory = action?.payload?.data?.data
        },

        //Category by ID
        [getCategoryByID.pending]: (state) => {
            state.loading = true
        },
        [getCategoryByID.rejected]: (state) => {
            state.loading = false
        },
        [getCategoryByID.fulfilled]: (state, action) => {
            state.loading = false
            state.categoryByID = action?.payload?.data?.data
        },


        [searchCategoryByName.pending]: (state) => {
            state.loading = true
        },
        [searchCategoryByName.rejected]: (state) => {
            state.loading = false
        },
        [searchCategoryByName.fulfilled]: (state, action) => {
            state.loading = false
            state.categoryByNameSearch = action?.payload?.data?.data
        },


        [getAllCategotyClient.pending]: (state) => {
            state.loading = true
        },
        [getAllCategotyClient.rejected]: (state) => {
            state.loading = false
        },
        [getAllCategotyClient.fulfilled]: (state, action) => {
            state.loading = false
            state.listCategoryClient = action?.payload?.data?.data
        },


        [getCategoryByIDClient.pending]: (state) => {
            state.loadingCategoryByIDClient = true
        },
        [getCategoryByIDClient.rejected]: (state) => {
            state.loadingCategoryByIDClient = false
        },
        [getCategoryByIDClient.fulfilled]: (state, action) => {
            state.loadingCategoryByIDClient = false
            state.categoryByIDClient = action?.payload?.data?.data
        },
    }
})

export default categorySlice