import React from "react";
import { EditableListTypes } from "../enums/EditableListTypes";
import { IEditableItem } from "../interfaces/IEditableItem";
import { IEditableItemList } from "../interfaces/IEditableListItem";
import { ITech } from "../interfaces/ITech";
import TechListItem from "./TechListItem";
import ProjectListItem from "./ProjectListItem";
import { IProject } from "../interfaces/IProject";
import FunFactListItem from "./FunFactListItem";
import { IFunFact } from "../interfaces/IFunFact";
import ContactInfoListItem from "./ContactListItem";
import { IContactInfo } from "../interfaces/IContactInfo";

const EditableList = (props: IEditableItemList) => {

    const fieldOptions = (item: IEditableItem, index: number) => {
        switch(props.type) {
            case EditableListTypes.TECH:
                return <TechListItem newTech={item.new} tech={item as ITech}/>
            case EditableListTypes.PROJECT:
                return <ProjectListItem newProject={item.new} project={item as IProject} allAvailibleTechs={props.relientOn[0] as ITech[]}/>
            case EditableListTypes.FUNFACT:
                return <FunFactListItem newFact={item.new} fact={item as IFunFact}/>
            case EditableListTypes.CONTACT:
                return <ContactInfoListItem newContactInfo={item.new} contactInfo={item as IContactInfo} />
            default:
                <div></div>
        }
    }

    return (
        <div className="mt-5 text-left mx-auto">
            <div>
                editing <span className="text-primary italic">{props.type.toString()}</span>:
            </div>
            {props.items.map((item, i) => {
                return (
                <div key={i} >
                    {fieldOptions(item, i)}
                </div>
                )
            })}
        </div>
    );
};

export default EditableList;
