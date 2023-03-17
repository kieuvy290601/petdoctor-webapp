import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { useDispatch } from "react-redux";
import { cartActions } from "../../redux/slices/cartSlice";

import "../../styles/Product-card.css";

const ProductCard = ({ item, searchInput,  }) => {
  
  const { prdName } = item;

  const isMatch = prdName.toLowerCase().includes(searchInput.toLowerCase());

  
  if (!searchInput || isMatch) {
    return (
      // <Col lg="3" md="4">
      <div className="product_item" style={{ width: "250px" }}>
        <div className="product_img">
          <motion.img whileHover={{ scale: 0.9 }} src={item.prdURL} alt="" />
        </div>
        <div className="p-2 product-info">
          <h3 className="product_name">
            <Link to={`/dogcare/${item.id}`}>{item.prdName}</Link>
          </h3>
          <span>{item.prdCategory}</span>
        </div>
        <div
          className="product_card-bottom d-flex align-items-center 
        justify-content-between p-2"
        >
          <span className="price">${item.prdPrice}</span>
          <motion.span whileTap={{ scale: 1.2 }}>
            <i class="ri-add-line"></i>
          </motion.span>
        </div>
      </div>
      // </Col>
    );
  } else {
    
  }
};

export default ProductCard;
