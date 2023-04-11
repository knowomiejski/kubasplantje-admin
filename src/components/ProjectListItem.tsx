import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { IProject } from "../interfaces/IProject";
import { ITech } from "../interfaces/ITech";
import { addNewProject, deleteProject, fetchAllProjects, updateExistingProject } from "../store/projectSlice";
import { AppDispatch } from "../store/store";
import globalUtility from "../utility/globalUtility";
import Button from "./Button";
import DropdownField from "./DropdownField";
import InputField from "./InputField";
import MultiSelectField from "./MultiSelectField";

interface Props {
    newProject: boolean,
    project: IProject,
    allAvailibleTechs: ITech[]
}

const ProjectListItem = ({project,  newProject, allAvailibleTechs}: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const initialProject: IProject = {
        id: project.id,
        projectName: project.projectName,
        description: project.description,
        client: project.client,
        link: project.link,
        usedTechIds: project.usedTechIds ? project.usedTechIds : [],
        new: project.new
    }
    const [updatedProject, setUpdatedProject] = useState<IProject>({...initialProject})
    const [availibleTechs, setAvailibleTechs] = useState<ITech[]>([])
    const [selectedValues, setSelectedValues] = useState<ITech[]>([])

    useEffect(() => {
        const tempSelectedValues: ITech[] = []
        if (updatedProject.usedTechIds) {
            updatedProject.usedTechIds.map(id => {
                const tech = allAvailibleTechs.find(tech => (tech.id === id))
                if(tech) {
                    return tempSelectedValues.push(tech)
                }
            })
        }
        setSelectedValues(tempSelectedValues)
    }, [])

    useEffect(() => {
        let tempAvailibleTechs: ITech[] = []
        if (selectedValues) {
            tempAvailibleTechs = allAvailibleTechs.filter(tech => {
                return !selectedValues.includes(tech) && !tech.new
            })
        }
        setAvailibleTechs(tempAvailibleTechs)
    }, [selectedValues])

    const updateProjectName = (fieldNameString: string, input: string) => {
        updateField(fieldNameString, input)
    }

    const updateUserTechIds = (tempSelectedValues: ITech[]) => {
        const tempUpdatedProject = {...updatedProject}
        const tempUsedTechIds: number[] = []
        tempSelectedValues.map(tech => {
            if (tech.id !== undefined) {
                tempUsedTechIds.push(tech.id)
            }
        })
        tempUpdatedProject.usedTechIds = tempUsedTechIds
        setUpdatedProject({...tempUpdatedProject})
    }

    const addToSelected = (fieldNameString: string, input: string) => {
        const inputTech = allAvailibleTechs.find(tech => tech.techName == input)
        const tempSelectedValues = selectedValues
        if (inputTech) {
            tempSelectedValues.push(inputTech)
        }
        setSelectedValues([...tempSelectedValues])
        updateUserTechIds(tempSelectedValues)
    }

    const removeFromSelected = (fieldNameString: string, input: string) => {
        const inputTech = allAvailibleTechs.find(tech => tech.techName == input)
        const tempSelectedValues = selectedValues.filter(tech => {
            return tech !== inputTech
        })
        setSelectedValues([...tempSelectedValues])
        updateUserTechIds(tempSelectedValues)
    }

    const updateField = (fieldNameString: string, input: string) => {
        const fieldName = fieldNameString as keyof IProject
        const tempUpdatedProject = {...updatedProject}
        if (fieldName !== undefined) {
            const currentValue = globalUtility.getProperty(tempUpdatedProject, fieldName)
            let convertedInput: string | number;
            if (typeof currentValue === "number") {
                convertedInput = +input
            } else {
                convertedInput = input
            }
            globalUtility.setProperty(tempUpdatedProject, fieldName, convertedInput)
            setUpdatedProject(tempUpdatedProject)
        }
    }

    const addProject = async () => {
        await dispatch(addNewProject(updatedProject))
        await dispatch(fetchAllProjects())
        setUpdatedProject({...initialProject})
        setSelectedValues([])
    }

    const editProject = async () => {
        await dispatch(updateExistingProject(updatedProject))
        await dispatch(fetchAllProjects())
    }

    const removeProject = async () => {
        if (updatedProject.id) {
            await dispatch(deleteProject(updatedProject.id))
            await dispatch(fetchAllProjects())
        }
    }

    return (
        <div className="my-1">
            <div className="text-center">+----------------------------------+</div>
            {newProject === false ?
                <Fragment>
                    <div className="flex justify-between">
                        <div className="">|</div>
                        <div className="w-full">
                            <span className="text-white ml-1">id:</span>
                        </div>
                        <div className="">|</div>
                    </div>
                    <div className="flex justify-between">
                        <div className="">|</div>
                        <div className="w-full">
                            <InputField
                                initialValue={project.id?.toString()}
                                onChange={(fName, input) => updateField(fName, input)}
                                name={'id'}
                                margin={"my-0"}
                                disabled
                            />
                        </div>
                        <div className="">|</div>
                    </div>
                    <div className="flex justify-between">
                        <div className="">|</div>
                        <div className="">|</div>
                    </div>
                </Fragment>
                :
                <Fragment>
                    <div className="flex justify-between">
                        <div className="">|</div>
                        <div className="w-full">
                            <span className="text-white ml-1">new project: {updatedProject.projectName}</span>
                        </div>
                        <div className="">|</div>
                    </div>
                    <div className="text-center">+----------------------------------+</div>
                </Fragment>
            }

            <div className="flex justify-between">
                <div className="">|</div>
                <div className="w-full">
                    <span className="text-secondary ml-1">name: </span>
                </div>
                <div className="">|</div>
            </div>
            <div className="flex justify-between">
                <div className="">|</div>
                <div className="w-full">
                    <InputField
                        initialValue={updatedProject.projectName}
                        onChange={updateProjectName}
                        name={'projectName'}
                        margin={"my-0"}
                    />
                </div>
                <div className="">|</div>
            </div>

            <div className="flex justify-between">
                <div className="">|</div>
                <div className="">|</div>
            </div>

            <div className="flex justify-between">
                <div className="">|</div>
                <div className="w-full">
                    <span className="text-secondary ml-1">description: </span>
                </div>
                <div className="">|</div>
            </div>
            <div className="flex justify-between">
                <div className="">|</div>
                <div className="w-full">
                    <InputField
                        initialValue={updatedProject.description}
                        onChange={(fieldNameString, input) => updateField(fieldNameString, input)}
                        name={'description'}
                        margin={"my-0"}
                    />
                </div>
                <div className="">|</div>
            </div>

            <div className="flex justify-between">
                <div className="">|</div>
                <div className="">|</div>
            </div>

            <div className="flex justify-between">
                <div className="">|</div>
                <div className="w-full">
                    <span className="text-secondary ml-1">client: </span>
                </div>
                <div className="">|</div>
            </div>
            <div className="flex justify-between">
                <div className="">|</div>
                <div className="w-full">
                    <InputField
                        initialValue={updatedProject.client}
                        onChange={(fieldNameString, input) => updateField(fieldNameString, input)}
                        name={'client'}
                        margin={"my-0"}
                    />
                </div>
                <div className="">|</div>
            </div>

            <div className="flex justify-between">
                <div className="">|</div>
                <div className="">|</div>
            </div>
            <div className="flex justify-between">
                <div className="">|</div>
                <div className="w-full">
                    <span className="text-secondary ml-1">link (optional): </span>
                </div>
                <div className="">|</div>
            </div>
            <div className="flex justify-between">
                <div className="">|</div>
                <div className="w-full">
                    <InputField
                        initialValue={updatedProject.link}
                        onChange={(fieldNameString, input) => updateField(fieldNameString, input)}
                        name={'link'}
                        margin={"my-0"}
                    />
                </div>
                <div className="">|</div>
            </div>

            <div className="flex justify-between">
                <div className="">|</div>
                <div className="">|</div>
            </div>
            <div className="flex justify-between">
                <div className="">|</div>
                <div className="w-full">
                    <span className="text-secondary ml-1">usedTechIds: </span>
                </div>
                <div className="">|</div>
            </div>
            <div className="flex justify-between">
                <MultiSelectField
                    onSelectChoice={(fieldName, input, add) => add ? addToSelected(fieldName, input) : removeFromSelected(fieldName, input)}
                    name={'usedTechIds'}
                    selectedValues={selectedValues.map(tech => tech.techName)}
                    options={availibleTechs.map(tech => tech.techName)}
                    label={''}
                    disabled={false}
                    placeholder={''}
                />
            </div>
            <div className="flex justify-between">
                <div className="">|</div>
                <div className="">|</div>
            </div>
            {newProject ?
                <div>
                    <Button
                        onClick={addProject}
                        color={"text-primary"}
                        hoverColor={"hover:text-primary"}
                    >
                        add new project
                    </Button>
                </div>
                :
                <div className="">
                    <Button
                        onClick={editProject}
                        color={"text-primary"}
                        hoverColor={"hover:text-primary"}
                    >
                        save edited project
                    </Button>
                    <Button
                        onClick={removeProject}
                        color={"text-red-400"}
                        hoverColor={"hover:text-red-400"}
                    >
                        delete project
                    </Button>
                </div>
            }
        </div>
    )
}

export default ProjectListItem;
