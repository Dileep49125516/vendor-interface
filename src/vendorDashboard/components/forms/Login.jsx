import React,{useState} from 'react'
import { API_URL } from '../../data/apiPath';

const Login = ({showWelcomeHandler}) => {
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");

const loginHandler=async(e)=>{
  e.preventDefault();
  try{
    const response=await fetch(`${API_URL}/vendor/login`,{
      method:"post",
      headers:{
        "Content-type":"application/json"
      },
      body:JSON.stringify({email,password})
    })
    const data=await response.json();
    if(response.ok){
      setEmail("");
      setPassword("");
     alert("Login success");
     localStorage.setItem("loginToken",data.token)
     showWelcomeHandler()
    }
    const vendorId=data.vendorId;
    console.log(vendorId,"this is vendorId")
   const vendorResponse=await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`)
    const vendorData=await vendorResponse.json();
   if(vendorResponse.ok){
     const vendorFirmId=vendorData.vendorFirmId;
     const vendorFirmName=vendorData.vendor.firm[0].firmName;
     console.log("My firmName is",vendorFirmName)
      console.log(vendorFirmId,"this is Firmid")
      localStorage.setItem("firmId",vendorFirmId)
      localStorage.setItem("firmName",vendorFirmName)
      window.location.reload()
    }
  }catch(error){
     alert("login fail")
     
  }

}

  return (
    <div className="loginSection">
        <form className="authForm" onSubmit={loginHandler}>
           <h3>vendor login</h3><br/>
            <label>Email:</label>
            <input type="text"name="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="enter your email"></input><br/>
            <label>Password:</label>
            <input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="enter your password"></input><br/>
        <div className="btnSubmit">
            <button type="submit">submit</button>
        </div>
        </form>
    </div>
  )
}

export default Login