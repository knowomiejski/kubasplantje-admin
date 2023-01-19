import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { Status } from "./enums/status"
import { RootState } from "./store"

interface LoginServerResponse {
    status: Status,
    error?: string
}

interface LoginState {
    loginData: LoginData,
    status: Status,
    error: string | null
}

interface LoginData {
    username: string,
    password: string
}

const initialState: LoginState = {
    loginData: {
        username: '',
        password: ''
    } as LoginData,
    status: Status.IDLE,
    error: null
}


export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.loginData.username = action.payload
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.loginData.password = action.payload
        },
    },
    extraReducers: (builder) => {
        // builder.addCase(sendLoginCredentialsAsync.pending, (state) => {
        //     state.status = Status.LOADING
        // })
        // .addCase(sendLoginCredentialsAsync.fulfilled, (state) => {
        //     state.status = Status.SUCCESS
        // })
        // .addCase(sendLoginCredentialsAsync.rejected, (state, action) => {
        //     state.status = Status.FAIL
        //     state.error = action.payload.error
        // })
    }
})

export const { setUsername, setPassword } = loginSlice.actions

export const selectUsername = (state: RootState) => state.login.loginData.username

export const selectPassword = (state: RootState) => state.login.loginData.password

const mockedServerLoginCredentialsResponse: LoginServerResponse = {
    status: Status.IDLE
}

const mockedsendLoginCredentialsCall = () => {
    return new Promise<{data: LoginServerResponse}>((resolve) => setTimeout(() => resolve({data: mockedServerLoginCredentialsResponse})))
}

// export const sendLoginCredentialsAsync = createAsyncThunk<LoginData, >('login/sendLoginCredentials', async () => {
//     const response = await mockedsendLoginCredentialsCall()
//     return (response.data) as LoginServerResponse
// })


export default loginSlice.reducer