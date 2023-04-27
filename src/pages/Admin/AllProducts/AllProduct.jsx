import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";

import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  getMetadata,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Col, Form } from "reactstrap";
import { db, storage } from "../../../firebase.config";
import { storeProducts } from "../../../redux/slices/productSlice";
import "./AllProduct.css";

const PAGE_SIZE = 10;

const AllProduct = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductEdit = (product) => {
    setSelectedProduct(product);
    setProduct({
      prdName: product.prdName,
      prdPrice: product.prdPrice,
      prdQuantity: product.prdQuantity,
      prdCategory: product.prdCategory,
      prdSubCategory: product.prdSubCategory,
      prdDesc: product.prdDesc,
      prdShortDesc: product.prdShortDesc,
      prdDirection: product.prdDirection,
      prdURL: product.prdURL,
    });
    setShowEdit(true);
    setProduct({ ...initialState });
  };

  const dispatch = useDispatch();
  //Implement pagination

  const totalPages = Math.ceil(data.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const currentData = data.slice(startIndex, endIndex);

  // TODO: Set show modal
  const [show, setShow] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const handleCloseDetail = () => setShowDetail(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const handleCloseEdit = () => {
  //   setShowEdit(false);
  //   setSelectedProduct(null);
  // };

  const initialState = {
    prdName: "",
    prdPrice: null,
    prdQuantity: null,
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
        q = query(
          prdList,
          where("prdCategory", "==", selectedCategory),
          orderBy("createAt", "desc")
        );
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
      dispatch(
        storeProducts({
          product: data,
        })
      );
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

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setShowDetail(true);
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

      // Fetch updated list of users from Firestore and update state
      const querySnapshot = await getDocs(
        query(collection(db, "products"), orderBy("createAt", "desc"))
      );
      const data = querySnapshot.docs.map((doc) => ({
        uid: doc.id,
        ...doc.data(),
      }));
      setData(data);

      setProduct({ ...initialState });
      handleClose();
      toast.success("Product added successfully.");
      navigate("/admin/allproduct");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleEditUser = async (e) => {
    e.preventDefault();

    // if (product.prdURL !== selectedProduct.prdURL) {
    //   const storageRef = ref(storage, selectedProduct.prdURL);
    //   deleteObject(storageRef);
    // }
    if (product.prdURL !== selectedProduct.prdURL) {
      const storageRef = ref(storage, selectedProduct.prdURL);
      getMetadata(storageRef)
        .then((metadata) => {
          if (metadata.exists()) {
            deleteObject(storageRef);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    try {
      await updateDoc(doc(db, "products", selectedProduct.prdId), {
        prdName: selectedProduct.prdName,
        prdPrice: Number(selectedProduct.prdPrice),
        prdQuantity: Number(selectedProduct.prdQuantity),
        prdCategory: selectedProduct.prdCategory,
        prdSubCategory: selectedProduct.prdSubCategory,
        prdDesc: selectedProduct.prdDesc,
        prdShortDesc: selectedProduct.prdShortDesc,
        prdDirection: selectedProduct.prdDirection,
        prdURL: product.prdURL,
      });
      toast.success("User updated successfully.");
      // Fetch updated list of users from Firestore and update state
      const querySnapshot = await getDocs(
        query(collection(db, "products"), orderBy("createAt", "desc"))
      );
      const data = querySnapshot.docs.map((doc) => ({
        uid: doc.id,
        ...doc.data(),
      }));
      setData(data);
      handleCloseEdit();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (prdId, prdURL) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!confirmed) {
        return;
      }
      // Delete product document from Firestore
      const deletePrd = doc(db, "products", prdId);
      await deleteDoc(deletePrd);

      const imgRef = ref(storage, prdURL);
      await deleteObject(imgRef);

      // Fetch updated list of users from Firestore and update state
      const querySnapshot = await getDocs(
        query(collection(db, "products"), orderBy("createAt", "desc"))
      );
      const data = querySnapshot.docs.map((doc) => ({
        uid: doc.id,
        ...doc.data(),
      }));
      setData(data);

      toast.success("Product deleted successfully.");
    } catch (error) {
      console.error("Error deleting product:", error);
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
                <p style={{ paddingLeft: 18, color: "red" }}>
                  * Indicates a required field
                </p>
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
                        <label className="my-1">Product Price *</label>
                        <input
                          type="number"
                          className="border mb-1"
                          name="prdPrice"
                          style={{ width: "100%" }}
                          placeholder="Example: 350"
                          value={product.prdPrice}
                          onChange={(e) => handleInputChange(e)}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="my-1">Available Quantity *</label>
                        <input
                          type="number"
                          style={{ width: "100%" }}
                          className="border mb-1"
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
        <Modal size="lg" show={showDetail} onHide={handleCloseDetail}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedProduct?.prdName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="detail-modal-container">
              <div className="detail-modal">
                <div className="col-md-12 d-flex">
                  <div className="product-detail col-md-4">
                    <h6>Product Price:</h6>
                    <input disabled value={"$" + selectedProduct?.prdPrice} />
                  </div>
                  <div className="product-detail col-md-4">
                    <h6>Available Quantity: </h6>
                    <input disabled value={selectedProduct?.prdQuantity} />
                  </div>
                </div>
                <div className="col-md-12 d-flex">
                  <div className="product-detail col-md-4">
                    <h6>Category: </h6>
                    <input disabled value={selectedProduct?.prdCategory} />
                  </div>
                  <div className="product-detail col-md-4">
                    <h6>Subcategory </h6>
                    <input disabled value={selectedProduct?.prdSubCategory} />
                  </div>
                </div>
                <div className="col-md-12 d-flex">
                  <div className="product-detail col-md-12">
                    <h6>Short Description: </h6>
                    <input
                      style={{ width: "87%" }}
                      disabled
                      value={selectedProduct?.prdShortDesc}
                    />
                  </div>
                </div>
                <div className="col-md-12 d-flex">
                  <div className="product-detail">
                    <h6>Description: </h6>
                    <pre style={{ width: "100%", height: "auto" }}>
                      {selectedProduct?.prdDesc}
                    </pre>
                  </div>
                </div>
                <div className="col-md-12 d-flex">
                  <div className="product-detail">
                    <h6>Direction: </h6>
                    <pre style={{ width: "100%", height: "auto" }}>
                      {selectedProduct?.prdDirection}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDetail}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal size="lg" show={showEdit} onHide={handleCloseEdit}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedProduct && (
              <Form onSubmit={handleEditUser}>
                <div className="detail-modal-container">
                  <div className="detail-modal">
                    <div className="col-md-12 d-flex">
                      <div className="product-detail col-md-12">
                        <h6>Product Name: </h6>
                        <input
                          type="text"
                          value={selectedProduct.prdName}
                          onChange={(e) =>
                            setSelectedProduct({
                              ...selectedProduct,
                              prdName: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="col-md-12 d-flex">
                      <div className="product-detail col-md-4">
                        <h6>Product Price:</h6>
                        <input
                          type="text"
                          value={selectedProduct.prdPrice}
                          onChange={(e) =>
                            setSelectedProduct({
                              ...selectedProduct,
                              prdPrice: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="product-detail col-md-4">
                        <h6>Available Quantity: </h6>
                        <input
                          type="text"
                          value={selectedProduct.prdQuantity}
                          onChange={(e) =>
                            setSelectedProduct({
                              ...selectedProduct,
                              prdQuantity: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="col-md-12 d-flex">
                      <div className="product-detail col-md-4">
                        <h6>Category: </h6>
                        <select
                          className="form-select-edit"
                          name="prdCategory"
                          value={selectedProduct.prdCategory}
                          onChange={(e) =>
                            setSelectedProduct({
                              ...selectedProduct,
                              prdCategory: e.target.value,
                            })
                          }
                        >
                          <option>Choose category</option>
                          <option value="Dog">Dog</option>
                          <option value="Cat">Cat</option>
                        </select>
                      </div>
                      <div className="product-detail col-md-4">
                        <h6>Subcategory </h6>
                        <select
                          className="form-select-edit"
                          value={selectedProduct.prdSubCategory}
                          onChange={(e) =>
                            setSelectedProduct({
                              ...selectedProduct,
                              prdSubCategory: e.target.value,
                            })
                          }
                        >
                          <option>Choose subcategory</option>
                          <option value="Vaccine">Vaccine</option>
                          <option value="Medicine">Medicine</option>
                          <option value="Food">Food</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-12 d-flex">
                      <div className="product-detail" style={{ width: "100%" }}>
                        <h6>Short Description: </h6>
                        <textarea
                          style={{ width: "100%" }}
                          type="text"
                          rows="2"
                          value={selectedProduct.prdShortDesc}
                          onChange={(e) =>
                            setSelectedProduct({
                              ...selectedProduct,
                              prdShortDesc: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="col-md-12 d-flex">
                      <div className="product-detail" style={{ width: "100%" }}>
                        <h6>Description: </h6>
                        <textarea
                          style={{ width: "100%", height: "auto" }}
                          type="text"
                          rows="4"
                          value={selectedProduct.prdDesc}
                          onChange={(e) =>
                            setSelectedProduct({
                              ...selectedProduct,
                              prdDesc: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="col-md-12 d-flex">
                      <div className="product-detail" style={{ width: "100%" }}>
                        <h6>Direction: </h6>
                        <textarea
                          style={{ width: "100%", height: "auto" }}
                          type="text"
                          rows="4"
                          value={selectedProduct.prdDirection}
                          onChange={(e) =>
                            setSelectedProduct({
                              ...selectedProduct,
                              prdDirection: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="col-md-12 d-flex">
                      <div className="product-detail" style={{ width: "100%" }}>
                        <label>Product URL:</label>
                        <input
                          style={{ width: "100%" }}
                          type="text"
                          value={selectedProduct.prdURL}
                          onChange={(e) =>
                            setSelectedProduct({
                              ...selectedProduct,
                              prdURL: e.target.value,
                            })
                          }
                        />
                        <input
                          style={{ width: "100%" }}
                          type="file"
                          accept="image/*"
                          name="photoURL"
                          onChange={(e) => handleURLChange(e)}
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div
                      className="form-group d-flex mt-3"
                      style={{ justifyContent: "flex-end", paddingRight: "6%" }}
                    >
                      <button
                        type="button"
                        className="btn_cancel text-white btn-rounded"
                        onClick={handleCloseEdit}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn_add text-white">
                        Update data
                      </button>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Modal.Body>
        </Modal>

        <Table striped bordered hover>
          <thead className="thead">
            <tr>
              <th>#</th>
              <th className="th-name">Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Category</th>
              <th>Subcategory</th>
              <th className="th-action">Actions</th>
            </tr>
          </thead>

          <tbody className="tbody">
            {currentData.map((product, index) => (
              <tr key={startIndex + index}>
                <td>{startIndex + index + 1}</td>
                <td>{product.prdName}</td>
                <td>${product.prdPrice}</td>
                <td>{product.prdQuantity}</td>
                <td>{product.prdCategory}</td>
                <td>{product.prdSubCategory}</td>
                <td className="action">
                  <span>
                    <i
                      className="ri-edit-2-line"
                      style={{ color: "#7bbb1a" }}
                      onClick={() => handleProductEdit(product)}
                    ></i>
                  </span>
                  <span>
                    <i
                      className="ri-eye-line"
                      onClick={() => handleProductSelect(product)}
                    ></i>
                  </span>
                  <span>
                    <i
                      className="ri-delete-bin-2-line"
                      style={{ color: "red" }}
                      onClick={() =>
                        handleDelete(product.prdId, product.prdURL)
                      }
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
