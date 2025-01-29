import React, { useState } from 'react'
import axios from 'axios';

const Test = () => {
    const [mail, setMail] = useState("")
    const [pass, setPass] = useState("")

    const loginUser = (e) =>{
        e.preventDefault();  // Prevent the form from reloading the page
    console.log("Form submitted"); 

        axios.post("http://localhost:5000/auth/login",{
            email: mail,
            password: pass
        })
        .then((res)=>{
            alert(res.data.message,"res")
        },(error)=>{
            alert(error.response.data.message,"error")
        })
    }

    return (
        <div>
            <form onSubmit={loginUser}>
                <input 
                    type='text' 
                    placeholder='mail' 
                    onChange={(e) => setMail(e.target.value)} 
                />
                <input 
                    type='password' 
                    placeholder='pass' 
                    onChange={(e) => setPass(e.target.value)} 
                />
                <button type='submit'>login</button>
            </form>
        </div>
    )
}

export default Test
