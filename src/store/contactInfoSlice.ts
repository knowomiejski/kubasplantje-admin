import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Status } from "./enums/status";
import type RequestStatus from "./interfaces/requestStatus";
import { RootState } from "./store";
import axios from "axios";
import { IContactInfo } from "../interfaces/IContactInfo";

const initialContactInfoState = {
    contactInfoData: {
        contactInfos: [] as IContactInfo[]
    },
    requestStatus: {
        status: Status.IDLE,
        error: null
    } as RequestStatus
}

export const contactInfoSlice = createSlice({
    name: 'contactInfo',
    initialState: initialContactInfoState,
    reducers: {
        setContactInfoData: (state, action) => {
            state.contactInfoData.contactInfos = action.payload
        }
    },
    extraReducers(builder) {
        builder
        .addCase(fetchAllContactInfos.pending, (state, action) => {

            state.requestStatus = {
                status: Status.LOADING,
                error: null
            }
        })
        .addCase(fetchAllContactInfos.fulfilled, (state, action) => {
            try {
                const convertedContactInfos = action.payload.map(contactInfo => {
                    contactInfo.new = false
                    return contactInfo
                })
                state.contactInfoData.contactInfos = convertedContactInfos
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
        .addCase(fetchAllContactInfos.rejected, (state, action) => {

            const error = action.error.message ? action.error.message : null
            state.requestStatus = {
                status: Status.FAILED,
                error: error
            }
        }),


        builder
        .addCase(updateContactInfo.pending, (state, action) => {

            state.requestStatus = {
                status: Status.LOADING,
                error: null
            }
        })
        .addCase(updateContactInfo.fulfilled, (state, action) => {

            state.requestStatus = {
                status: Status.SUCCEEDED,
                error: null
            }
        })
        .addCase(updateContactInfo.rejected, (state, action) => {

            state.requestStatus = {
                status: Status.FAILED,
                error: null
            }
        })
    }
})

export const fetchAllContactInfos = createAsyncThunk<IContactInfo[]>('contactInfo/fetchAllContactInfos', async (contactInfo, {getState}) => {
    const state = getState() as RootState
    const response = await axios.get('http://localhost:8080/api/v1/contactinfo',
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('kp-login')}`
        }
    })
    return response.data
})

export const updateContactInfo = createAsyncThunk<string, IContactInfo>('contactInfo/updateContactInfo', async (contactInfo: IContactInfo, {getState}) => {
    const state = getState() as RootState
    const response = await axios.patch('http://localhost:8080/api/v1/contactinfo', {
        ...contactInfo
    },
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('kp-login')}`
        }
    }
    )
    return response.data
})


export const selectContactInfoData = (state:RootState) => (state.contactInfoSlice.contactInfoData)
export const selectContactInfoRequestStatus = (state:RootState) => (state.contactInfoSlice.requestStatus)

export const { setContactInfoData } = contactInfoSlice.actions
export default contactInfoSlice.reducer