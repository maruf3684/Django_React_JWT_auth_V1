import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../store/context/AuthContext";

const PublicRoute = ({ children }) => {
	const context = useContext(AuthContext);
	const { userState } = context;

	const is_Authenticated = userState.user;
	return <>{is_Authenticated ? <Navigate to="/" /> : children}</>;
};

export default PublicRoute;
