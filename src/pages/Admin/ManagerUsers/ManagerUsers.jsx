import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Col, Form } from "reactstrap";
import { db, storage } from "../../../firebase.config";

const PAGE_SIZE = 10;

const ManagerUsers = () => {
  // TODO: Set show modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  //Implement pagination

  const totalPages = Math.ceil(users.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const currentData = users.slice(startIndex, endIndex);

  const initialState = {
    displayName: "",
    email: "",
    photoURL: "",
  };

  const [user, setNewUser] = useState({
    ...initialState,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...user, [name]: value });
  };

  const handleURLChange = (e) => {
    const photoURL = e.target.files[0];

    const storageRef = ref(storage, `images/${photoURL.name}`);
    const uploadTask = uploadBytesResumable(storageRef, photoURL);

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
          setNewUser({ ...user, photoURL: downloadURL });
          toast.success("Image uploaded successfully.");
        });
      }
    );
  };

  const navigate = useNavigate();

  const addUser = async (e) => {
    let role = "user";
    e.preventDefault();
    if (!user.displayName || !user.email || !user.photoURL) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const dataRef = addDoc(collection(db, "users"), {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        role: role,
        createAt: Timestamp.now().toDate(),
      });

      // Fetch updated list of users from Firestore and update state
      const querySnapshot = await getDocs(
        query(collection(db, "users"), orderBy("createAt", "desc"))
      );
      const data = querySnapshot.docs
        .filter((doc) => doc.data().role !== "admin")
        .map((doc) => ({
          uid: doc.id,
          ...doc.data(),
        }));
      setUsers(data);

      setNewUser({ ...initialState });
      handleClose();
      toast.success("User added successfully.");
      navigate("/admin/users");
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      // Fetch data from Firestore and update the state
      const userList = collection(db, "users");
      let u = userList;

      if (searchTerm !== "") {
        u = query(
          userList,
          where("displayName", ">=", searchTerm),
          orderBy("displayName")
        );
        // Add the following line to also search for products whose prdName field includes the search term:
        u = query(
          userList,
          where("displayName", ">=", searchTerm),
          where("displayName", "<=", searchTerm + "\uf8ff"),
          orderBy("displayName")
        );
      } else {
        u = query(userList, orderBy("createAt", "desc"));
      }

      const querySnapshot = await getDocs(u);
      const data = querySnapshot.docs
        .filter((doc) => doc.data().role !== "admin")
        .map((doc) => ({
          uid: doc.id,
          ...doc.data(),
        }));
      setUsers(data);
      setSelectedUser(null);
    };
    fetchData();
  }, [searchTerm]);

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleDelete = async (uid, photoURL) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this user?"
      );
      if (!confirmed) {
        return;
      }
      // Delete product document from Firestore
      const deleteUser = doc(db, "users", uid);
      await deleteDoc(deleteUser);

      const imgRef = ref(storage, photoURL);
      await deleteObject(imgRef);

      // Fetch updated list of users from Firestore and update state
      const querySnapshot = await getDocs(
        query(collection(db, "users"), orderBy("createAt", "desc"))
      );
      const data = querySnapshot.docs
        .filter((doc) => doc.data().role !== "admin")
        .map((doc) => ({
          uid: doc.id,
          ...doc.data(),
        }));
      setUsers(data);

      toast.success("User deleted successfully.");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <section>
      <div>
        <h2 style={{ fontWeight: "bold", paddingLeft: 25 }}>All Product</h2>
      </div>
      <section className="px-3" style={{ padding: "35px" }}>
        <div className="col-md-12 search-container" style={{ height: 70 }}>
          <div
            className="col-md-6 add-product-container"
            style={{ marginRight: 0 }}
          >
            <Button className="deli" onClick={handleShow}>
              Add new user
            </Button>
            <Modal show={show} size="md" onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add new user</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p style={{ paddingLeft: 18 }}>* Indicates a required field</p>
                <div style={{ padding: 20 }}>
                  <Form onSubmit={addUser}>
                    <div className="col-md-12">
                      <label>Username *</label>
                      <input
                        type="text"
                        className="border"
                        placeholder="Enter username"
                        name="displayName"
                        value={user.displayName}
                        onChange={(e) => handleInputChange(e)}
                        required
                      />
                    </div>

                    <div className="row gx-3">
                      <div className="col-md-12">
                        <label>Email *</label>
                        <input
                          type="email"
                          className="border"
                          name="email"
                          value={user.email}
                          onChange={(e) => handleInputChange(e)}
                          placeholder="Example: abc-email@example.com"
                          required
                        />
                      </div>

                      <div className="col-md-12 pb-4">
                        <label className="mb-2">User Photo *</label>
                        <input
                          type="file"
                          accept="image/*"
                          name="photoURL"
                          onChange={(e) => handleURLChange(e)}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                    <div
                      className="form-group d-flex"
                      style={{ justifyContent: "flex-end" }}
                    >
                      <button
                        type="button"
                        onClick={handleClose}
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
          <Col md="6" className="justify-content-end d-flex">
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
              <th className="th-name">Username</th>
              <th className="th-name">Email</th>
              <th>Role</th>
              <th style={{ width: 200 }}>Photo URL</th>
              <th className="th-action">Actions</th>
            </tr>
          </thead>

          <tbody className="tbody">
            {currentData.map((user, index) => (
              <tr
                // key={startIndex + index}
                key={user.uid}
                onClick={() => setSelectedUser(user)}
              >
                <td>{startIndex + index + 1}</td>
                <td>{user.displayName}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <img src={user.photoURL} alt="" style={{ width: "35%" }} />
                </td>
                <td className="action">
                  <span>
                    <i
                      className="ri-delete-bin-2-line"
                      style={{ color: "red" }}
                      onClick={() => handleDelete(user.uid, user.photoURL)}
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

export default ManagerUsers;
