import "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import ProductCard from "../components/UI/ProductCard";
import { db } from "../firebase.config";
import "../styles/Medi-care.css";

const Medicare = () => {
  const [selectedOption, setSelectedOption] = useState("all");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(
        collection(db, "products"),
        selectedOption === "all"
          ? null
          : where("prdCategory", "==", selectedOption)
      );

      const querySnapshot = await getDocs(q);

      const data = querySnapshot.docs.map((doc) => doc.data());

      setFilteredData(data);
    };

    fetchData();
  }, [selectedOption]);
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <section className="all_products">
      <Container>
        <Row>
          <div class="img"></div>
          <div className=" d-flex align-items-baseline">
            <section className="filter-box">
              <Container>
                <Row>
                  <Col lg="2" md="3">
                    <div className="filter">
                      <select>
                        <option>Choose Pet</option>
                        <option value="dog">Dog</option>
                        <option value="cat">Cat</option>
                      </select>
                    </div>
                  </Col>
                  <Col lg="2" md="3">
                    <div className="filter">
                      <select
                        value={selectedOption}
                        onChange={handleOptionChange}
                      >
                        <option>Category</option>
                        <option value="all">All</option>
                        <option value="Vaccine">Vaccine</option>
                        <option value="medicine">Medicine</option>
                        <option value="food">Food</option>
                      </select>
                    </div>
                  </Col>
                  <Col lg="2" md="3">
                    <div className="filter">
                      <select name="" id="">
                        <option>Sort By</option>
                        <option value="ascending">Ascending</option>
                        <option value="descending">Descending</option>
                      </select>
                    </div>
                  </Col>
                  <Col lg="5" md="6">
                    <div className="search_box">
                      <input
                        style={{ background: "none" }}
                        type="text"
                        placeholder="Search...."
                      />
                      <span>
                        <i class="ri-search-line"></i>
                      </span>
                    </div>
                  </Col>
                </Row>
              </Container>
            </section>
          </div>
          <Col lg="12" className="text-center">
            <h2 className="section_title">All Products</h2>
          </Col>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-evenly",
            }}
          >
            {filteredData.length === 0 ? (
              <h1>No products are found!</h1>
            ) : (
              filteredData.map((item) => (
                <ProductCard key={item.id} item={item} />
              ))
            )}
          </div>

          {/* {filteredData.map((data) => (
            <p key={data.id}>{data.title}</p>
          ))} */}

          {/* {setFilteredData.length === 0 ? (
            <h1>No product are found</h1>
          ) : (
            <ProductsList data={filteredData} />
          )}

          <ProductsList /> */}
        </Row>
      </Container>
      <div></div>
    </section>
  );
};

export default Medicare;
