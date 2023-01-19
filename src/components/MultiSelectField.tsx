import React, { Fragment, useState } from "react";
import { IMultiselectField } from "../interfaces/IMultiselectField"

const MultiSelectField = (props: IMultiselectField) => {
    const [expandStatus, setExpandStatus] = useState(false)

    return (
        <div className="w-full">
                {
                    props.selectedValues.length > 0 ?
                    props.selectedValues.map((item, i) => {
                        return (
                            <Fragment key={i}>
                                <div className="flex justify-between"  onClick={() => props.onSelectChoice(props.name, item, false)}>
                                    <div>
                                        |
                                    </div>
                                    <div className="w-full">
                                        <span className="text-secondary">* </span>{item}
                                    </div>
                                    <div>
                                        |
                                    </div>
                                </div>
                            </Fragment>
                        )
                    })
                    :
                    <div className="flex justify-between">
                        <div>
                            |
                        </div>
                        <div className="w-full mx-1">
                            <span> nothing here...</span>
                        </div>
                        <div>
                            |
                        </div>
                    </div>
                }
                <div className="flex justify-between text-primary" onClick={() => setExpandStatus(!expandStatus)}>
                    {
                        expandStatus ?
                        <Fragment>
                            <div>
                                |/\
                            </div>
                            <div>
                                hide
                            </div>
                            <div>
                                /\|
                            </div>
                        </Fragment>
                        :
                        <Fragment>
                            <div>
                                |\/
                            </div>
                            <div>
                                expand
                            </div>
                            <div>
                                \/|
                            </div>
                        </Fragment>
                    }

                </div>
                {
                    expandStatus ?
                    props.options.map((item, i) => {
                        return (
                            <Fragment key={i}>
                                <div className="flex justify-between" onClick={() => props.onSelectChoice(props.name, item, true)}>
                                    <div>
                                        |
                                    </div>
                                    <div className="w-full">
                                    <span className="text-primary">* </span>{item}
                                    </div>
                                    <div>
                                        |
                                    </div>
                                </div>
                            </Fragment>
                        )
                    })
                    :
                    <Fragment/>
                }
        </div>
    )
}

export default MultiSelectField;