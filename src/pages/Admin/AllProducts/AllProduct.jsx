import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";

import { addDoc, collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useNavigate } from "react-router-dom";
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
  const [isLoading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);


  //Implement pagination

  const totalPages = Math.ceil(data.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const currentData = data.slice(startIndex, endIndex);

  //Implement fields for adding products
  const [prdName, setPrdName] = useState("");
  const [prdPrice, setPrdPrice] = useState(null);
  const [prdQuantity, setPrdQuantity] = useState(null);
  const [prdCategory, setPrdCategory] = useState("");
  const [prdSubCategory, setPrdSubCategory] = useState("");
  const [prdShortDesc, setPrdShortDesc] = useState("");
  const [prdDesc, setPrdDesc] = useState("");
  const [prdDirection, setPrdDirection] = useState("");
  const [prdURL, setPrdURL] = useState(null);

  // TODO: Set show modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchData = async () => {
      const prdList = collection(db, "products");
      let q = prdList;

      if (selectedCategory !== "") {
        q = query(prdList, where("prdPet", "==", selectedCategory));
      }

      if (selectedSubcategory !== "") {
        q = query(q, where("prdCategory", "==", selectedSubcategory));
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

  const handleURLChange = (e) => {
    if (e.target.files[0]) {
      setPrdURL(e.target.files[0]);
    }
  };

  const createData = async (e) => {
    e.preventDefault();
     setIsSubmitting(true);

    const storageRef = ref(storage, `productsURL/${prdURL.name}`);
    const uploadTask = uploadBytesResumable(storageRef, prdURL);

    uploadTask.on(
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          addDoc(collection(db, "products"), {
            prdName,
            prdPrice,
            prdQuantity,
            prdCategory,
            prdSubCategory,
            prdShortDesc,
            prdDesc,
            prdDirection,
            prdURL: url,
          })
            .then(() => {
              setPrdName("");
              setPrdPrice(null);
              setPrdQuantity(null);
              setPrdCategory("");
              setPrdSubCategory("");
              setPrdShortDesc("");
              setPrdDesc("");
              setPrdDirection("");
              setPrdURL(null);
              setIsSubmitting(false);
              handleClose();
            })
            .catch((error) => {
              console.error("Error adding document: ", error);
            });
          navigate("/admin/allproduct");
        });
    });
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
                <div style={{ padding: 20 }}>
                  <Form onSubmit={createData}>
                    <div className="col-md-6">
                      <label>Product Name</label>
                      <input
                        type="text"
                        className="border"
                        placeholder="Enter name of your product"
                        required
                        id="prdName"
                        value={prdName}
                        onChange={(e) => setPrdName(e.target.value)}
                        style={{ width: 566 }}
                      />
                    </div>

                    <div className="row gx-3">
                      <div className="col-md-6">
                        <label>Product Price</label>
                        <input
                          type="text"
                          className="border"
                          placeholder="Example: $30"
                          required
                          id="prdPrice"
                          value={prdPrice}
                          onChange={(e) => setPrdPrice(Number(e.target.value))}
                        />
                      </div>
                      <div className="col-md-6">
                        <label>Available Quantity</label>
                        <input
                          required
                          type="text"
                          className="border"
                          placeholder="Example: 350"
                          id="prdQuantity"
                          value={prdQuantity}
                          onChange={(e) =>
                            setPrdQuantity(Number(e.target.value))
                          }
                        />
                      </div>
                    </div>
                    <div className="row gx-3">
                      <div className="col-md-6 mb-3">
                        <label className="mb-2">Category</label>

                        <select
                          required
                          className="form-select"
                          id="prdCategory"
                          value={prdCategory}
                          onChange={(e) => setPrdCategory(e.target.value)}
                        >
                          <option>Choose pet</option>
                          <option value="Dog">Dog</option>
                          <option value="Cat">Cat</option>
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="mb-2">Sub Category</label>

                        <select
                          required
                          className="form-select"
                          id="prdSubCategory"
                          value={prdSubCategory}
                          onChange={(e) => setPrdSubCategory(e.target.value)}
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
                        id="prdURL"
                        className="form-control"
                        style={{ width: 566 }}
                        onChange={handleURLChange}
                        required
                      />
                    </div>
                    <div className="my-3">
                      <label className="mb-2">Short Description</label>
                      <textarea
                        className="form-control"
                        style={{ backgroundColor: "#dde3e6" }}
                        placeholder="Enter description here"
                        rows="1"
                        id="prdShortDesc"
                        value={prdShortDesc}
                        onChange={(e) => setPrdShortDesc(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="my-3">
                      <label className="mb-2">Description</label>
                      <textarea
                        className="form-control"
                        style={{ backgroundColor: "#dde3e6" }}
                        placeholder="Enter description here"
                        rows="3"
                        id="prdDesc"
                        value={prdDesc}
                        onChange={(e) => setPrdDesc(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="my-3">
                      <label className="mb-2">Direction</label>
                      <textarea
                        className="form-control"
                        style={{ backgroundColor: "#dde3e6" }}
                        placeholder="Enter description here"
                        rows="3"
                        id="prdDirection"
                        value={prdDirection}
                        onChange={(e) => setPrdDirection(e.target.value)}
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
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn_add text-white"
                      >
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
