import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import ProductCard from "../components/UI/ProductCard";

import "firebase/auth";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase.config";

import notfound from "../assets/images/nofound.png";
import "../styles/Medi-care.css";

const DogPharm = () => {
  const [selectedOption, setSelectedOption] = useState("all");
  const [filteredData, setFilteredData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const prdList = collection(db, "products");
      let q = query(prdList, where("prdPet", "==", "Dog"));

      if (selectedOption !== "all") {
        q = query(q, where("prdCategory", "==", selectedOption));
      }

      if (sortOrder === "asc") {
        q = query(q, orderBy("prdPrice"));
      } else {
        q = query(q, orderBy("prdPrice", "desc"));
      }

      const querySnapshot = await getDocs(q);
      const totalCount = querySnapshot.size;

      const data = querySnapshot.docs.map((doc) => ({
        prdId: doc.id,
        ...doc.data(),
      }));

      // setListPrd(listPrd)
      setTotalProducts(totalCount);
      setFilteredData(data);
    };

    fetchData();
  }, [selectedOption, sortOrder]);

  const productsPerPage = 8;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredData.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSortOrderChange = () => {
    // Step 2
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <section className="all_products">
      <Container>
        <Row>
          <div class="banner1"></div>
          <div className=" d-flex align-items-baseline mb-4">
            <section className="filter-box">
              <Container>
                <Row>
                  <Col lg="12 text-center">
                    <h2 className="section_title">All Products</h2>
                  </Col>
                  <Col lg="8" md="6">
                    <div className="search_box">
                      <input
                        className="search-prd"
                        style={{ background: "none", paddingBottom: 10 }}
                        type="text"
                        placeholder="Search...."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                      />
                      <span>
                        <i class="ri-search-line"></i>
                      </span>
                    </div>
                  </Col>
                  <Col lg="2" md="3">
                    <div className="filter">
                      <select
                        value={selectedOption}
                        onChange={handleOptionChange}
                      >
                        <option value="all">All Category</option>
                        <option value="Vaccine">Vaccine</option>
                        <option value="Medicine">Medicine</option>
                        <option value="Food">Food</option>
                      </select>
                    </div>
                  </Col>
                  <Col className="sort" lg="2" md="3">
                    <button value="asc" onClick={handleSortOrderChange}>
                      <i class="ri-sort-asc"></i>
                    </button>
                    <button value="desc" onClick={handleSortOrderChange}>
                      <i class="ri-sort-desc"></i>
                    </button>
                  </Col>
                </Row>
              </Container>
            </section>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-evenly",
            }}
          >
            {currentProducts.length === 0 ? (
              <div>
                <img
                  style={{ width: 90, marginLeft: 90 }}
                  src={notfound}
                  alt=""
                />
                <h4>No products are found!</h4>
              </div>
            ) : (
              currentProducts.map((item) => (
                <ProductCard
                  key={item.id}
                  item={item}
                  searchInput={searchInput}
                  prdId={item.prdId}
                />
              ))
            )}
          </div>
          <div
            className="pagination"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <button
              onClick={() => {
                setCurrentPage(currentPage - 1);
                window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to top
              }}
              disabled={currentPage === 1}
            >
              <i className="ri-arrow-left-s-line"></i>
            </button>
            <span className="page" style={{ margin: "0px 12px" }}>
              {currentPage}
            </span>
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to top
                setCurrentPage(currentPage + 1);
              }}
              disabled={indexOfLastProduct >= totalProducts}
            >
              <i className="ri-arrow-right-s-line"></i>
            </button>
          </div>
        </Row>
      </Container>
      <div></div>
    </section>
  );
};

export default DogPharm;
