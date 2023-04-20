import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { useDispatch } from "react-redux";
import { cartActions } from "../../redux/slices/cartSlice";
import AfterLoggedIn from "../../route/AuthenRoute";

import "../../styles/Product-card.css";

const ProductCard = ({ item, searchInput, id }) => {
  const dispatch = useDispatch();

  const { prdName } = item;
  const isMatch = prdName.toLowerCase().includes(searchInput.toLowerCase());

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

  if (!searchInput || isMatch) {
    return (
      // <Col lg="3" md="4">
      <div className="product_item mb-5" style={{ width: "256px" }}>
        <div className="product_img">
          <motion.img whileHover={{ scale: 0.9 }} src={item.prdURL} alt="" />
        </div>
        <div>
          <div className="p-2 product-info">
            <h3 className="product_name">
              {/* <Link to={
                `/productdetail/${item.prdId}`
              
              
              }>{item.prdName}</Link>{" "} */}
              <Link to={`/productdetail/${item.prdId}`} state={{ item }}>
                {item.prdName}
              </Link>
            </h3>
            <span>{item.prdCategory}</span>
          </div>
          <div className="product_card-bottom">
            <span className="price">${item.prdPrice}</span>
            <AfterLoggedIn>
              <motion.span whileTap={{ scale: 1.2 }} onClick={addtoCart}>
                <i class="ri-add-line"></i>
              </motion.span>
            </AfterLoggedIn>
          </div>
        </div>
      </div>
      // </Col>
    );
  } else {
  }
};

export default ProductCard;
