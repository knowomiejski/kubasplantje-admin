import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";


const MainLayout = () => {
	return (
		<div className="text-center py-6">
			<Navigation/>
            <Outlet/>
		</div>
	);
};

export default MainLayout;

