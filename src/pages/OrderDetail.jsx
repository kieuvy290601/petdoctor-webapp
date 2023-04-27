import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Table } from "reactstrap";
import { db } from "../firebase.config";

const OrderDetail = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const orderRef = doc(db, "orders", orderId);
      const docSnapshot = await getDoc(orderRef);
      if (docSnapshot.exists()) {
        setOrder(docSnapshot.data());
      }
    };

    fetchOrder();
  }, [orderId]);

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <section className="mx-4">
      <div className="container">
        <h1>Order Detail</h1>
        <div>
          <Link to="/orderhistory">&larr; Back To Orders</Link>
        </div>
        <br />

        <p>
          <b>Order Amount: </b> ${order.orderAmount}
        </p>
        <p>
          <b>Shipping Fee: </b> ${order.shippingFee}
        </p>
        <p>
          <b>Order Status:</b> {order.orderStatus}
        </p>
        <br />
        <Table striped bordered hover>
          <thead className="thead">
            {" "}
            <tr>
              <th>#</th>
              <th>Product Info</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {order.cartItems.map((item, index) => (
              <tr key={item.id}>
                <td style={{ paddingLeft: 30 }}>{index + 1}</td>
                <td style={{ paddingLeft: 30 }}>
                  <div className="d-flex">
                    <img
                      src={item.prdURL}
                      alt={item.prdName}
                      style={{ width: "100px", marginRight: 10 }}
                    />
                    <div className="mt-2">
                      <Link to={`/productdetail/${item.prdId}`}>
                        <h6 style={{ fontWeight: "bold" }}>{item.prdName}</h6>
                      </Link>
                      <p>Quantity: {item.quantity}</p>
                      <p>Unit price: ${item.prdPrice}</p>
                      <p>Set price: ${item.totalPrice}</p>
                    </div>
                  </div>
                </td>

                <td style={{ paddingLeft: 30 }}>
                  <Link to={`/review-product/${item.prdId}`}>
                    <button
                      style={{
                        padding: "8px 12px",
                        border: "none",
                        borderRadius: 10,
                        backgroundColor: "#1b385e",
                        color: "white",
                      }}
                    >
                      Review Product
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </section>
  );
};

export default OrderDetail;
