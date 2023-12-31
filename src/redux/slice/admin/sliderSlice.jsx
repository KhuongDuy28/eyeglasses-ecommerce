import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import SliderApi from "../../../service/apis/SliderApi";

export const getAllSlider = createAsyncThunk('slider/getAllSlider', async() => {
    const listSlider = await SliderApi.getAllSlider()
    return listSlider
})

export const deleteSlider = createAsyncThunk('slider/deleteSlider', async(id) => {
    const res = await SliderApi.deleteSlider(id)
    return res
})

export const addSlider = createAsyncThunk('slider/addSlider', async(data) => {
    const res = await SliderApi.addSlider(data)
    return res
})

export const changeStatusSlider = createAsyncThunk('/slider/changeStatusSlider', async(data) => {
    const res = await SliderApi.changeStatusSlider(data)
    return res
})

export const searchSliderByName = createAsyncThunk('/slider/searchSlider', async(name) => {
    const sliderByNameSearch = await SliderApi.searchSlider(name)
    return sliderByNameSearch
})

export const getSliderActive = createAsyncThunk('/slider/getSliderActive', async() => {
    const listSliderActive = await SliderApi.getSliderActive()
    return listSliderActive
})

const sliderSlice = createSlice({
    name: 'slider',
    initialState: {
        loading: false,
        listSlider: [],
        sliderByNameSearch: [],
        listSliderActive: []
    },
    extraReducers: {
        [getAllSlider.pending]: (state) => {
            state.loading = true
        },
        [getAllSlider.rejected]: (state) => {
            state.loading = false
        },
        [getAllSlider.fulfilled]: (state, action) => {
            state.loading = false
            state.listSlider = action?.payload?.data?.data
        },


        [searchSliderByName.pending]: (state) => {
            state.loading = true
        },
        [searchSliderByName.rejected]: (state) => {
            state.loading = false
        },
        [searchSliderByName.fulfilled]: (state, action) => {
            state.loading = false
            state.sliderByNameSearch = action?.payload?.data?.data
        },


        //client
        [getSliderActive.pending]: (state) => {
            state.loading = true
        },
        [getSliderActive.rejected]: (state) => {
            state.loading = false
        },
        [getSliderActive.fulfilled]: (state, action) => {
            state.loading = false
            state.listSliderActive = action?.payload?.data?.data
        },
    }
})

export default sliderSlice