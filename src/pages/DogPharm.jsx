import "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import ProductCard from "../components/UI/ProductCard";
import { db } from "../firebase.config";
import "../styles/Medi-care.css";

const DogPharm = () => {
  const [selectedOption, setSelectedOption] = useState("all");
  const [filteredData, setFilteredData] = useState([]);
  const [searchInput, setSearchInput] = useState("");

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
      console.log(data);

      setFilteredData(data);
    };

    fetchData();
  }, [selectedOption]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // const [selectedOption, setSelectedOption] = useState("all");
  // const [filteredData, setFilteredData] = useState([]);
  // const [searchTerm, setSearchTerm] = useState("");

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const q = query(
  //       collection(db, "products"),
  //       selectedOption === "all"
  //         ? null
  //         : where("prdCategory", "==", selectedOption)
  //     );

  //     const querySnapshot = await getDocs(q);

  //     const data = querySnapshot.docs.map((doc) => doc.data());

  //     if (searchTerm.trim() !== "") {
  //       const filtered = data.filter(
  //         (item) =>
  //           item.prdName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //           item.prdCategory.toLowerCase().includes(searchTerm.toLowerCase())
  //       );
  //       setFilteredData(filtered);
  //     } else {
  //       setFilteredData(data);
  //     }
  //   };

  //   fetchData();
  // }, [selectedOption, searchTerm]);

  // const handleOptionChange = (event) => {
  //   setSelectedOption(event.target.value);
  // };

  return (
    <section className="all_products">
      <Container>
        <Row>
          <div class="img"></div>
          <div className=" d-flex align-items-baseline">
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
                      <select name="" id="">
                        <option>Sort By</option>
                        <option value="ascending">Ascending</option>
                        <option value="descending">Descending</option>
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
            {filteredData.length === 0 ?  (
              <h1>No products are found!</h1>
            ) : (
              filteredData.map((item) => (
                <ProductCard
                  key={item.id}
                  item={item}
                  searchInput={searchInput}
                />
              ))
            )}
          </div>
        </Row>
      </Container>
      <div></div>
    </section>
  );
};

export default DogPharm;
