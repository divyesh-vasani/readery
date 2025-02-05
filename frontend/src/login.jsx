import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

const Login = () => {
  const { register, handleSubmit } = useForm();

  const loginUser = (data, e) => {
    e.preventDefault();

    axios.post(
        "http://localhost:5000/auth/login",
        {
          mail: data.username,
          password: data.password,
        },
        {
          withCredentials: true, // This ensures the JWT token is sent as a cookie
        }
      )
      .then((res) => {
        console.log(res, "res"); 
      })
      .catch((error) => {
        alert(error, "error"); 
      });
  };

  const registerUser = (e, data) => {
    e.preventDefault(); // Prevent the form from reloading the page
    console.log("Form submitted", data);

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
  };

  return (
    <div>
      <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit(loginUser)}>
          <input type="text" placeholder="username" {...register("username")} />
          <input
            type="password"
            placeholder="password"
            {...register("password")}
          />
          <button type="submit">login</button>
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
  );
};

export default Login;
