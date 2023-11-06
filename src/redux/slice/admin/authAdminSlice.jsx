import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthApi from "../../../service/apis/AuthApi";

export const loginAdmin = createAsyncThunk('auth/login', async(data) => {
    const res = await AuthApi.login(data)
    const account = res.data
    localStorage.setItem('token', account.access_token)
    localStorage.setItem('role', account.info.role)
    return account
})


const authAdminSlice = createSlice({
    name: 'authAdmin',
    initialState: {
        loading: false,
        accessToken: undefined
    },
    extraReducers: {
        [loginAdmin.pending]: (state) => {
            state.loading = true
        },
        [loginAdmin.rejected]: (state) => {
            state.loading = false
        },
        [loginAdmin.fulfilled]: (state, action) => {
            state.loading = false,
            state.accessToken = action.payload.access_token
        }
    }
})

export default authAdminSlice
