import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Table } from "reactstrap";
import { db } from "../firebase.config";
import { selectUserID } from "../redux/slices/authSlice";
import { selectOrderHistory, storeOrders } from "../redux/slices/orderSlice";
const OrderHistory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orders = useSelector(selectOrderHistory);
  const userId = useSelector(selectUserID);

  useEffect(() => {
    const fetchData = async () => {
      const orderList = collection(db, "orders");
      const ordersQuery = query(orderList, where("userID", "==", userId));
      const querySnapshot = await getDocs(ordersQuery);
      const data = querySnapshot.docs.map((doc) => ({
        orderId: doc.id,
        ...doc.data(),
      }));
      dispatch(storeOrders(data));
    };
    fetchData();
  }, []);

  const handleReview = (orderId) => {
    navigate(`/orderdetail/${orderId} `);
  };

  return (
    <section className="mx-5">
      <div className="container">
        <h1 className="my-3">Order History</h1>

        {orders.length === 0 ? (
          <p>No order found</p>
        ) : (
          <Table striped bordered hover>
            <thead className="thead">
              <tr>
                <th>#</th>
                <th className="th-name">Date</th>
                <th className="th-name">Order ID</th>
                <th>Order Amount</th>
                <th>Order Status</th>
                <th>Review</th>
              </tr>
            </thead>
            <tbody className="tbody">
              {orders.map((order, index) => {
                const {
                  orderId,
                  orderDate,
                  orderTime,
                  orderAmount,
                  orderStatus,
                } = order;
                return (
                  <tr key={orderId}>
                    <td>{index + 1}</td>
                    <td>
                      {orderDate} at {orderTime}
                    </td>
                    <td>{order.orderId}</td>
                    <td>
                      {"$"}
                      {orderAmount}
                    </td>
                    <td>
                      <p className={orderStatus !== "Delivered"}>
                        {orderStatus}
                      </p>
                    </td>
                    <td>
                      <button
                        style={{
                          padding: "8px 10px",
                          borderRadius: 10,
                          backgroundColor: "#1b385e",
                          color: "white",
                          border: "none",
                        }}
                        onClick={() => handleReview(orderId)}
                      >
                        View Detail
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </div>
    </section>
  );
};

export default OrderHistory;
