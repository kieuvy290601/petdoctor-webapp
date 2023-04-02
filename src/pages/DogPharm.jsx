import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import ProductCard from "../components/UI/ProductCard";

import "firebase/auth";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "../firebase.config";

import notfound from "../assets/images/nofound.png";
import "../styles/Medi-care.css";

const DogPharm = () => {
  const [selectedOption, setSelectedOption] = useState("all");
  const [filteredData, setFilteredData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [sortOption, setSortOption] = useState({
    field: "prdName",
    value: "desc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);


  useEffect(() => {
  
    const fetchData = async () => {
      const prdList = collection(db, "products")
      const q = query(
        prdList,
        where("prdPet", "==", "Dog"),
        selectedOption === "all"
          ? where("prdPet", "==", "Dog")
          : where("prdCategory", "==", selectedOption),
        // orderBy(sortOption.field, sortOption.value)
      );

      const querySnapshot = await getDocs(q);
      const totalCount = querySnapshot.size;
      
      const data = querySnapshot.docs.map((doc) => ({ prdId: doc.id, ...doc.data() }));

      // setListPrd(listPrd)
      setTotalProducts(totalCount);
      setFilteredData(data);
    };

    fetchData();
  }, [selectedOption, sortOption]);

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

  const handleSortOptionChange = (event) => {
    var orderByOption = event.target.value;
    console.log("sort option changed: " + orderByOption);

    if (orderByOption === "") {
      setSortOption({ field: "prdName", value: "asc" });
    } else {
      setSortOption({
        field: "prdPrice",
        value: sortOption.value === "asc" ? "desc" : "asc",
      });
    }
  };

  return (
    <section className="all_products">
      <Container>
        <Row>
          <div class="img"></div>
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
                  <Col lg="2" md="3">
                    <div className="filter">
                      <select name="" id="" onChange={handleSortOptionChange}>
                        <option value="">Sort By</option>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                      </select>
                    </div>
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
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span style={{ margin: "0 10px" }}>Page {currentPage}</span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={indexOfLastProduct >= totalProducts}
            >
              Next
            </button>
          </div>
        </Row>
      </Container>
      <div></div>
    </section>
  );
};

export default DogPharm;
