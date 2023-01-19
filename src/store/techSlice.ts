import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Status } from "./enums/status";
import type RequestStatus from "./interfaces/requestStatus";
import { RootState } from "./store";
import axios from "axios";
import { ITech } from "../interfaces/ITech";
import { TechCategories } from "../enums/TechCategories";

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
    requestStatus: {
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
        }
    },
    extraReducers(builder) {
        builder
        .addCase(fetchAllTechs.pending, (state, action) => {
            console.log('PENDING', action)
            state.requestStatus = {
                status: Status.LOADING,
                error: null
            }
        })
        .addCase(fetchAllTechs.fulfilled, (state, action) => {
            console.log('FULFILLED ', action.payload)
            try {
                const convertedTechs = action.payload.map(tech => {
                    tech.new = false
                    return tech
                })
                state.techsData.techs = convertedTechs
                state.requestStatus = {
                    status: Status.SUCCEEDED,
                    error: null
                }
            } catch (e) {
                console.log(e)
                state.requestStatus = {
                    status: Status.FAILED,
                    error: null
                }
            }
        })
        .addCase(fetchAllTechs.rejected, (state, action) => {
            console.log('REJECTED: ', action.error)
            const error = action.error.message ? action.error.message : null
            state.requestStatus = {
                status: Status.FAILED,
                error: error
            }
        })

        builder
        .addCase(addNewTech.pending, (state, action) => {
            console.log('PENDING', action)
            state.requestStatus = {
                status: Status.LOADING,
                error: null
            }
        })
        .addCase(addNewTech.fulfilled, (state, action) => {
            console.log('FULFILLED ', action.payload)
            state.requestStatus = {
                status: Status.SUCCEEDED,
                error: null
            }
        })
        .addCase(addNewTech.rejected, (state, action) => {
            console.log('REJECTED: ', action.error)
            const error = action.error.message ? action.error.message : null
            state.requestStatus = {
                status: Status.FAILED,
                error: error
            }
        })

        builder
        .addCase(updateExistingTech.pending, (state, action) => {
            console.log('PENDING', action)
            state.requestStatus = {
                status: Status.LOADING,
                error: null
            }
        })
        .addCase(updateExistingTech.fulfilled, (state, action) => {
            console.log('FULFILLED ', action.payload)
            state.requestStatus = {
                status: Status.SUCCEEDED,
                error: null
            }
        })
        .addCase(updateExistingTech.rejected, (state, action) => {
            console.log('REJECTED: ', action.error)
            const error = action.error.message ? action.error.message : null
            state.requestStatus = {
                status: Status.FAILED,
                error: error
            }
        })

        builder
        .addCase(deleteTech.pending, (state, action) => {
            console.log('PENDING', action)
            state.requestStatus = {
                status: Status.LOADING,
                error: null
            }
        })
        .addCase(deleteTech.fulfilled, (state, action) => {
            console.log('FULFILLED ', action.payload)
            state.requestStatus = {
                status: Status.SUCCEEDED,
                error: null
            }
        })
        .addCase(deleteTech.rejected, (state, action) => {
            console.log('REJECTED: ', action.error)
            const error = action.error.message ? action.error.message : null
            state.requestStatus = {
                status: Status.FAILED,
                error: error
            }
        })
    }
})

export const fetchAllTechs = createAsyncThunk<ITech[]>('tech/fetchAllTechs', async (tech, {getState}) => {
    const state = getState() as RootState
    const response = await axios.get('http://localhost:8080/api/v1/tech',
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('kp-login')}`
        }
    })
    console.log(response.data)
    return response.data
})

export const addNewTech = createAsyncThunk<string, ITech>('tech/addNewTech', async (tech: ITech, {getState}) => {
    const state = getState() as RootState
    const response = await axios.post('http://localhost:8080/api/v1/tech',
    {
        ...tech,
        category: tech.category.toUpperCase()
    },
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('kp-login')}`
        }
    })
    console.log(response.data)
    return response.data
})

export const updateExistingTech = createAsyncThunk<string, ITech>('tech/updateTech', async (tech: ITech, {getState}) => {
    const state = getState() as RootState
    const response = await axios.patch('http://localhost:8080/api/v1/tech',
    {
        ...tech,
        category: tech.category.toUpperCase()
    },
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('kp-login')}`
        }
    })
    console.log(response.data)
    return response.data
})

export const deleteTech = createAsyncThunk<string, number>('tech/deleteTech', async (techId: number, {getState}) => {
    const state = getState() as RootState
    const response = await axios.delete(`http://localhost:8080/api/v1/tech/${techId}`,
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('kp-login')}`
        }
    })
    console.log(response.data)
    return response.data
})

export const selectTechData = (state:RootState) => (state.techSlice.techsData)
export const selectTechRequestStatus = (state:RootState) => (state.techSlice.requestStatus)

export const { setTechData } = techSlice.actions
export default techSlice.reducer