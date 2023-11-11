import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProductApi from "../../../service/apis/ProductApi";

export const getAllProduct = createAsyncThunk('product/getAllProduct', async() => {
    const listProduct = await ProductApi.getAllProduct()
    return listProduct
})

export const addProduct = createAsyncThunk('product/addProduct', async(data) => {
    const res = await ProductApi.addProduct(data)
    return res
})

export const getProductByID = createAsyncThunk('product/getProductByID', async(id) => {
    const productByID = await ProductApi.getProductByID(id)
    return productByID
})

export const updateProduct = createAsyncThunk('product/updateProduct', async(data) => {
    const res = await ProductApi.updateProduct(data)
    return res
})

export const changeStatusProduct = createAsyncThunk('product/changeStatusProduct', async(data) => {
    const res = await ProductApi.changeStatusProduct(data)
    return res
})

export const searchProductByName = createAsyncThunk('product/searchProductByName', async(productName) => {
    const res = await ProductApi.searchProductByName(productName)
    return res
})

export const getAllProductByCategory = createAsyncThunk('product/getAllProductByCategory', async(id) => {
    const listProductByCategory = await ProductApi.getAllProductByCategory(id)
    return listProductByCategory
})

export const getProductDetailsClientByID = createAsyncThunk('product/getProductDetailsByIDClient', async(id) => {
    const res = await ProductApi.getProductDetailsClientByID(id)
    return res
})

export const getProductsSale = createAsyncThunk('product/getProductsSale', async() => {
    const res = await ProductApi.getProductsSale()
    return res
})

export const getAllProductClient = createAsyncThunk('product/getAllProductClient', async() => {
    const res = await ProductApi.getAllProductClient()
    return res
})

export const sortProductClient = createAsyncThunk('product/sortProductClient', async(data) => {
    const res = await ProductApi.sortProductClient(data)
    return res
})

export const searchProductClient = createAsyncThunk('product/searchProductClient', async(data) => {
    console.log(data);
    const res = await ProductApi.searchProductClient(data)
    return res
})

const productSlice = createSlice({
    name: 'product',
    initialState: {
        loading: false,
        //admin
        listProduct: [],
        listProductByCategory: [],
        listProductByName: [],
        productByID: {},
        //client
        productDetailsClientByID: {},
        listProductSale: [],
        listProductClient: [],
        listSortProductClient: [],
        listProductByNameClient: [],
    },
    extraReducers: {
        // All Product
        [getAllProduct.pending]: (state) => {
            state.loading = true
        },
        [getAllProduct.rejected]: (state) => {
            state.loading = false
        },
        [getAllProduct.fulfilled]: (state, action) => {
            state.loading = false
            state.listProduct = action?.payload?.data?.data
        },

        //Product by ID
        [getProductByID.pending]: (state) => {
            state.loading = true
        },
        [getProductByID.rejected]: (state) => {
            state.loading = false
        },
        [getProductByID.fulfilled]: (state, action) => {
            state.loading = false
            state.productByID = action?.payload?.data?.data
        },


        [getAllProductByCategory.pending]: (state) => {
            state.loading = true
        },
        [getAllProductByCategory.rejected]: (state) => {
            state.loading = false
        },
        [getAllProductByCategory.fulfilled]: (state, action) => {
            state.loading = false
            state.listProductByCategory = action?.payload?.data?.data
        },


        [searchProductByName.pending]: (state) => {
            state.loading = true
        },
        [searchProductByName.rejected]: (state) => {
            state.loading = false
        },
        [searchProductByName.fulfilled]: (state, action) => {
            state.loading = false
            state.listProductByName = action?.payload?.data?.data
        },
        

        [getProductDetailsClientByID.pending]: (state) => {
            state.loading = true
        },
        [getProductDetailsClientByID.rejected]: (state) => {
            state.loading = false
        },
        [getProductDetailsClientByID.fulfilled]: (state, action) => {
            state.loading = false
            state.productDetailsClientByID = action?.payload?.data?.data
        },


        [getProductsSale.pending]: (state) => {
            state.loading = true
        },
        [getProductsSale.rejected]: (state) => {
            state.loading = false
        },
        [getProductsSale.fulfilled]: (state, action) => {
            state.loading = false
            state.listProductSale = action?.payload?.data?.data
        },

        
        [getAllProductClient.pending]: (state) => {
            state.loading = true
        },
        [getAllProductClient.rejected]: (state) => {
            state.loading = false
        },
        [getAllProductClient.fulfilled]: (state, action) => {
            state.loading = false
            state.listProductClient = action?.payload?.data?.data
        },

         
        [sortProductClient.pending]: (state) => {
            state.loading = true
        },
        [sortProductClient.rejected]: (state) => {
            state.loading = false
        },
        [sortProductClient.fulfilled]: (state, action) => {
            // console.log(action?.payload?.data?.data);
            state.loading = false
            state.listSortProductClient = action?.payload?.data?.data
        },


        [searchProductClient.pending]: (state) => {
            state.loading = true
        },
        [searchProductClient.rejected]: (state) => {
            state.loading = false
        },
        [searchProductClient.fulfilled]: (state, action) => {
            state.loading = false
            state.listProductByNameClient = action?.payload?.data?.data
        },

    }
})

export default productSlice