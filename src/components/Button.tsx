import React, { useEffect, useState } from "react";
import { IButtonProps } from "../interfaces/IButton";

const Button = (props: IButtonProps) => {

    return (
        <div
            onClick={props.onClick}
            className={"flex flex-col leading-4 cursor-pointer " + props.hoverColor}
        >
            <div>
                +----------------------------------+
            </div>
            <div className="flex justify-between">
                <div className="ml-0.5">
                    |
                </div>
                <div className="text-left w-full">
                    <span className={`${props.color}`}>{">"} </span>
                    <span className="underline">{props.children}</span>
                </div>
                <div className="mr-0.5">
                    |
                </div>
            </div>
            <div>
                +----------------------------------+
            </div>
        </div>
    )
}

export default Button