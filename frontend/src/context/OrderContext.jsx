import { createContext, useState } from "react";

export const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);

  // ADD ORDER
  const addOrder = (order) => {
    setOrders((prev) => [...prev, order]);
  };

  // UPDATE ORDER STATUS (farmer uses this)
  const updateOrderStatus = (orderId, status) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId ? { ...o, status } : o
      )
    );
  };

  return (
    <OrderContext.Provider
      value={{ orders, addOrder, updateOrderStatus }}
    >
      {children}
    </OrderContext.Provider>
  );
}