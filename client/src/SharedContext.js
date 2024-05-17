import React, { createContext, useContext, useState } from "react";

const MarkerStateContext = createContext();

export const useSharedState = () => {
  return useContext(MarkerStateContext);
};

export const SharedStateProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  return (
    <MarkerStateContext.Provider
      value={{
        cartItems,
        setCartItems,
      }}
    >
      {children}
    </MarkerStateContext.Provider>
  );
};
