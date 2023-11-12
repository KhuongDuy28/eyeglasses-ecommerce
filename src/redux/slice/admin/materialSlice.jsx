import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import MaterialApi from "../../../service/apis/MaterialApi";

export const getAllMaterial = createAsyncThunk('material/getAllMaterial', async() => {
    const res = await MaterialApi.getAllMaterial()
    return res
})

export const addMaterial = createAsyncThunk('material/addMaterial', async(data) => {
    const res = await MaterialApi.addMaterial(data)
    return res
})

export const deleteMaterial = createAsyncThunk('material/deleteMaterial', async(id) => {
    const res = await MaterialApi.deleteMaterial(id)
    return res
})

export const updateMaterial = createAsyncThunk('material/updateMaterial', async(data) => {
    const res = await MaterialApi.updateMaterial(data)
    return res
})

export const searchMaterialByName = createAsyncThunk('material/searchMaterialByName', async(name) => {
    const res = await MaterialApi.searchMaterialByName(name)
    return res
})


//client
export const getAllMaterialClient = createAsyncThunk('material/getAllMaterialClient', async() => {
    const res = await MaterialApi.getAllMaterialClient()
    return res
})

const materialSlice = createSlice({
    name: 'material',
    initialState: {
        loading: false,
        listMaterial: [],
        listMaterialClient: [],
        materialByNameSearch: []
    },
    extraReducers: {
        [getAllMaterial.pending]: (state) => {
            state.loading = true
        },
        [getAllMaterial.rejected]: (state) => {
            state.loading = false
        },
        [getAllMaterial.fulfilled]: (state, action) => {
            // console.log(action?.payload?.data?.data);
            state.loading = false
            state.listMaterial = action?.payload?.data?.data
        },


        [getAllMaterialClient.pending]: (state) => {
            state.loading = true
        },
        [getAllMaterialClient.pending]: (state) => {
            state.loading = true
        },
        [getAllMaterialClient.fulfilled]: (state, action) => {
            state.loading = false
            state.listMaterialClient = action?.payload?.data?.data
        },


        [searchMaterialByName.pending]: (state) => {
            state.loading = true
        },
        [searchMaterialByName.rejected]: (state) => {
            state.loading = false
        },
        [searchMaterialByName.fulfilled]: (state, action) => {
            // console.log(action?.payload?.data?.data);
            state.loading = false
            state.materialByNameSearch = action?.payload?.data?.data
        },
    }
})

export default materialSlice