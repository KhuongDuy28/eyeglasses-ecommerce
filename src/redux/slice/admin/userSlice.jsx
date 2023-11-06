import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserApi from "../../../service/apis/UserApi";

export const getAllUser = createAsyncThunk('user/getAllUser', async() => {
    const listUser = await UserApi.getAllUser()
    return listUser
})

export const deleteUser = createAsyncThunk('user/deleteUser', async(id) => {
    const res = await UserApi.deleteUser(id)
    return res
})

export const addUser = createAsyncThunk('user/addUser', async(data) => {
    const res = await UserApi.addUser(data)
    return res
})

export const getUserByID = createAsyncThunk('user/getUserByID', async(id) => {
    const userByID = await UserApi.getUserByID(id)
    return userByID
})

export const updateUser = createAsyncThunk('user/updateUser', async(data) => {
    const res = await UserApi.updateUser(data)
    return res
})

export const searchUserByKey = createAsyncThunk('/user/searchUserByKey', async(data) => {
    const userByKeySearch = await UserApi.searchUser(data)
    return userByKeySearch
})

export const adminChangePassword = createAsyncThunk('/user/adminChangePassword', async(data) => {
    const res = await UserApi.adminChangePassword(data)
    return res
})

export const changePassword = createAsyncThunk('/user/changePassword', async(data) => {
    const res = await UserApi.changePassword(data)
    return res
})

export const getProfileClient = createAsyncThunk('user/getProfileClient', async(id) => {
    const profileClient = await UserApi.getProfileClient(id)
    return profileClient
})


const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        listUser: [],
        userByID: {},
        profileClient: {},
        userByKeySearch: []
    },
    extraReducers: {
        // All user
        [getAllUser.pending]: (state) => {
            state.loading = true
        },
        [getAllUser.rejected]: (state) => {
            state.loading = false
        },
        [getAllUser.fulfilled]: (state, action) => {
            state.loading = false
            state.listUser = action?.payload?.data?.data
        },

        //user by ID
        [getUserByID.pending]: (state) => {
            state.loading = true
        },
        [getUserByID.rejected]: (state) => {
            state.loading = false
        },
        [getUserByID.fulfilled]: (state, action) => {
            state.loading = false
            state.userByID = action?.payload?.data?.data
        },


        [searchUserByKey.pending]: (state) => {
            state.loading = true
        },
        [searchUserByKey.rejected]: (state) => {
            state.loading = false
        },
        [searchUserByKey.fulfilled]: (state, action) => {
            state.loading = false
            state.userByKeySearch = action?.payload?.data?.data
        },


        [getProfileClient.pending]: (state) => {
            state.loading = true
        },
        [getProfileClient.rejected]: (state) => {
            state.loading = false
        },
        [getProfileClient.fulfilled]: (state, action) => {
            state.loading = false
            state.profileClient = action?.payload?.data?.data
        },

    }
})

export default userSlice