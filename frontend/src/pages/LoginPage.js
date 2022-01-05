import React, { useContext } from 'react'
import AuthContext from '../store/context/AuthContext';
console.log("Loginpage rendered");

const LoginPage = () => {

    let {loginUser}=useContext(AuthContext)
    
    const submithandler=(e)=>{
        e.preventDefault();
        loginUser(e)
    }
    return (
        <div>
            <form onSubmit={submithandler} className=" flex flex-col gap-6 justify-center" action="">
                <input className="self-center p-5 ring-4" type="text" name="email" placeholder="Email" />
                <input className="self-center p-5 ring-4" type="password" name="password" placeholder="Password" />
                <button className="p-5 px-20 bg-lime-400 self-center">Submit</button>
            </form>
        </div>
    )
}

export default LoginPage
