import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { IContactInfo } from "../interfaces/IContactInfo";
import { fetchAllContactInfos, updateContactInfo } from "../store/contactInfoSlice";
import { AppDispatch } from "../store/store";
import globalUtility from "../utility/globalUtility";
import Button from "./Button";
import InputField from "./InputField";

interface Props {
    newContactInfo: boolean,
    contactInfo: IContactInfo
}

const ContactInfoListItem = ({contactInfo, newContactInfo}: Props) => {
    const dispatch = useDispatch<AppDispatch>()

    const initialContactInfo = {
        id: contactInfo.id,
        personalEmail: contactInfo.personalEmail,
        companyEmail: contactInfo.companyEmail,
        phoneNumber: contactInfo.phoneNumber,
        new: contactInfo.new
    } as IContactInfo
    const [updatedContactInfo, setUpdatedContactInfo] = useState<IContactInfo>({...initialContactInfo})

    const updateContactInfoName = (fieldNameString: string, input: string) => {
        updateField(fieldNameString, input)
    }

    const updateField = (fieldNameString: string, input: string) => {
        const fieldName = fieldNameString as keyof IContactInfo
        const tempUpdatedContactInfo = {...updatedContactInfo}
        if (fieldName !== undefined) {
            const currentValue = globalUtility.getProperty(tempUpdatedContactInfo, fieldName)
            let convertedInput: string | number;
            if (typeof currentValue === "number") {
                convertedInput = +input
            } else {
                convertedInput = input
            }
            globalUtility.setProperty(tempUpdatedContactInfo, fieldName, convertedInput)
            setUpdatedContactInfo(tempUpdatedContactInfo)
        }
    }

    const addContactInfo = async () => {
        setUpdatedContactInfo({...initialContactInfo})
    }

    const editContactInfo = async () => {
        await dispatch(updateContactInfo(updatedContactInfo))
        await dispatch(fetchAllContactInfos())
    }

    const removeContactInfo = () => {
        console.log(updatedContactInfo)
    }

    return (
        <div className="my-1">
            <div className="text-center">+----------------------------------+</div>
            <div>
                {newContactInfo === false ?
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
                                    initialValue={updatedContactInfo.id?.toString()}
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
                                <span className="text-white ml-1">new contact info</span>
                            </div>
                            <div className="">|</div>
                        </div>
                        <div className="text-center">+----------------------------------+</div>
                    </Fragment>
                }

                <div className="flex justify-between">
                    <div className="">|</div>
                    <div className="w-full">
                        <span className="text-secondary ml-1">personal email:</span>
                    </div>
                    <div className="">|</div>
                </div>
                <div className="flex justify-between">
                    <div className="">|</div>
                    <div className="w-full">
                        <InputField
                            initialValue={updatedContactInfo.personalEmail?.toString()}
                            onChange={(fName, input) => updateField(fName, input)}
                            name={'personalEmail'}
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
                        <span className="text-secondary ml-1">company email:</span>
                    </div>
                    <div className="">|</div>
                </div>
                <div className="flex justify-between">
                    <div className="">|</div>
                    <div className="w-full">
                        <InputField
                            initialValue={updatedContactInfo.companyEmail?.toString()}
                            onChange={(fName, input) => updateField(fName, input)}
                            name={'companyEmail'}
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
                        <span className="text-secondary ml-1">phone number:</span>
                    </div>
                    <div className="">|</div>
                </div>
                <div className="flex justify-between">
                    <div className="">|</div>
                    <div className="w-full">
                        <InputField
                            initialValue={updatedContactInfo.phoneNumber?.toString()}
                            onChange={(fName, input) => updateField(fName, input)}
                            name={'phoneNumber'}
                            margin={"my-0"}
                        />
                    </div>
                    <div className="">|</div>
                </div>
                <div className="flex justify-between">
                    <div className="">|</div>
                    <div className="">|</div>
                </div>

                {newContactInfo ?
                <div>
                    <Button
                        onClick={addContactInfo}
                        color={"text-primary"}
                        hoverColor={"hover:text-primary"}
                    >
                        add new contactInfo
                    </Button>
                </div>
                :
                <div className="">
                    <Button
                        onClick={editContactInfo}
                        color={"text-primary"}
                        hoverColor={"hover:text-primary"}
                    >
                        save edited contact info
                    </Button>
                    <Button
                        onClick={removeContactInfo}
                        color={"text-red-400"}
                        hoverColor={"hover:text-red-400"}
                    >
                        delete contact info
                    </Button>
                </div>
            }
        </div>
    </div>
    );
};

export default ContactInfoListItem;
