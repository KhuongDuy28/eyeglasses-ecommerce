import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ShapeApi from "../../../service/apis/ShapeApi";

export const getAllShape = createAsyncThunk('shape/getAllShape', async() => {
    const res = await ShapeApi.getAllShape()
    return res
})

export const addShape = createAsyncThunk('shape/addShape', async(data) => {
    const res = await ShapeApi.addShape(data)
    return res
})

export const deleteShape = createAsyncThunk('shape/deleteShape', async(id) => {
    const res = await ShapeApi.deleteShape(id)
    return res
})

export const updateShape = createAsyncThunk('shape/updateShape', async(data) => {
    const res = await ShapeApi.updateShape(data)
    return res
})

export const searchShapeByName = createAsyncThunk('shape/searchShapeByName', async(name) => {
    const res = await ShapeApi.searchShapeByName(name)
    return res
})

//client
export const getAllShapeClient = createAsyncThunk('shape/getAllShapeClient', async() => {
    const res = await ShapeApi.getAllShapeClient()
    return res
})

const shapeSlice = createSlice({
    name: 'shape',
    initialState: {
        loading: false,
        listShape: [],
        listShapeClient: [],
        shapeByNameSearch: []
    },
    extraReducers: {
        [getAllShape.pending]: (state) => {
            state.loading = true
        },
        [getAllShape.rejected]: (state) => {
            state.loading = false
        },
        [getAllShape.fulfilled]: (state, action) => {
            // console.log(action?.payload?.data?.data);
            state.loading = false
            state.listShape = action?.payload?.data?.data
        },


        [getAllShapeClient.pending]: (state) => {
            state.loading = true
        },
        [getAllShapeClient.rejected]: (state) => {
            state.loading = false
        },
        [getAllShapeClient.fulfilled]: (state, action) => {
            state.loading = false
            state.listShapeClient = action?.payload?.data?.data
        },


        [searchShapeByName.pending]: (state) => {
            state.loading = true
        },
        [searchShapeByName.rejected]: (state) => {
            state.loading = false
        },
        [searchShapeByName.fulfilled]: (state, action) => {
            // console.log(action?.payload?.data?.data);
            state.loading = false
            state.shapeByNameSearch = action?.payload?.data?.data
        },

    }
})

export default shapeSlice
