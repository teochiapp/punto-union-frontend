import React, { createContext, useContext, useState, useEffect } from 'react';

const CarritoContext = createContext();

export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error('useCarrito debe ser usado dentro de un CarritoProvider');
  }
  return context;
};

export const CarritoProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    const savedCart = localStorage.getItem('carrito');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(items));
  }, [items]);

  const addItem = (producto) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === producto.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === producto.id
            ? { ...item, quantity: item.quantity + (producto.quantity || 1) }
            : item
        );
      }
      
      return [...prevItems, { ...producto, quantity: producto.quantity || 1 }];
    });
  };

  const removeItem = (productoId) => {
    setItems(prevItems => prevItems.filter(item => item.id !== productoId));
  };

  const updateQuantity = (productoId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(productoId);
      return;
    }
    
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === productoId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (parseFloat(item.precio) * item.quantity), 0);

  const value = {
    items,
    totalItems,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    clearCart
  };

  return (
    <CarritoContext.Provider value={value}>
      {children}
    </CarritoContext.Provider>
  );
};
