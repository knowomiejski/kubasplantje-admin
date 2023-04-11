import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { TechCategories } from "../enums/TechCategories";
import { ITech } from "../interfaces/ITech";
import { Status } from "../store/enums/status";
import { AppDispatch } from "../store/store";
import { addNewTech, clearErrors, deleteTech, fetchAllTechs, selectDeleteTechRequestStatus, selectFetchAllTechsRequestStatus, updateExistingTech } from "../store/techSlice";
import globalUtility from "../utility/globalUtility";
import Button from "./Button";
import DropdownField from "./DropdownField";
import InputField from "./InputField";

interface Props {
    newTech: boolean,
    tech: ITech
}

const TechListItem = ({tech, newTech}: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const fetchAllTechsRequestStatus = useSelector(selectFetchAllTechsRequestStatus)
    const deleteTechRequestStatus = useSelector(selectDeleteTechRequestStatus)
    const initialTech = {
        id: tech.id,
        techName: tech.techName,
        category: tech.category,
        skillRating: tech.skillRating,
        usedInProjects: tech.usedInProjects,
        new: tech.new
    } as ITech
    const [updatedTech, setUpdatedTech] = useState<ITech>({...initialTech})
    const [newTechName, setNewTechName] = useState(tech.techName)
    const [newTechSkill, setNewTechSkill] = useState(tech.skillRating)
    const [category, setCategory] = useState(tech.category)

    const splitString = (originalString: string): string[] => {
        const splitOnSpace = originalString.split(' ')
        const finalSplitArray = []
        let oldTempString = ''
        let newTempString = ''
        for(let i = 0; i < splitOnSpace.length; i++) {
            const parsedSplitString = splitOnSpace[i] + ' '
            newTempString = oldTempString + parsedSplitString
            const lastLoop = (i + 1) === splitOnSpace.length
            if (newTempString.length >= 33 && !lastLoop) {
                finalSplitArray.push(oldTempString.toLowerCase())
                newTempString = ''
                oldTempString = parsedSplitString
                continue
            } else if (newTempString.length >= 33 && lastLoop) {
                finalSplitArray.push(oldTempString.toLowerCase())
                finalSplitArray.push(parsedSplitString.toLowerCase().trimEnd())
            } else if (newTempString.length < 33 && lastLoop) {
                finalSplitArray.push(newTempString.toLowerCase().trimEnd())
            } else {
                oldTempString = newTempString
            }
        }
        return finalSplitArray.length > 0 ? finalSplitArray : [originalString]
    }

    const updateTechName = (fieldNameString: string, input: string) => {
        // setNewTechName(input)
        updateField(fieldNameString, input)
    }

    const updateTechCategory = (fieldNameString: string, input: TechCategories) => {
        setCategory(input)
        updateField(fieldNameString, input.toString())
    }

    const updateField = (fieldNameString: string, input: string) => {
        const fieldName = fieldNameString as keyof ITech
        const tempUpdatedTech = {...updatedTech}
        if (fieldName !== undefined) {
            const currentValue = globalUtility.getProperty(tempUpdatedTech, fieldName)
            let convertedInput: string | number;
            if (typeof currentValue === "number") {
                convertedInput = +input
            } else {
                convertedInput = input
            }
            globalUtility.setProperty(tempUpdatedTech, fieldName, convertedInput)
            setUpdatedTech(tempUpdatedTech)
        }
    }

    const addTech = async () => {
        dispatch(clearErrors())
        await dispatch(addNewTech(updatedTech))
        await dispatch(fetchAllTechs())
        setUpdatedTech({...initialTech})
    }

    const editTech = async () => {
        dispatch(clearErrors())
        await dispatch(updateExistingTech(updatedTech))
        await dispatch(fetchAllTechs())
    }

    const removeTech = async () => {
        if (updatedTech.id) {
            dispatch(clearErrors())
            await dispatch(deleteTech(updatedTech.id))
            await dispatch(fetchAllTechs())
        }
    }

    useEffect(() => {
        console.log('test', initialTech)
    }, [initialTech.usedInProjects])

    return (
        <div className="my-1">
            {fetchAllTechsRequestStatus.status === Status.SUCCEEDED ?
            <div>
            <div className="text-center">+----------------------------------+</div>
            <div>
                {newTech === false ?
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
                                    initialValue={tech.id?.toString()}
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
                                <span className="text-white ml-1">new tech: {updatedTech.techName}</span>
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
                            initialValue={updatedTech.techName}
                            onChange={updateTechName}
                            name={'techName'}
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
                        <span className="text-secondary ml-1">category: </span>
                    </div>
                    <div className="">|</div>
                </div>
                <div className="flex justify-between">
                    <DropdownField
                        onSelectChoice={updateTechCategory}
                        options={Object.values(TechCategories)}
                        value={updatedTech.category?.toString().toLowerCase()}
                        name={"category"}
                    />
                </div>
                <div className="flex justify-between">
                    <div className="">|</div>
                    <div className="">|</div>
                </div>

                <div className="flex justify-between">
                    <div className="">|</div>
                    <div className="w-full">
                        <span className="text-secondary ml-1">skillRating: </span>
                    </div>
                    <div className="">|</div>
                </div>
                <div className="flex justify-between">
                    <div className="">|</div>
                    <div className="w-full">
                        <InputField
                            initialValue={updatedTech.skillRating}
                            onChange={(fName, input) => {updateField(fName, input)}}
                            name={'skillRating'}
                            margin={"my-0"}
                        />
                    </div>
                    <div className="">|</div>
                </div>
                <div className="flex justify-between">
                    <div className="">|</div>
                    <div className="">|</div>
                </div>
                {!newTech ?
                    <Fragment>
                        <div className="flex justify-between">
                            <div className="">|</div>
                            <div className="w-full">
                                <span className="text-white ml-1">usedInProjects: </span>
                            </div>
                            <div className="">|</div>
                        </div>
                        <div className="flex justify-between">
                            <div className="">|</div>
                            <div className="w-full">
                                <InputField
                                    initialValue={updatedTech.usedInProjects?.toString()}
                                    onChange={updateField}
                                    name={'usedInProjects'}
                                    margin={"my-0"}
                                    disabled
                                />
                            </div>
                            <div className="">|</div>
                        </div>
                    </Fragment>
                    :
                    <Fragment/>
                }
            </div>
            {deleteTechRequestStatus.error && deleteTechRequestStatus.id === updatedTech.id ?
                <Fragment>
                    <div className="flex justify-between">
                        <div className="">|</div>
                        <div className="">|</div>
                    </div>
                    {
                    splitString(deleteTechRequestStatus.error).map((splitError, i) => (
                        <div key={i} className="flex justify-between">
                            <div className="">|</div>
                            <div className="w-full">
                                <span className="text-red-500 ml-1">{splitError}</span>
                            </div>
                            <div className="">|</div>
                        </div>
                    ))
                    }
                </Fragment>
                :
                <Fragment/>
            }
            {newTech ?
                <div>
                    <Button
                        onClick={addTech}
                        color={"text-primary"}
                        hoverColor={"hover:text-primary"}
                    >
                        add new tech
                    </Button>
                </div>
                :
                <div className="">
                    <Button
                        onClick={editTech}
                        color={"text-primary"}
                        hoverColor={"hover:text-primary"}
                    >
                        save edited tech
                    </Button>
                    <Button
                        onClick={removeTech}
                        color={"text-red-400"}
                        hoverColor={"hover:text-red-400"}
                    >
                        delete tech
                    </Button>
                </div>
            }
            </div>
            :
            <div>loading...</div>
            }
        </div>
    );
};

export default TechListItem;
