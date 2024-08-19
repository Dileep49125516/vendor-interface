import React, { useState } from 'react';
import { API_URL } from '../../data/apiPath';

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState([]);
  const [bestSeller, setBestSeller] = useState(false);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  const handleBestSeller = (event) => {
    const value = event.target.value === "true";
    setBestSeller(value);
  };

  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const loginToken = localStorage.getItem("loginToken");
      const firmId = localStorage.getItem("firmId");
      if (!loginToken || !firmId) {
        console.error("User not authenticated");
        return;
      }
      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("image", image);
      category.forEach((value) => {
        formData.append("category", value);
      });
      formData.append("bestseller",bestSeller)
      const response = await fetch(`${API_URL}/product/add-product/${firmId}`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (response.ok) {
        setProductName("");
        setPrice("");
        setCategory([]);
        setBestSeller(false)
        setDescription("");
        setImage(null);
        alert("Product added successfully");
      } else {
        throw new Error(data.message || "Failed to add product");
      }
    } catch (error) {
      console.error(error.message);
      alert("Failed to add product");
    }
  };

  return (
    <div className="firmSection">
      <form className="tableForm" onSubmit={handleAddProduct}>
        <h3>Add Product</h3>
        <label>Product Name:</label>
        <input
          type="text"
          name="productName"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Enter a Product name"
        />
        <label>Price:</label>
        <input
          type="text"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter a product price"
        />
        <div className="check-inp">
          <label>Category:</label>
          <div className="inputsContainer">
            <div className="checkboxContainer">
              <label>Veg:</label>
              <input
                type="checkbox"
                value="veg"
                checked={category.includes("veg")}
                onChange={handleCategoryChange}
              />
            </div>
            <div className="checkboxContainer">
              <label>Non-Veg:</label>
              <input
                type="checkbox"
                value="Non-veg"
                checked={category.includes("Non-veg")}
                onChange={handleCategoryChange}
              />
            </div>
          </div>
        </div>
        <div className="check-inp">
          <label>BestSeller:</label>
          <div className="inputsContainer">
            <div className="checkboxContainer">
              <label>Yes:</label>
              <input
                type="radio"
                value="true"
                checked={bestSeller === true}
                onChange={handleBestSeller}
              />
            </div>
            <div className="checkboxContainer">
              <label>No:</label>
              <input
                type="radio"
                value="false"
                checked={bestSeller === false}
                onChange={handleBestSeller}
              />
            </div>
          </div>
        </div>
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>Product Image:</label>
        <input type="file" onChange={handleImageUpload} /><br />
        <div className="btnSubmit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
