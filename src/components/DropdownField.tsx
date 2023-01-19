import React, { Fragment, useState } from "react";
import { IDropdownFieldProps } from "../interfaces/IDropdownFieldProps";

const DropdownField = (props: IDropdownFieldProps) => {

    const [dropdownStatus, setDropdownStatus] = useState(false)
    const [value, setValue] = useState(props.value)

    const onOpenDropdown = (status: boolean) => {
        setDropdownStatus(status)
    }

    const selectChoice = (option: string) => {
        setValue(option)
        props.onSelectChoice(props.name, option)
    }

    return (
        <div className={"flex flex-col text-left w-full"}>
            {props.label && <label htmlFor={props.name} className="text-white">{props.label}</label>}
            <div onClick={() => onOpenDropdown(!dropdownStatus)} className="flex justify-between">
                <div>
                    |
                </div>
                <div className="text-primary border-b w-full">
                    - {value}
                </div>
                <div>
                    |
                </div>

            </div>
            {
                dropdownStatus ?
                props.options.map((option, i) => {
                    return (
                        <div key={i} onClick={() => {selectChoice(option); onOpenDropdown(false)}} className="flex justify-between">
                            <div>
                                ||
                            </div>
                            <div className={value === option ? 'text-secondary w-full' : 'w-full'}>
                                {option}
                            </div>
                            <div>
                                ||
                            </div>
                        </div>
                    )
                })
                :
                <Fragment/>
            }
        </div>
    );
};

export default DropdownField;
