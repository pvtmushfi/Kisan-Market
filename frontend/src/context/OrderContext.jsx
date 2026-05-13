import {
  createContext,
  useState,
  useEffect
} from "react";

export const OrderContext =
  createContext();

export function OrderProvider({
  children
}) {

  const [orders, setOrders] =
    useState([]);

  // Load Orders
  useEffect(() => {

    const savedOrders =
      JSON.parse(
        localStorage.getItem("orders")
      ) || [];

    setOrders(savedOrders);

  }, []);

  // Save Orders
  useEffect(() => {

    localStorage.setItem(
      "orders",
      JSON.stringify(orders)
    );

  }, [orders]);

  // Add Order
  const addOrder = (orderData) => {

    const newOrder = {
      ...orderData
    };

    setOrders((prev) => [
      ...prev,
      newOrder
    ]);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        addOrder
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}