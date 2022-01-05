
import React, {useContext} from 'react'
import { Navigate } from 'react-router-dom';
import AuthContext from '../store/context/AuthContext';

const PrivateRoute = ({children}) => {

    const context=useContext(AuthContext)
    const{userState}=context

    const is_Authenticated=userState.user
    return (
        <>
        {
            is_Authenticated?children:<Navigate to="/login"/>
        } 
        </>
    )
}

export default PrivateRoute
