import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import FavoritesProductApi from "../../../service/apis/FavoritesProductApi";

export const getListFavoritesProduct = createAsyncThunk('favorites/getListFavoritesProduct', async() => {
    const res = await FavoritesProductApi.getListFavoritesProduct()
    return res
})

export const addListFavoritesProduct = createAsyncThunk('favorites/addListFavoritesProduct', async(data) => {
    const res = await FavoritesProductApi.addListFavoritesProduct(data)
    return res
})

export const deleteFavoritesProduct = createAsyncThunk('favorites/deleteFavoritesProduct', async(id) => {
    const res = await FavoritesProductApi.deleteFavoritesProduct(id)
    return res
})

export const deleteMultipleFavoritesProduct = createAsyncThunk('favorites/deleteMultipleFavoritesProduct', (data) => {
    const res = FavoritesProductApi.deleteMultipleFavoritesProduct(data)
    return res
})

const favoritesProductSlice = createSlice({
    name: 'favoritesProduct',
    initialState: {
        loading: false,
        listFavoritesProduct: []
    },
    extraReducers: {
        [getListFavoritesProduct.pending]: (state) => {
            state.loading = true
        },
        [getListFavoritesProduct.rejected]: (state) => {
            state.loading = false
        },
        [getListFavoritesProduct.fulfilled]: (state, action) => {
            state.loading = false
            state.listFavoritesProduct = action?.payload?.data?.data
        }
    }
})

export default favoritesProductSlice