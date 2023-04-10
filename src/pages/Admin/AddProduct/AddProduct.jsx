import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Form } from "reactstrap";
import { db, storage } from "../../../firebase.config";

import "./AddProduct.css"
const AddProduct = () => {
  const [name, setProductName] = useState("");
  const [pet, setPet] = useState("");
  const [price, setProductPrice] = useState(0);
  const [category, setProductCategory] = useState("");
  const [quantity, setProductQuantity] = useState(0);
  const [description, setProducDescription] = useState("");
  const [file, setFile] = useState("");
  const [product, setProduct] = useState({
    prdName: "",
    prdURL: "",
    prdPrice: null,
    prdCategory: "",
    prdSubCategory: "",
    prdQuantity: null,
    prdShortDesc: "",
    prdDescription: "",
    prdDirection: "",
  })

  const handelInputChange = (e) => { };
  const handelURLChange = (e) => { };

  const navigate = useNavigate();

  const createData = async (e) => {
    e.preventDefault();

    if (
      !name ||
      !pet ||
      !price ||
      !category ||
      !quantity ||
      !description ||
      !file
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    const storageRef = ref(storage, `productImg/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      (error) => {
        console.log(error);
      },
      () => {
        // once the file is uploaded, get the download URL and add the product data to Firestore
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          const dataRef = await addDoc(collection(db, "products"), {
            prdName: name,
            prdPet: pet,
            prdPrice: price,
            prdCategory: category,
            prdQuantity: quantity,
            prdDesc: description,
            prdURL: downloadURL,
          });
          console.log("Added product successfully with ID: ", dataRef.id);
          navigate("/dogcare");
        });
      }
    );
  };

  return (
    <section style={{ background: "#a5c0d8" }}>
      <div className="add_product col-xl-6 mx-auto">
        <Form onSubmit={createData}>
          <h3 className="text-center mb-4">Add Product</h3>

          <div className="col-md-6">
            <label>Product Name</label>
            <input
              type="text"
              className="border"
              placeholder="Enter name of your product"
              value={name}
              onChange={(e) => setProductName(e.target.value)}
              style={{ width: 566 }}
              required
            />
          </div>

          <div className="row gx-3">
            <div className="col-md-6">
              <label>Product Price</label>
              <input
                type="text"
                className="border"
                placeholder="Example: $30"
                value={price}
                onChange={(e) => setProductPrice(Number(e.target.value))}
                required
              />
            </div>
            <div className="col-md-6">
              <label>Available Quantity</label>
              <input
                required
                type="text"
                className="border"
                placeholder="Example: 350"
                value={quantity}
                onChange={(e) => setProductQuantity(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="row gx-3">
            <div className="col-md-6 mb-3">
              <label className="mb-2">Choose Pet</label>

              <select
                required
                className="form-select"
                value={pet}
                onChange={(e) => setPet(e.target.value)}
              >
                <option>Choose pet</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="mb-2">Category</label>

              <select
                required
                className="form-select"
                value={category}
                onChange={(e) => setProductCategory(e.target.value)}
              >
                <option>Choose category</option>
                <option value="Vaccine">Vaccine</option>
                <option value="Medicine">Medicine</option>
                <option value="Food">Food</option>
              </select>
            </div>
          </div>

          <div className="col-md-6">
            <label className="mb-2">Product Image</label>
            <input
              type="file"
              className="form-control"
              style={{ width: 566 }}
              onChange={(e) => setFile(e.target.files[0])}
              required
            />
          </div>
          <div className="my-3">
            <label className="mb-2">Description</label>
            <textarea
              className="form-control"
              style={{ backgroundColor: "#dde3e6" }}
              placeholder="Enter description here"
              rows="3"
              value={description}
              onChange={(e) => setProducDescription(e.target.value)}
            ></textarea>
          </div>
          <div
            className="form-group d-flex"
            style={{ justifyContent: "flex-end" }}
          >
            <button type="button" className="btn_cancel text-white btn-rounded">
              Cancel
            </button>
            <button type="submit" className="btn_add text-white">
              Add
            </button>
          </div>
        </Form>
      </div>
    </section>
  );
};

export default AddProduct;
