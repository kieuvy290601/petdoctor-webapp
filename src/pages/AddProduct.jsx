import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import { Form } from "reactstrap";
import { db, storage } from "../firebase.config";

import "../styles/AddProduct.css";

const AddProduct = () => {
  const [name, setProductName] = useState("");
  const [price, setProductPrice] = useState(0);
  const [category, setProductCategory] = useState("");
  const [quantity, setProductQuantity] = useState(0);
  const [description, setProducDescription] = useState("");
  // const [img, setProductImage] = useState(null);
  // const [error, setError] = useState(null);
  const [file, setFile] = useState("");

  const createData = async (e) => {
    e.preventDefault();

    // try {
    const storageRef = ref(storage, `productImg/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      (error) => {
        console.log("Something went wrong");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await addDoc(collection(db, "products"), {
            prdName: name,
            prdPrice: price,
            prdCategory: category,
            prdQuantity: quantity,
            prdDesc: description,
            prdURL: downloadURL,
          });
        });
      }
    );

    // await setDoc(doc(db, "cities", "LA"), {
    //   name: "Los Angeles",
    //   state: "CA",
    //   country: "USA",
    // });

    //setLoading(true);
    console.log("Added product successfully");
    // } catch (error) {
    //   //setLoading(false);
    //   console.log("Something went wrong");
    // }
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
              />
            </div>
            <div className="col-md-6">
              <label>Available Quantity</label>
              <input
                type="text"
                className="border"
                placeholder="Example: 350"
                value={quantity}
                onChange={(e) => setProductQuantity(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="row gx-3">
            <div className="col-md-6">
              <label className="mb-2">Category</label>

              <select
                className="form-select"
                value={category}
                onChange={(e) => setProductCategory(e.target.value)}
              >
                <option>Choose category</option>
                <option>Vaccine</option>
                <option>Medicine</option>
                <option>Food</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="mb-2">Product Image</label>
              <input
                type="file"
                className="form-control"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
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
