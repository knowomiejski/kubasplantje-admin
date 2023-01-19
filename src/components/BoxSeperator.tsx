import React from "react";

interface IProps {
    color: string,
    secondaryColor: string
}

const BoxSeperator = ({color, secondaryColor}: IProps) => {
    return (
        <div className={"flex justify-between " + color}>
            <span>|</span>
            <span className={"" + secondaryColor}>----------------------------------</span>
            <span>|</span>
        </div>
    )
}

export default BoxSeperator;