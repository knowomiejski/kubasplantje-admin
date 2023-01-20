import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutAuthentication, selectTokenStatus } from "../store/authenticationSlice";
import { Status } from "../store/enums/status";
import { AppDispatch } from "../store/store";
import SiteTitle from "./SiteTitle";

const Navigation = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const tokenStatus = useSelector(selectTokenStatus)

    const logout = async () => {
        await dispatch(logoutAuthentication())
        navigate('/login')
    }

    return (
        <div className="flex flex-col items-center">
            <SiteTitle/>
            {
            tokenStatus.status === Status.SUCCEEDED
            ?
            <Fragment>
                <div className="my-2">
                    <span className="text-secondary hover:text-secondary hover:underline cursor-pointer"onClick={logout}>logout</span>
                </div>
                <div className="flex justify-around w-full">
                    <Link className="hover:text-primary hover:underline" to={"/edit/techs"}>techs</Link>
                    <Link className="hover:text-primary hover:underline" to={"/edit/projects"}>projects</Link>
                    <Link className="hover:text-primary hover:underline" to={"/edit/funfacts"}>funfacts</Link>
                    <Link className="hover:text-primary hover:underline" to={"/edit/contact"}>contact</Link>
                </div>
            </Fragment>

            :
            <Fragment/>
            }
        </div>
    );
};

export default Navigation;
