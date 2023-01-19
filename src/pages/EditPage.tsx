import React from "react";
import { Outlet } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import TechsList from "../components/EditableList";
import { TechCategories } from "../enums/TechCategories";
import { IPageProps } from "../interfaces/IPage";
import { ITech } from "../interfaces/ITech";

const EditPage = (props: IPageProps) => {
return (
    <div>
        <PageTitle pageTitleProp={props.pageTitleProp}/>
        <Outlet/>
    </div>
)
}

export default EditPage;
