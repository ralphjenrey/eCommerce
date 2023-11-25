// Orders.jsx
import React, { useState, useEffect } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";


const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const db = getFirestore();
        const ordersCollection = collection(db, "orders");
        const ordersSnapshot = await getDocs(ordersCollection);

        const ordersData = ordersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error.message);
      }
    };

    fetchOrders();
  }, []);

  console.log(orders);
    return (
    <div className="text-white">
      <h1 className="text-white">Orders</h1>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <strong className="text-white">Order ID:</strong> {order.id} <br />
            <strong className="text-white">Total:</strong> ₱ {order.total} <br />
            <strong className="text-white">Timestamp:</strong>{" "}
            {order.timestamp && order.timestamp.toDate().toString()} <br />
            <strong className="text-white">Items:</strong>
            <ul>
            {order.items && order.items.map((item) => (
                <li key={item.id}>
                  <div className="flex items-center">
                    <img

                      src={item.img}
                      alt={item.name}
                      className="h-20 w-20 mr-2 rounded-full"
                    />
                    <span className="text-white">
                      {item.name} - ₱ {item.price} - Quantity: {item.qty}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <hr className="border-t border-white my-4" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
