import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectTokenStatus } from "../store/authenticationSlice";
import { Status } from "../store/enums/status";
import SiteTitle from "./SiteTitle";

const Navigation = () => {
    const tokenStatus = useSelector(selectTokenStatus)

    return (
        <div className="flex flex-col items-center">
            <SiteTitle/>
            {
            tokenStatus.status === Status.SUCCEEDED
            ?
            <div className="flex justify-around w-full">
                <Link className="hover:text-primary hover:underline" to={"/edit/techs"}>techs</Link>
                <Link className="hover:text-primary hover:underline" to={"/edit/projects"}>projects</Link>
                <Link className="hover:text-primary hover:underline" to={"/edit/funfacts"}>funfacts</Link>
                <Link className="hover:text-primary hover:underline" to={"/edit/contact"}>contact</Link>
            </div>
            :
            <Fragment/>
            }
        </div>
    );
};

export default Navigation;
