import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { IFunFact } from "../interfaces/IFunFact";
import { addNewFunFact, selectFunFactsRequestStatus, fetchAllFunFacts, updateExistingFunFact, deleteFunFact } from "../store/funfactSlice";
import { AppDispatch } from "../store/store";
import globalUtility from "../utility/globalUtility";
import Button from "./Button";
import InputField from "./InputField";

interface Props {
    newFact: boolean,
    fact: IFunFact
}

const FunFactListItem = ({fact, newFact}: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    let funFactsRequestStatus = useSelector(selectFunFactsRequestStatus)

    const initialFunFact = {
        id: fact.id,
        funfact: fact.funfact,
        new: fact.new
    } as IFunFact
    const [updatedFunFact, setUpdatedFunFact] = useState<IFunFact>({...initialFunFact})

    const updateFunFactName = (fieldNameString: string, input: string) => {
        updateField(fieldNameString, input)
    }

    const updateField = (fieldNameString: string, input: string) => {
        const fieldName = fieldNameString as keyof IFunFact
        const tempUpdatedFunFact = {...updatedFunFact}
        if (fieldName !== undefined) {
            const currentValue = globalUtility.getProperty(tempUpdatedFunFact, fieldName)
            let convertedInput: string | number;
            if (typeof currentValue === "number") {
                convertedInput = +input
            } else {
                convertedInput = input
            }
            globalUtility.setProperty(tempUpdatedFunFact, fieldName, convertedInput)
            setUpdatedFunFact(tempUpdatedFunFact)
        }
    }

    const addFunFact = async () => {
        await dispatch(addNewFunFact(updatedFunFact))
        await dispatch(fetchAllFunFacts())
        setUpdatedFunFact({...initialFunFact})
    }

    const editFunFact = async () => {
        await dispatch(updateExistingFunFact(updatedFunFact))
        await dispatch(fetchAllFunFacts())
    }

    const removeFunFact = async () => {
        if (updatedFunFact.id) {
            await dispatch(deleteFunFact(updatedFunFact.id))
            await dispatch(fetchAllFunFacts())
        }
    }

    return (
        <div className="my-1">
            <div className="text-center">+----------------------------------+</div>
            <div>
                {newFact === false ?
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
                                    initialValue={updatedFunFact.id?.toString()}
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
                                <span className="text-white ml-1">new funfact: {updatedFunFact.funfact}</span>
                            </div>
                            <div className="">|</div>
                        </div>
                        <div className="text-center">+----------------------------------+</div>
                    </Fragment>
                }

                <div className="flex justify-between">
                    <div className="">|</div>
                    <div className="w-full">
                        <span className="text-secondary ml-1">funfact:</span>
                    </div>
                    <div className="">|</div>
                </div>
                <div className="flex justify-between">
                    <div className="">|</div>
                    <div className="w-full">
                        <InputField
                            initialValue={updatedFunFact.funfact?.toString()}
                            onChange={updateFunFactName}
                            name={'funfact'}
                            margin={"my-0"}
                        />
                    </div>
                    <div className="">|</div>
                </div>
                <div className="flex justify-between">
                    <div className="">|</div>
                    <div className="">|</div>
                </div>

                {newFact ?
                <div>
                    <Button
                        onClick={addFunFact}
                        color={"text-primary"}
                        hoverColor={"hover:text-primary"}
                    >
                        add new funfact
                    </Button>
                </div>
                :
                <div className="">
                    <Button
                        onClick={editFunFact}
                        color={"text-primary"}
                        hoverColor={"hover:text-primary"}
                    >
                        save edited funfact
                    </Button>
                    <Button
                        onClick={removeFunFact}
                        color={"text-red-400"}
                        hoverColor={"hover:text-red-400"}
                    >
                        delete funfact
                    </Button>
                </div>
            }
        </div>
    </div>
    );
};

export default FunFactListItem;
