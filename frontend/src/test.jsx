import React, { useState } from 'react'
import axios from 'axios';
import { useForm } from "react-hook-form";


const Test = () => {
    const { register, handleSubmit } = useForm();

    const loginUser = (data,e) =>{
        e.preventDefault();  // Prevent the form from reloading the page
    console.log("Form submitted",data); 

        // axios.post("http://localhost:5000/auth/login",{
        //     email: mail,
        //     password: pass
        // })
        // .then((res)=>{
        //     alert(res.data.message,"res")
        // },(error)=>{
        //     alert(error.response.data.message,"error")
        // })
    }

    const registerUser = (e,data) =>{
        e.preventDefault();  // Prevent the form from reloading the page
    console.log("Form submitted",data); 

        // axios.post("http://localhost:5000/auth/signup",{
        //     email: mail,
        //     password: pass,
        //     name: name
        // })
        // .then((res)=>{
        //     alert(res,"res")
        // },(error)=>{
        //     alert(error,"error")
        // })
    }

    return (
        <div>
            <div>
                <h1>Login</h1>
            <form onSubmit={handleSubmit(loginUser)}>
                <input 
                    type='text' 
                    placeholder='mail' 
                    {...register("mail")}
                />
                <input 
                    type='password' 
                    placeholder='pass' 
                    {...register("pass")}
                />
                <button type='submit'>login</button>
            </form>
            </div>    
            {/* <div>
                <h1>Register</h1>
                <form onSubmit={handleSubmit(registerUser)}>
                <input 
                    type='text' 
                    placeholder='text' 
                    {...register("fname")}
                />
                <input 
                    type='text' 
                    placeholder='mail' 
                    {...register("mail")}
                />
                <input 
                    type='password' 
                    placeholder='pass' 
                    {...register("pass")}
                />
                <button type='submit'>Register</button>
            </form>
                </div>         */}
        </div>
    )
}

export default Test
