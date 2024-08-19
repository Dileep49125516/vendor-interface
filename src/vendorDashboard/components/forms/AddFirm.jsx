import React,{useState} from 'react'
import {API_URL} from "../../data/apiPath"
const AddFirm = () => {
  const [firmName,setFirmName]=useState("");
  const [area,setArea]=useState("");
  const [region,setRegion]=useState([]);
  const [category,setCategory]=useState([]);
  const [offer,setOffer]=useState("");
  const [file,setFile]=useState(null);

  const handleCategoryChange=(event)=>{
    const value=event.target.value;
    if(category.includes(value)){
      setCategory(category.filter((item)=>item!==value));
    }else{
      setCategory([...category,value])
    }
  }
  const handleRegionChange=(event)=>{
    const value=event.target.value;
    if(region.includes(value)){
      setRegion(region.filter((item)=>item!==value));
    }else{
      setRegion([...region,value])
    }
  }
  const handleImageUpload=(event)=>{
    const selectedImage=event.target.files[0];
    setFile(selectedImage)
  }
const handleFirmSubmit=async(e)=>{
  e.preventDefault();
  try{
   const loginToken=localStorage.getItem("loginToken");
   if(!loginToken){
    console.error("User not authenticated");
   }
   const formData=new FormData();
    formData.append("firmName",firmName);
    formData.append("area",area);
    formData.append("offer",offer);
    formData.append("image",file)
    category.forEach((value)=>{
      formData.append("category",value)
    });
    region.forEach((value)=>{
      formData.append("region",value)
    })

    const response=await fetch(`${API_URL}/firm/add-firm`,{
      method:"post",
      headers:{
        "token":`${loginToken}`,

      },
      body:formData
     });
     const data=await response.json();
     if(response.ok){
      console.log(data);
      setFirmName("");
      setArea("");
      setOffer("");
      setCategory([]);
      setRegion([]);
      setFile(null);
      alert("Firm added Successfully")
     }else if(data.message==="Vendor can have only one firm"){
      alert("Firm Exists😒.Only 1 firm can be added")
     }else{
      alert('failed to add firm')
     }
     console.log("This is my firmId:",data.firmId)
     const firmId=data.firmId;

     localStorage.setItem("firmId",firmId);

  }catch(error){
     console.error("Failed to add Firm",error)
  }
}


  return (
   <div className="firmSection">
    <form className="tableForm" onSubmit={handleFirmSubmit}>
        <h3>Add Firm</h3>
        <label>FirmName:</label>
        <input type='text'name="firmName" value={firmName} onChange={(e)=>setFirmName(e.target.value)}placeholder="enter a firm name"/>
        <label>Area:</label>
        <input type='text' name="area" value={area} onChange={(e)=>setArea(e.target.value)} placeholder="enter a your area"/>
        <div className="check-inp">
          <label>Category:</label>
          <div className="inputsContainer">
          <div className="checkboxContainer">
              <label>Veg:</label>
              <input type="checkbox" checked={category.includes("veg")} value="veg" onChange={handleCategoryChange}></input>
            </div>
            <div className="checkboxContainer">
              <label>Non-Veg:</label>
              <input type="checkbox" checked={category.includes("Non-veg")} value="Non-veg" onChange={handleCategoryChange}></input>
            </div>
          </div>
        </div>
        <div className="check-inp">
          <label>Region:</label>
          <div className="inputsContainer">
          <div className="regionboxContainer">
              <label>South-indian:</label>
              <input type="checkbox" checked={region.includes("south-indian")} value="south-indian" onChange={handleRegionChange} ></input>
            </div>
            <div className="regionboxContainer">
              <label>North-indian:</label>
              <input type="checkbox" checked={region.includes("north-indian")} value="north-indian" onChange={handleRegionChange} ></input>
            </div>
            <div className="regionboxContainer">
              <label>Chinese:</label>
              <input type="checkbox" checked={region.includes("chinese")} value="chinese" onChange={handleRegionChange}></input>
            </div>
            <div className="regionboxContainer">
              <label>Bakery:</label>
              <input type="checkbox" checked={region.includes("bakery")} value="bakery" onChange={handleRegionChange} ></input>
            </div>
          </div>
        </div>
        <label>Offer:</label>
        <input type='text'name="offer"value={offer} onChange={(e)=>setOffer(e.target.value)}/>
        <label>FirmImage:</label>
        <input type='file' onChange={handleImageUpload}/><br/>
    <div className="btnSubmit">
            <button type="submit">submit</button>
        </div>
    </form>
    </div>
  )
}

export default AddFirm