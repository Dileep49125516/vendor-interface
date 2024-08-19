import React from 'react'

const Navbar = ({showLoginHandler,showRegisterHandler,showLogOut,logOutHandler}) => {
  const firmName=localStorage.getItem("firmName");
  return (
    <div className="navSection">
      <div className="company">
         Vendor Dashboard
      </div>
      <div className="firmName">
        <h4>Restaurant :{firmName}</h4>
      </div>
      <div className="userAuth">
        {!showLogOut?
        <>
        <span onClick={showLoginHandler}><u>login/</u> </span>
        <span onClick={showRegisterHandler}><u>register</u></span>
        </>:<span onClick={logOutHandler}><u>logOut</u></span>}
        
      </div>
    </div>
  )
}

export default Navbar