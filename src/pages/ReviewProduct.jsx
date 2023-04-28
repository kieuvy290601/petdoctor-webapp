import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import StarsRating from "react-star-rate";
import { db } from "../firebase.config";

const ReviewProduct = () => {
  const { prdId } = useParams();
  const [product, setProduct] = useState(null);
  const [review, setProductReview] = useState("");
  const [rate, setRate] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      const productRef = doc(db, "products", prdId);
      const docSnapshot = await getDoc(productRef);
      if (docSnapshot.exists()) {
        setProduct(docSnapshot.data());
      }
    };

    fetchProduct();
  }, [prdId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <section className="mx-4">
      <div className="container">
        <h2 className="text-center">Review product</h2>
        <br />
        <div
          className="card mb-2 col-md-6"
          key={prdId}
          style={{
            border: "1px solid var(--primary-color)",
            padding: 10,
            margin: "auto",
          }}
        >
          <div className="d-flex">
            <img
              src={product.prdURL}
              alt=""
              style={{ width: "14%", margin: "5%" }}
            />

            <div className="mt-5">
              <Link to={`/productdetail/${prdId}`}>
                <h6 style={{ fontWeight: "bold" }}>{product.prdName}</h6>
              </Link>
              <p>
                <b>Short Desc: </b>
                {product.prdShortDesc}
              </p>
            </div>
          </div>

          <div>
            <form>
              <label style={{ paddingLeft: "8%", margin: "15px 0px" }}>
                Rating
              </label>
              <br />

              <div style={{ paddingLeft: "8%" }}>
                <StarsRating
                  value={rate}
                  onChange={(rate) => {
                    setRate(rate);
                  }}
                />
              </div>
              <br />
              <label style={{ paddingLeft: "8%" }}>Review</label>
              <br />
              <div style={{ paddingLeft: "8%", paddingTop: "3%" }}>
                <textarea
                  value={review}
                  required
                  onChange={(e) => setProductReview(e.target.value)}
                  rows="5"
                  cols="50"
                  style={{
                    backgroundColor: " #e1e1e1",
                    borderRadius: 10,
                    border: "none",
                    padding: "20px",
                  }}
                ></textarea>
              </div>
              <br />
              <button
                style={{
                  padding: "10px 18px",
                  backgroundColor: "var(--primary-color)",
                  color: "white",
                  width: "85%",
                  marginLeft: "8%",
                }}
                type="submit"
                className="--btn mb-2"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewProduct;
