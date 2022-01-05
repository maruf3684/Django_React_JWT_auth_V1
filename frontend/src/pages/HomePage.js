import React from 'react'
import { useEffect, useState, useReducer } from "react";
import {useContext} from 'react'
import {  Link } from "react-router-dom";
import AuthContext from '../store/context/AuthContext';
console.log("homepage rendered");

const HomePage = () => {

    const [detail,setdetail]= useState([])
    const context=useContext(AuthContext)
    const{userState}=context

    useEffect(()=>{
        console.log(userState.authTokens.access);
        let getToken =async ()=>{
            let response = await fetch("http://127.0.0.1:8000/api/studentinfo/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization':'Bearer '+String(userState.authTokens.access)
                },
            });
            let data= await response.json();
            setdetail(data)
        }
        getToken()
    },[])

    return (
        <div className="w-full h-screen bg-slate-300">
            You are loged in profile page
            details in below section
            {detail&&detail.map((de)=>(
                <p key={de.id}>name:{de.identity}:: <span>{de.classnumber}</span></p>
            ))}
        </div>
    )
}

export default HomePage
