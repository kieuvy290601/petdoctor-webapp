import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";

import {
  Timestamp,
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Col, Form } from "reactstrap";
import { db, storage } from "../../../firebase.config";
import "./AllProduct.css";

const PAGE_SIZE = 10;

const AllProduct = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  //Implement pagination

  const totalPages = Math.ceil(data.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const currentData = data.slice(startIndex, endIndex);

  // TODO: Set show modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const initialState = {
    prdName: "",
    prdPrice: 0,
    prdQuantity: 0,
    prdCategory: "",
    prdSubCategory: "",
    prdDesc: "",
    prdShortDesc: "",
    prdDirection: "",
    prdURL: "",
  };

  const [product, setProduct] = useState({
    ...initialState,
  });

  useEffect(() => {
    const fetchData = async () => {
      const prdList = collection(db, "products");
      let q = prdList;

      if (selectedCategory !== "") {
        q = query(prdList, where("prdCategory", "==", selectedCategory));
      }

      if (selectedSubcategory !== "") {
        q = query(q, where("prdSubCategory", "==", selectedSubcategory));
      }

      if (searchTerm !== "") {
        q = query(
          prdList,
          where("prdName", ">=", searchTerm),
          orderBy("prdName")
        );
        // Add the following line to also search for products whose prdName field includes the search term:
        q = query(
          prdList,
          where("prdName", ">=", searchTerm),
          where("prdName", "<=", searchTerm + "\uf8ff"),
          orderBy("prdName")
        );
      }

      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        prdId: doc.id,
        ...doc.data(),
      }));
      setData(data);
    };
    fetchData();
  }, [selectedCategory, selectedSubcategory, searchTerm]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleURLChange = (e) => {
    const prdURL = e.target.files[0];

    const storageRef = ref(storage, `productImg/${prdURL.name}`);
    const uploadTask = uploadBytesResumable(storageRef, prdURL);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({ ...product, prdURL: downloadURL });
          toast.success("Image uploaded successfully.");
        });
      }
    );
  };
  

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setSelectedSubcategory("");
  };

  const handleSubcategoryChange = (event) => {
    setSelectedSubcategory(event.target.value);
  };
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const navigate = useNavigate();


  const createData = async (e) => {
    e.preventDefault();
    // console.log(product);

    
    if (
      !product.prdName ||
      !product.prdQuantity ||
      !product.prdPrice ||
      !product.prdCategory ||
      !product.prdSubCategory ||
      !product.prdURL
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const dataRef = addDoc(collection(db, "products"), {
        prdName: product.prdName,
        prdPrice: Number(product.prdPrice),
        prdQuantity: Number(product.prdQuantity),
        prdCategory: product.prdCategory,
        prdSubCategory: product.prdSubCategory,
        prdDesc: product.prdDesc,
        prdShortDesc: product.prdShortDesc,
        prdDirection: product.prdDirection,
        prdURL: product.prdURL,
        createAt: Timestamp.now().toDate(),
      });
      console.log(product.prdURL);
      setProduct({ ...initialState });
      handleClose();
      toast.success("Product added successfully.");
      navigate("/admin/allproduct");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section>
      <div>
        <h2 style={{ fontWeight: "bold", paddingLeft: 25 }}>All Product</h2>
        <div></div>
      </div>
      <section className="px-3" style={{ padding: "35px" }}>
        <div className="search-container">
          <div className="add-product-container">
            <Button className="deli" onClick={handleShow}>
              Add product
            </Button>
            <Modal show={show} size="lg" onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add new product</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p style={{ paddingLeft: 18 }}>* Indicates a required field</p>
                <div style={{ padding: 20 }}>
                  <Form onSubmit={createData}>
                    <div className="col-md-6">
                      <label>Product Name *</label>
                      <input
                        type="text"
                        className="border"
                        placeholder="Enter name of your product"
                        name="prdName"
                        value={product.prdName}
                        onChange={(e) => handleInputChange(e)}
                        style={{ width: 724 }}
                        required
                      />
                    </div>

                    <div className="row gx-3">
                      <div className="col-md-6">
                        <label>Product Price *</label>
                        <input
                          type="text"
                          className="border"
                          name="prdPrice"
                          placeholder="Example: 350"
                          value={product.prdPrice}
                          onChange={(e) => handleInputChange(e)}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label>Available Quantity *</label>
                        <input
                          type="text"
                          className="border"
                          name="prdQuantity"
                          placeholder="Example: 350"
                          value={product.prdQuantity}
                          onChange={(e) => handleInputChange(e)}
                          required
                        />
                      </div>
                    </div>
                    <div className="row gx-3">
                      <div className="col-md-6 mb-3">
                        <label className="mb-2">Category *</label>

                        <select
                          className="form-select"
                          name="prdCategory"
                          value={product.prdCategory}
                          onChange={(e) => handleInputChange(e)}
                          required
                        >
                          <option>Choose pet</option>
                          <option value="Dog">Dog</option>
                          <option value="Cat">Cat</option>
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="mb-2">Sub Category *</label>

                        <select
                          name="prdSubCategory"
                          className="form-select"
                          value={product.prdSubCategory}
                          onChange={(e) => handleInputChange(e)}
                          required
                        >
                          <option>Choose category</option>
                          <option value="Vaccine">Vaccine</option>
                          <option value="Medicine">Medicine</option>
                          <option value="Food">Food</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <label className="mb-2">Product Image *</label>
                      <input
                        type="file"
                        accept="image/*"
                        name="prdURL"
                        className="form-control"
                        style={{ width: 724 }}
                        onChange={(e) => handleURLChange(e)}
                        required
                      />
                    </div>
                    <div className="my-3">
                      <label className="mb-2">Short Description</label>
                      <textarea
                        className="form-control"
                        style={{ backgroundColor: "#dde3e6" }}
                        placeholder="Enter description here"                        
                        rows="2"
                        name="prdShortDesc"
                        value={product.prdShortDesc}
                        onChange={(e) => handleInputChange(e)}
                      ></textarea>
                    </div>
                    <div className="my-3">
                      <label className="mb-2">Description</label>
                      <textarea
                        className="form-control"
                        style={{ backgroundColor: "#dde3e6" }}
                        placeholder="Enter description here"
                        rows="3"
                        name="prdDesc"
                        value={product.prdDesc}
                        onChange={(e) => handleInputChange(e)}
                      ></textarea>
                    </div>
                    <div className="my-3">
                      <label className="mb-2">Direction *</label>
                      <textarea
                        className="form-control"
                        style={{ backgroundColor: "#dde3e6" }}
                        placeholder="Enter description here"
                        rows="3"
                        name="prdDirection"
                        value={product.prdDirection}
                        onChange={(e) => handleInputChange(e)}
                        required
                      ></textarea>
                    </div>
                    <div
                      className="form-group d-flex"
                      style={{ justifyContent: "flex-end" }}
                    >
                      <button
                        type="button"
                        className="btn_cancel text-white btn-rounded"
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn_add text-white">
                        Add
                      </button>
                    </div>
                    
                  </Form>
                  
                </div>
              </Modal.Body>
            </Modal>
          </div>
          <Col md="5" className="d-flex">
            <div className="category px-4" style={{ marginLeft: 30 }}>
              <select
                id="category-select"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="">All Categories</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
              </select>
            </div>
            <div className="subcategory">
              <select
                id="subcategory-select"
                value={selectedSubcategory}
                onChange={handleSubcategoryChange}
              >
                <option value="">All subcategories</option>
                <option value="Food">Food</option>
                <option value="Medicine">Medicine</option>
                <option value="Vaccine">Vaccine</option>
              </select>
            </div>
          </Col>
          <Col md="4" className="justify-content-end d-flex">
            <div className="search">
              <input
                className="search-prd"
                style={{ background: "none", paddingBottom: 10 }}
                type="text"
                placeholder="Search...."
                value={searchTerm}
                onChange={handleSearch}
              />
              <span>
                <i class="ri-search-line"></i>
              </span>
            </div>
          </Col>
        </div>
        <Table striped bordered hover>
          <thead className="thead">
            <tr>
              <th>#</th>
              <th className="th-name">Product Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Subcategory</th>
              <th className="th-action">Actions</th>
            </tr>
          </thead>

          <tbody className="tbody">
            {currentData.map((item, index) => (
              <tr key={startIndex + index}>
                <td>{startIndex + index + 1}</td>
                <td>{item.prdName}</td>
                <td>${item.prdPrice}</td>
                <td>{item.prdCategory}</td>
                <td>{item.prdSubCategory}</td>
                <td className="action">
                  <span>
                    <i
                      className="ri-edit-2-line"
                      style={{ color: "#7bbb1a" }}
                    ></i>
                  </span>
                  <span>
                    <i className="ri-eye-line"></i>
                  </span>
                  <span>
                    <i
                      className="ri-delete-bin-2-line"
                      style={{ color: "red" }}
                    ></i>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <nav>
          <div className="pagination-container">
            <ul className="pagination">
              {Array.from({ length: totalPages }).map((_, i) => (
                <li
                  key={i}
                  className={`page-item ${
                    currentPage === i + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </section>
    </section>
  );
};

export default AllProduct;
