import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Status } from "./enums/status";
import type RequestStatus from "./interfaces/requestStatus";
import { RootState } from "./store";
import axios from "axios";
import { IProject } from "../interfaces/IProject";
import { ITech } from "../interfaces/ITech";

const initialProjectState = {
    projectsData: {
        newProject: {
            projectName: '',
            description: '',
            client: '',
            link: '',
            usedTechIds: [],
            new: true
        } as IProject,
        projects: [] as IProject[]
    },
    requestStatus: {
        status: Status.IDLE,
        error: null
    } as RequestStatus
}

export const projectSlice = createSlice({
    name: 'project',
    initialState: initialProjectState,
    reducers: {
        setProjectData: (state, action) => {
            state.projectsData.projects = action.payload
        }
    },
    extraReducers(builder) {
        builder
        .addCase(fetchAllProjects.pending, (state, action) => {

            state.requestStatus = {
                status: Status.LOADING,
                error: null
            }
        })
        .addCase(fetchAllProjects.fulfilled, (state, action) => {
            try {
                const convertedProjects = action.payload.map(project => {
                    project.usedTechIds = []
                    if (project.usedTechs === undefined) project.usedTechs = []
                    project.usedTechs.map((usedTech: ITech) => {
                        if (usedTech.id !== undefined) {
                            //@ts-ignore
                            project.usedTechIds.push(usedTech.id)
                        }
                    });
                    project.new = false
                    return project
                })
                state.projectsData.projects = convertedProjects
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
        .addCase(fetchAllProjects.rejected, (state, action) => {

            const error = action.error.message ? action.error.message : null
            state.requestStatus = {
                status: Status.FAILED,
                error: error
            }
        })

        builder
        .addCase(addNewProject.pending, (state, action) => {

            state.requestStatus = {
                status: Status.LOADING,
                error: null
            }
        })
        .addCase(addNewProject.fulfilled, (state, action) => {
            state.requestStatus = {
                status: Status.SUCCEEDED,
                error: null
            }
        })
        .addCase(addNewProject.rejected, (state, action) => {

            const error = action.error.message ? action.error.message : null
            state.requestStatus = {
                status: Status.FAILED,
                error: error
            }
        })

        builder
        .addCase(updateExistingProject.pending, (state, action) => {

            state.requestStatus = {
                status: Status.LOADING,
                error: null
            }
        })
        .addCase(updateExistingProject.fulfilled, (state, action) => {
            state.requestStatus = {
                status: Status.SUCCEEDED,
                error: null
            }
        })
        .addCase(updateExistingProject.rejected, (state, action) => {

            const error = action.error.message ? action.error.message : null
            state.requestStatus = {
                status: Status.FAILED,
                error: error
            }
        })

        builder
        .addCase(deleteProject.pending, (state, action) => {

            state.requestStatus = {
                status: Status.LOADING,
                error: null
            }
        })
        .addCase(deleteProject.fulfilled, (state, action) => {
            state.requestStatus = {
                status: Status.SUCCEEDED,
                error: null
            }
        })
        .addCase(deleteProject.rejected, (state, action) => {

            const error = action.error.message ? action.error.message : null
            state.requestStatus = {
                status: Status.FAILED,
                error: error
            }
        })
    }
})

export const fetchAllProjects = createAsyncThunk<IProject[]>('project/fetchAllProjects', async (project, {getState}) => {
    const state = getState() as RootState
    const response = await axios.get('https://admin.kubasplantje.nl:8443/api/v1/project',
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('kp-login')}`
        }
    })
    return response.data
})

export const addNewProject = createAsyncThunk<string, IProject>('project/addNewProject', async (project: IProject, {getState}) => {
    const state = getState() as RootState
    const response = await axios.post('https://admin.kubasplantje.nl:8443/api/v1/project',
    {
        ...project
    },
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('kp-login')}`
        }
    })
    return response.data
})

export const updateExistingProject = createAsyncThunk<string, IProject>('project/updateExistingProject', async (project: IProject, {getState}) => {
    const state = getState() as RootState
    const response = await axios.patch('https://admin.kubasplantje.nl:8443/api/v1/project',
    {
        ...project
    },
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('kp-login')}`
        }
    })
    return response.data
})

export const deleteProject = createAsyncThunk<string, number>('project/deleteProject', async (projectId: number, {getState}) => {
    const state = getState() as RootState
    const response = await axios.delete(`https://admin.kubasplantje.nl:8443/api/v1/project/${projectId}`,
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('kp-login')}`
        }
    })
    return response.data
})

export const selectProjectData = (state:RootState) => (state.projectSlice.projectsData)
export const selectProjectRequestStatus = (state:RootState) => (state.projectSlice.requestStatus)

export const { setProjectData } = projectSlice.actions
export default projectSlice.reducer