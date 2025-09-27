import React, { createContext, useContext, useEffect, useState } from "react";
import { load, save } from "../utils/storage";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => load("cart", []));
  const [isOpen, setIsOpen] = useState(false);
  const [orders, setOrders] = useState(() => load("orders", []));
  const [favorites, setFavorites] = useState(() => load("favorites", []));

  useEffect(() => save("cart", items), [items]);
  useEffect(() => save("orders", orders), [orders]);
  useEffect(() => save("favorites", favorites), [favorites]);

  function add(item, qty = 1) {
    setItems((prev) => {
      const found = prev.find((i) => i.id === item.id);
      if (found) {
        return prev.map((i) => i.id === item.id ? { ...i, qty: i.qty + qty } : i);
      }
      return [...prev, { ...item, qty }];
    });
    setIsOpen(true);
  }

  function remove(id) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function updateQty(id, qty) {
    setItems((prev) => prev.map(i => i.id === id ? { ...i, qty } : i));
  }

  function clearCart() {
    setItems([]);
  }

  function toggleFavorite(id) {
    setFavorites((prev) => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev, id]);
  }

  function placeOrder(details) {
    const order = {
      id: "o" + Date.now(),
      date: new Date().toISOString(),
      items,
      total: items.reduce((s,i)=>s + i.price * i.qty,0),
      details
    };
    setOrders(prev => [order, ...prev]);
    clearCart();
    setIsOpen(false);
    return order;
  }

  return (
    <CartContext.Provider value={{
      items, add, remove, updateQty, clearCart,
      isOpen, setIsOpen,
      placeOrder, orders, favorites, toggleFavorite
    }}>
      {children}
    </CartContext.Provider>
  );
}
