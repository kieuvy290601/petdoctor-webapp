import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Container, Row } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { db } from "../firebase.config";
import { cartActions } from "../redux/slices/cartSlice";
import "../styles/ProductDetail.css";

const ProductDetail = () => {
  const [tab, setTab] = useState("overview");
  const { prdId } = useParams(); // retrieve prdId parameter from the URL
  const [item, setItem] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      const productRef = doc(db, "products", prdId);
      const productDoc = await getDoc(productRef);

      if (productDoc.exists()) {
        setItem(productDoc.data());

        const q = query(
          collection(db, "products"),
          where("prdCategory", "==", productDoc.data().prdCategory),
          where("__name__", "!=", prdId),
          limit(4)
        );

        const querySnapshot = await getDocs(q);
        const relatedProducts = [];
        querySnapshot.forEach((doc) => {
          relatedProducts.push({ prdId: doc.id, ...doc.data() });
        });
        setRelatedProducts(relatedProducts);
        console.log(relatedProducts);
      } else {
        console.log("Product not found");
      }
    };

    fetchProduct();
  }, [prdId]);

  if (!item) {
    return <div>Loading...</div>;
  }

  const addtoCart = () => {
    dispatch(
      cartActions.addItemtoCart({
        prdId: item.prdId,
        prdName: item.prdName,
        prdPrice: item.prdPrice,
        prdURL: item.prdURL,
        prdCategory: item.prdCategory,
      })
    );
    toast.success("Added to cart successfully");
    
  };

  return (
    <Helmet title={item.prdName}>
      <section className="pt-0" style={{ margin: "0px 90px" }}>
        <Container>
          <Row>
            <div className="col-lg-5 mt-5" style={{ background: "#e9ecef" }}>
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

                <motion.button whileTap={{ scale: 1.1 }} className="buy_btn" onClick={addtoCart}>
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
              <h4 className="review">Product Feedback</h4>
            </div>
            <div>
              <div class="row justify-content-left d-flex my-4 px-5">
                <div
                  class="col-md-3 d-flex flex-column"
                  style={{ paddingLeft: 40 }}
                >
                  <div class="rating-box">
                    <h1 class="pt-4">4.0</h1>
                  </div>
                  <div className="star">
                    <span class="ri-star-s-fill mx-1"></span>
                    <span class="ri-star-s-fill mx-1"></span>
                    <span class="ri-star-s-fill mx-1"></span>
                    <span class="ri-star-s-fill mx-1"></span>
                    <span class="ri-star-s-fill mx-1"></span>
                  </div>
                  <p>Product Rating</p>
                </div>
                <div class="col-md-9">
                  <div class="rating-bar0 pt-2">
                    <table class="text-left mx-auto">
                      <tr>
                        <td class="rating-bar">
                          <div class="bar-container">
                            <div class="bar-5"></div>
                          </div>
                        </td>
                        <td class="rating-label">
                          <span class="ri-star-s-fill mx-1"></span>
                          <span class="ri-star-s-fill mx-1"></span>
                          <span class="ri-star-s-fill mx-1"></span>
                          <span class="ri-star-s-fill mx-1"></span>
                          <span class="ri-star-s-fill mx-1"></span>
                        </td>
                        <td class="text-right">123</td>
                      </tr>
                      <tr>
                        <td class="rating-bar">
                          <div class="bar-container">
                            <div class="bar-4"></div>
                          </div>
                        </td>
                        <td class="rating-label">
                          <span class="ri-star-s-fill mx-1"></span>
                          <span class="ri-star-s-fill mx-1"></span>
                          <span class="ri-star-s-fill mx-1"></span>
                          <span class="ri-star-s-fill mx-1"></span>
                          <span class="ri-star-s-line mx-1"></span>
                        </td>
                        <td class="text-right">23</td>
                      </tr>
                      <tr>
                        <td class="rating-bar">
                          <div class="bar-container">
                            <div class="bar-3"></div>
                          </div>
                        </td>
                        <td class="rating-label">
                          <span class="ri-star-s-fill mx-1"></span>
                          <span class="ri-star-s-fill mx-1"></span>
                          <span class="ri-star-s-fill mx-1"></span>
                          <span class="ri-star-s-line mx-1"></span>
                          <span class="ri-star-s-line mx-1"></span>
                        </td>
                        <td class="text-right">10</td>
                      </tr>
                      <tr>
                        <td class="rating-bar">
                          <div class="bar-container">
                            <div class="bar-2"></div>
                          </div>
                        </td>
                        <td class="rating-label">
                          <span class="ri-star-s-fill mx-1"></span>
                          <span class="ri-star-s-fill mx-1"></span>
                          <span class="ri-star-s-line mx-1"></span>
                          <span class="ri-star-s-line mx-1"></span>
                          <span class="ri-star-s-line mx-1"></span>
                        </td>
                        <td class="text-right">3</td>
                      </tr>
                      <tr>
                        <td class="rating-bar">
                          <div class="bar-container">
                            <div class="bar-1"></div>
                          </div>
                        </td>
                        <td class="rating-label">
                          <span class="ri-star-s-line mx-1"></span>
                          <span class="ri-star-s-line mx-1"></span>
                          <span class="ri-star-s-line mx-1"></span>
                          <span class="ri-star-s-line mx-1"></span>
                          <span class="ri-star-s-line mx-1"></span>
                        </td>
                        <td class="text-right">0</td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ backgroundColor: "#e9ecef", padding: 30 }}>
              <div>
                <h4 className="review">Reviews</h4>
              </div>
              <div class="mb-3 mt-3">
                <label for="comment">Comments:</label>
                <textarea
                  class="form-control"
                  rows="3"
                  id="comment"
                  name="text"
                ></textarea>
              </div>
              <button type="submit" class="btn btn-primary">
                Submit
              </button>
            </div>

            {/* Render the related products */}
            {relatedProducts.length > 0 && (
              <div className="col-lg-12 my-3 mt-5">
                <h4 className="related mb-5">Related Products</h4>
                <div className="row" style={{ justifyContent: "space-evenly" }}>
                  {relatedProducts.map((product) => (
                    <div
                      className="product_item mb-5"
                      style={{
                        width: "256px",
                        padding: 0,
                      }}
                    >
                      <div
                        className="product_img"
                        style={{ backgroundColor: "#e9ecef" }}
                      >
                        <motion.img
                          whileHover={{ scale: 0.9 }}
                          src={product.prdURL}
                          alt=""
                        />
                      </div>
                      <div>
                        <div className="p-2 product-info">
                          <h3 className="product_name">
                            {/* <Link to={
                `/productdetail/${item.prdId}`
              
              
              }>{item.prdName}</Link>{" "} */}
                            <Link
                              to={`/productdetail/${product.prdId}`}
                              state={{ item }}
                              onClick={() => window.scrollTo(0, 0)}
                            >
                              {product.prdName}
                            </Link>
                          </h3>
                          <span>{product.prdCategory}</span>
                        </div>
                        <div className="product_card-bottom">
                          <span className="price">${product.prdPrice}</span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={addtoCart}
                          >
                            <i class="ri-add-line"></i>
                          </motion.span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default ProductDetail;
