import React,{useState} from 'react'
import { API_URL } from '../../data/apiPath';

const Register = ({showLoginHandler}) => {
  const [username,setUsername]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");
  const [loading,setLoading]=useState(false);

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      const response=await fetch(`${API_URL}/vendor/register`,{
        method:'POST',
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({username,email,password})
      })

     const data=await response.json();
     if(response.ok){
      console.log(data);
      setUsername("");
      setEmail("");
      setPassword("");
      alert("vendor registered success")
      showLoginHandler()
     }

    }catch(error){
         console.error("registration failed",error);
         alert("Registration Failed")
    }
  }

  return (
   <div className="registerSection">
    <form className="authForm" onSubmit={handleSubmit}>
            <h3>Vendor register</h3>
            <label>UserName:</label>
            <input type="text" name="username" value={username} onChange={(e)=>setUsername(e.target.value)}placeholder="enter your UserName"></input><br/>
            <label>Email:</label>
            <input type="text" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="enter your email"></input><br/>
            <label>Password:</label>
            <input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="enter your password"></input><br/>
        <div className="btnSubmit">
            <button type="submit">submit</button>
        </div>
        </form>
   </div>
  )
}

export default Register