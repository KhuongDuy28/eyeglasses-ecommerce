import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthApi from "../../../service/apis/AuthApi";

export const loginClient = createAsyncThunk('auth/login', async(data) => {
    const res = await AuthApi.login(data)
    const account = res.data
    localStorage.setItem('token', account.access_token)
    localStorage.setItem('role', account.info.role)
    localStorage.setItem('user_id', account.info.id)
    return account
})


const authClientSlice = createSlice({
    name: 'authClient',
    initialState: {
        loading: false,
        accessToken: undefined
    },
    extraReducers: {
        [loginClient.pending]: (state) => {
            state.loading = true
        },
        [loginClient.rejected]: (state) => {
            state.loading = false
        },
        [loginClient.fulfilled]: (state, action) => {
            state.loading = false,
            state.accessToken = action.payload.access_token
        }
    }
})

export default authClientSlice
