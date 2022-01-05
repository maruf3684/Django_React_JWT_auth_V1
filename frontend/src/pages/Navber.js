import React, {useContext} from 'react'
import {  Link } from "react-router-dom";
import AuthContext from '../store/context/AuthContext';

console.log("navber rendered");

const Navber = () => {
    const context=useContext(AuthContext)
    const{userState}=context

   
    return (
        <div className="w-full h-14 bg-red-500 mb-6 flex flex-row content-center justify-start gap-3 items-center px-5">
           <Link to="/">home</Link>
            <Link to="/profile">Profile</Link>

            {userState.user?<button onClick={context.logOutUser}>Logout</button>:<Link to="/login">Login</Link>}
            

            {userState.loading?<p>Loading...</p>:userState.error?<p>No user...</p>:(
                <p>User: {userState.user&&userState.user.name}</p>
            )}

        </div>
    )
}

export default Navber
