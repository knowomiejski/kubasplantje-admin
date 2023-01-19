import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "./enums/status";
import type RequestStatus from "./interfaces/requestStatus";
import { RootState } from "./store";
import axios from "axios";

const initialAuthenticationState = {
    authenticationForm: {
        username: '',
        password: ''
    },
    requestStatus: {
        status: Status.IDLE,
        error: null
    } as RequestStatus,
    tokenStatus: {
        status: Status.IDLE,
        error: null
    } as RequestStatus,
}

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState: initialAuthenticationState,
    reducers: {
        setUsername: (state, action) => {
            state.authenticationForm.username = action.payload
        },
        setPassword: (state, action) => {
            state.authenticationForm.password = action.payload
        }
    },
    extraReducers(builder) {
        builder
        .addCase(sendAuthentication.pending, (state, action) => {
            console.log('PENDING', action)
            state.requestStatus = {
                status: Status.LOADING,
                error: null
            }
        })
        .addCase(sendAuthentication.fulfilled, (state, action) => {
            console.log('FULFILLED', action.payload)
            state.requestStatus = {
                status: Status.SUCCEEDED,
                error: null
            }
            try {
                localStorage.setItem('kp-login', action.payload)
            } catch (e) {
                console.log(e)
            }
        })
        .addCase(sendAuthentication.rejected, (state, action) => {
            console.log('REJECTED: ', action.error)
            const error = action.error.message ? action.error.message : null
            state.requestStatus = {
                status: Status.FAILED,
                error: error
            }
        })

        builder
        .addCase(checkAuthentication.pending, (state, action) => {
            console.log('PENDING', action)
            state.tokenStatus.status = Status.LOADING
        })
        .addCase(checkAuthentication.fulfilled, (state, action) => {
            console.log('FULFILLED', action)
            try {
                state.tokenStatus.status = Status.SUCCEEDED
            } catch (e) {
                state.tokenStatus.status = Status.FAILED
                console.log(e)
            }
        })
        .addCase(checkAuthentication.rejected, (state, action) => {
            console.log('REJECTED', action)
            state.tokenStatus.status = Status.FAILED
        })
    }
})

export const checkAuthentication = createAsyncThunk<string>('authentication/checkAuthentication', async (loginData, {getState}) => {
    const state = getState() as RootState
    const response = await axios.get('http://localhost:8080/api/v1/auth/check', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('kp-login')}`
        }
    })
    console.log(response.data)
    return response.data
})

export const sendAuthentication = createAsyncThunk<string>('authentication/sendAuthentication', async (loginData, {getState}) => {
    const state = getState() as RootState
    const response = await axios.post('http://localhost:8080/api/v1/auth/token', {
        userName: state.authentication.authenticationForm.username,
        password: state.authentication.authenticationForm.password
    })
    return response.data
})

export const selectUsername = (state:RootState) => (state.authentication.authenticationForm.username)
export const selectPassword = (state:RootState) => (state.authentication.authenticationForm.password)
export const selectRequestStatus = (state:RootState) => (state.authentication.requestStatus)
export const selectTokenStatus = (state:RootState) => (state.authentication.tokenStatus)

export const { setUsername, setPassword } = authenticationSlice.actions
export default authenticationSlice.reducer