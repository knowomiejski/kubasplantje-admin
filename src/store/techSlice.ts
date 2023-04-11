import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Status } from "./enums/status";
import type RequestStatus from "./interfaces/requestStatus";
import { RootState } from "./store";
import axios, { AxiosError, AxiosResponse } from "axios";
import { ITech } from "../interfaces/ITech";
import { TechCategories } from "../enums/TechCategories";
import RequestStatusWithId from "./interfaces/requestStatusWithId";

interface errorDeleteResponse {
    data: any,
    id: number
}

const initialTechState = {
    techsData: {
        newTech: {
            techName: '',
            category: TechCategories.LANGUAGE,
            skillRating: 0,
            usedInProjects: [],
            new: true
        } as ITech,
        techs: [] as ITech[]
    },
    fetchAllRequestStatus: {
        status: Status.IDLE,
        error: null
    } as RequestStatus,
    addNewRequestStatus: {
        status: Status.IDLE,
        error: null
    } as RequestStatus,
    updateExistingRequestStatus: {
        status: Status.IDLE,
        error: null
    } as RequestStatus,
    deleteRequestStatus: {
        status: Status.IDLE,
        error: null
    } as RequestStatus
}

export const techSlice = createSlice({
    name: 'tech',
    initialState: initialTechState,
    reducers: {
        setTechData: (state, action) => {
            state.techsData.techs = action.payload
        },
        clearErrors: (state) => {
            state.fetchAllRequestStatus = {
                status: Status.IDLE,
                error: null
            }
            state.addNewRequestStatus = {
                status: Status.IDLE,
                error: null
            }
            state.updateExistingRequestStatus = {
                status: Status.IDLE,
                error: null
            }
            state.deleteRequestStatus = {
                status: Status.IDLE,
                error: null
            }
        }
    },
    extraReducers(builder) {
        builder
        .addCase(fetchAllTechs.pending, (state, action) => {

            state.fetchAllRequestStatus = {
                status: Status.LOADING,
                error: null
            }
        })
        .addCase(fetchAllTechs.fulfilled, (state, action) => {
            try {
                const convertedTechs = action.payload.map(tech => {
                    tech.new = false
                    return tech
                })
                state.techsData.techs = convertedTechs
                state.fetchAllRequestStatus = {
                    status: Status.SUCCEEDED,
                    error: null
                }
            } catch (e) {
                console.log('something wrong')
                state.fetchAllRequestStatus = {
                    status: Status.FAILED,
                    error: null
                }
            }
        })
        .addCase(fetchAllTechs.rejected, (state, action) => {

            const error = action.error.message ? action.error.message : null
            state.fetchAllRequestStatus = {
                status: Status.FAILED,
                error: error
            }
        })

        builder
        .addCase(addNewTech.pending, (state, action) => {

            state.addNewRequestStatus = {
                status: Status.LOADING,
                error: null
            }
        })
        .addCase(addNewTech.fulfilled, (state, action) => {
            state.addNewRequestStatus = {
                status: Status.SUCCEEDED,
                error: null
            }
        })
        .addCase(addNewTech.rejected, (state, action) => {

            const error = action.error.message ? action.error.message : null
            state.addNewRequestStatus = {
                status: Status.FAILED,
                error: error
            }
        })

        builder
        .addCase(updateExistingTech.pending, (state, action) => {

            state.updateExistingRequestStatus = {
                status: Status.LOADING,
                error: null
            }
        })
        .addCase(updateExistingTech.fulfilled, (state, action) => {
            state.updateExistingRequestStatus = {
                status: Status.SUCCEEDED,
                error: null
            }
        })
        .addCase(updateExistingTech.rejected, (state, action) => {

            const error = action.error.message ? action.error.message : null
            state.updateExistingRequestStatus = {
                status: Status.FAILED,
                error: error
            }
        })

        builder
        .addCase(deleteTech.pending, (state, action) => {

            state.deleteRequestStatus = {
                status: Status.LOADING,
                error: null
            }
        })
        .addCase(deleteTech.fulfilled, (state, action) => {
            state.deleteRequestStatus = {
                status: Status.SUCCEEDED,
                error: null
            }
        })
        .addCase(deleteTech.rejected, (state, action) => {
            const errorObj = action.payload as errorDeleteResponse
            state.deleteRequestStatus = {
                status: Status.FAILED,
                error: errorObj.data,
                id: errorObj.id
            } as RequestStatusWithId
        })
    }
})

export const fetchAllTechs = createAsyncThunk<ITech[]>('tech/fetchAllTechs', async (tech, {getState}) => {
    const state = getState() as RootState
    const response = await axios.get('https://admin.kubasplantje.nl:8443/api/v1/tech',
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('kp-login')}`
        }
    })
    return response.data
})

export const addNewTech = createAsyncThunk<string, ITech>('tech/addNewTech', async (tech: ITech, {getState}) => {
    const state = getState() as RootState
    const response = await axios.post('https://admin.kubasplantje.nl:8443/api/v1/tech',
    {
        ...tech,
        category: tech.category.toUpperCase()
    },
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('kp-login')}`
        }
    })
    return response.data
})

export const updateExistingTech = createAsyncThunk<string, ITech>('tech/updateTech', async (tech: ITech, {getState}) => {
    const state = getState() as RootState
    const response = await axios.patch('https://admin.kubasplantje.nl:8443/api/v1/tech',
    {
        ...tech,
        category: tech.category.toUpperCase()
    },
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('kp-login')}`
        }
    })
    return response.data
})

export const deleteTech = createAsyncThunk<string, number>('tech/deleteTech', async (techId: number, {getState, rejectWithValue}) => {
    const state = getState() as RootState
    try {
        const response = await axios.delete(`https://admin.kubasplantje.nl:8443/api/v1/tech/${techId}`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('kp-login')}`
            }
        })
        return response.data
    } catch (e: any | AxiosError) {
        return rejectWithValue({data: e.response.data, id: techId} as errorDeleteResponse)
    }
})

export const selectTechData = (state:RootState) => (state.techSlice.techsData)
export const selectFetchAllTechsRequestStatus = (state:RootState) => (state.techSlice.fetchAllRequestStatus)
export const selectAddNewTechRequestStatus = (state:RootState) => (state.techSlice.addNewRequestStatus)
export const selectUpdateExistingTechRequestStatus = (state:RootState) => (state.techSlice.updateExistingRequestStatus)
export const selectDeleteTechRequestStatus = (state:RootState) => (state.techSlice.deleteRequestStatus as RequestStatusWithId)

export const { setTechData, clearErrors } = techSlice.actions
export default techSlice.reducer