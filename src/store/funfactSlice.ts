import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "./enums/status";
import type RequestStatus from "./interfaces/requestStatus";
import { RootState } from "./store";
import axios from "axios";
import { IFunFact } from "../interfaces/IFunFact";

const initialFunFactsState = {
    funFactsData: {
        newFunfact: {
            funfact: '',
            new: true
        } as IFunFact,
        funfacts: [] as IFunFact[]
    },
    requestStatus: {
        status: Status.IDLE,
        error: null
    } as RequestStatus
}

export const funfactSlice = createSlice({
    name: 'funfact',
    initialState: initialFunFactsState,
    reducers: {
        setFunFactsData: (state, action) => {
            state.funFactsData.funfacts = action.payload
        }
    },
    extraReducers(builder) {
        builder
        .addCase(fetchAllFunFacts.pending, (state, action) => {

            state.requestStatus = {
                status: Status.LOADING,
                error: null
            }
        })
        .addCase(fetchAllFunFacts.fulfilled, (state, action) => {
            try {
                const convertedFunFacts = action.payload.map(funfact => {
                    funfact.new = false
                    return funfact
                })
                state.funFactsData.funfacts = convertedFunFacts
                state.requestStatus = {
                    status: Status.SUCCEEDED,
                    error: null
                }
            } catch (e) {
                console.log('something wrong')
                state.requestStatus = {
                    status: Status.FAILED,
                    error: null
                }
            }
        })
        .addCase(fetchAllFunFacts.rejected, (state, action) => {

            const error = action.error.message ? action.error.message : null
            state.requestStatus = {
                status: Status.FAILED,
                error: error
            }
        }),

        builder
        .addCase(addNewFunFact.pending, (state, action) => {

            state.requestStatus = {
                status: Status.LOADING,
                error: null
            }
        })
        .addCase(addNewFunFact.fulfilled, (state, action) => {

            state.requestStatus = {
                status: Status.SUCCEEDED,
                error: null
            }
        })
        .addCase(addNewFunFact.rejected, (state, action) => {

            state.requestStatus = {
                status: Status.FAILED,
                error: null
            }
        })


        builder
        .addCase(updateExistingFunFact.pending, (state, action) => {

            state.requestStatus = {
                status: Status.LOADING,
                error: null
            }
        })
        .addCase(updateExistingFunFact.fulfilled, (state, action) => {

            state.requestStatus = {
                status: Status.SUCCEEDED,
                error: null
            }
        })
        .addCase(updateExistingFunFact.rejected, (state, action) => {

            state.requestStatus = {
                status: Status.FAILED,
                error: null
            }
        })

        builder
        .addCase(deleteFunFact.pending, (state, action) => {

            state.requestStatus = {
                status: Status.LOADING,
                error: null
            }
        })
        .addCase(deleteFunFact.fulfilled, (state, action) => {

            state.requestStatus = {
                status: Status.SUCCEEDED,
                error: null
            }
        })
        .addCase(deleteFunFact.rejected, (state, action) => {

            state.requestStatus = {
                status: Status.FAILED,
                error: null
            }
        })

    }
})

export const fetchAllFunFacts = createAsyncThunk<IFunFact[]>('funfact/getAllFunFacts', async (funfact, {getState}) => {
    const state = getState() as RootState
    const response = await axios.get('https://admin.kubasplantje.nl:8443/api/v1/funfact',
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('kp-login')}`
        }
    })
    return response.data
})

export const addNewFunFact = createAsyncThunk<string, IFunFact>('funfact/postNewFunFact', async (funfact: IFunFact, {getState}) => {
    const state = getState() as RootState
    const response = await axios.post('https://admin.kubasplantje.nl:8443/api/v1/funfact', {
        ...funfact
    },
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('kp-login')}`
        }
    }
    )
    return response.data
})

export const updateExistingFunFact = createAsyncThunk<string, IFunFact>('funfact/updateExistingFunFact', async (funfact: IFunFact, {getState}) => {
    const state = getState() as RootState
    const response = await axios.patch('https://admin.kubasplantje.nl:8443/api/v1/funfact', {
        ...funfact
    },
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('kp-login')}`
        }
    }
    )
    return response.data
})

export const deleteFunFact = createAsyncThunk<string, number>('funfact/deleteFunFact', async (funfactId: number, {getState}) => {
    const state = getState() as RootState
    const response = await axios.delete(`https://admin.kubasplantje.nl:8443/api/v1/funfact/${funfactId}`,
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('kp-login')}`
        }
    }
    )
    return response.data
})

export const selectFunFactsData = (state:RootState) => (state.funfactSlice.funFactsData)
export const selectFunFactsRequestStatus = (state:RootState) => (state.funfactSlice.requestStatus)

export const { setFunFactsData } = funfactSlice.actions
export default funfactSlice.reducer