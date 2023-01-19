import React, { useEffect, useState } from "react";
import { IInputFieldProps } from "../interfaces/IInputField";

const InputField = (props: IInputFieldProps) => {
    const [value, setValue] = useState<string | number>('')

    useEffect(() => {
        return setValue(props.initialValue ? props.initialValue : '');
    }, [props.initialValue])

    const updateValue = (newValue: string) => {
        setValue(newValue)
        props.onChange(props.name, newValue)
    }

    return (
        <div className={"flex flex-col text-left mx-1 " + props.margin}>
            {props.label && <label htmlFor={props.name} className="text-white">{props.label}</label>}
            <div className="border-b">
                <input
                    onChange={(e) => updateValue(e.target.value)}
                    disabled={props.disabled}
                    value={value}
                    type={props.password ? "password" : props.number ? "number" : "text"}
                    className="w-full bg-midnight rounded-lg outline-none"
                    placeholder={props.placeholder ? props.placeholder : ""}
                    required
                ></input>
            </div>
        </div>
    );
};

export default InputField;
