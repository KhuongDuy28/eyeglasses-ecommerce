import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import ClientRegisterApi from "../../../service/apis/ClientRegisterApi"

export const clientRegister = createAsyncThunk('clientRegister/register', async(data) => {
    const res = await ClientRegisterApi.clientRegister(data)
    return res
})

const registerSlice = createSlice({
    name: 'register',
    initialState: {
        loading: false
    }
})

export default registerSlice