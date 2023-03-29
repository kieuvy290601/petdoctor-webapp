import { doc, getDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { db } from "../firebase.config";

import "../styles/ProductDetail.css";

const ProductDetail = () => {
  const [tab, setTab] = useState("overview");

  const { prdId } = useParams(); // retrieve prdId parameter from the URL
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const productRef = doc(db, "products", prdId);
      const productDoc = await getDoc(productRef);

      if (productDoc.exists()) {
        setItem(productDoc.data());
      } else {
        console.log("Product not found");
      }
    };

    fetchProduct();
  }, [prdId]);

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <Helmet title={item.prdName}>
      <section className="pt-0" style={{ margin: "0px 90px" }}>
        <Container>
          <Row>
            <div className="col-lg-5 mt-5" style={{ background: "#dbe5ef" }}>
              <img
                src={item.prdURL}
                alt=""
                style={{ width: "85%", marginLeft: 30 }}
              />
            </div>
            <div className="col-lg-7">
              <div className="product_details">
                <h2>{item.prdName}</h2>
                <div className="rating">
                  <div>
                    <span>
                      <i class="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i class="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i class="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i class="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i class="ri-star-half-s-fill"></i>
                    </span>
                  </div>
                  <p>4.5 rating</p>
                </div>
                <p>
                  <span className="prd_price"> &#36;{item.prdPrice}</span>
                </p>
                <p className="desc">
                  Description:&nbsp; <span>{item.prdDesc}</span>
                </p>
                <div
                  className="d-flex align-items-center py-2"
                  style={{ width: 350 }}
                >
                  <p className="desc">Quantity:&nbsp;</p>

                  <div
                    className="col mx-4 "
                    style={{ border: "1px solid", paddingLeft: 4 }}
                  >
                    <a href="#">-</a>
                    <a href="#" className="quantity">
                      1
                    </a>
                    <a href="#">+</a>
                  </div>
                  <span
                    style={{
                      fontSize: 14,
                      paddingLeft: 5,
                      color: "GrayText",
                    }}
                  >
                    {item.prdQuantity} &nbsp;products available
                  </span>
                </div>

                <motion.button whileTap={{ scale: 1.1 }} className="buy_btn">
                  Add to cart
                </motion.button>
              </div>
            </div>
          </Row>
        </Container>
      </section>
      <section className="pt-2 pb-4">
        <Container>
          <Row>
            <div className="tab_wrapper d-flex align-items-center gap-5">
              <h6
                className={`${tab === "overview" ? "active_tab" : ""}`}
                onClick={() => setTab("overview")}
              >
                Overview
              </h6>
              <h6
                className={`${tab === "direction" ? "active_tab" : ""}`}
                onClick={() => setTab("direction")}
              >
                Direction
              </h6>
            </div>
            {tab === "overview" ? (
              <div className="tab_content">
                <p>{item.prdDesc}</p>
              </div>
            ) : (
              <div className="tab_content">
                <p>{item.prdName}</p>
              </div>
            )}
          </Row>
        </Container>
      </section>
      <section className="pt-2">
        <Container>
          <Row>
            <div className="col-lg-12">
              <h4 className="review">Product Reviews</h4>
            </div>
            <div>
              
            </div>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default ProductDetail;
