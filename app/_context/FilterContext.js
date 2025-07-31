"use client";
const { createContext, useState, useContext, useCallback } = require("react");

const FilterContext = createContext();

export function FilterProvider({ children }) {
  const [filters, setFilters] = useState({
    category: null, // only one selected at a time
  });

  const selectCategory = useCallback((cat) => {
    setFilters((prev) => ({
      ...prev,
      category: prev.category === cat ? null : cat, // deselect if same clicked
    }));
  }, []);

  return (
    <FilterContext.Provider value={{ filters, selectCategory }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
}
