import { collection, getDocs } from "firebase/firestore";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "reactstrap";
import { db } from "../firebase.config";
import { selectUserID } from "../redux/slices/authSlice";
import { selectOrderHistory, storeOrders } from "../redux/slices/orderSlice";
const OrderHistory = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrderHistory);
  const userId = useSelector(selectUserID);

  useEffect(() => {
    const fetchData = async () => {
      const orderList = collection(db, "orders");
      const querySnapshot = await getDocs(orderList);
      const data = querySnapshot.docs.map((doc) => ({
        orderId: doc.id,
        ...doc.data(),
      }));
      dispatch(storeOrders(data));
    };
    fetchData();
  }, []);

  return (
    <section className="mx-5">
      <div className="container">
        <h1 className="my-3">Order History</h1>

        {orders.length === 0 ? (
          <p>No order found</p>
        ) : (
          <Table striped bordered hover className="">
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
                const { id, orderDate, orderTime, orderAmount, orderStatus } =
                  order;
                return (
                  <tr key={id}>
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
                      >
                        Review
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
