// src/context/useDashboardSection.js
import { createContext, useContext, useState } from "react";

const DashboardSectionContext = createContext();

export const DashboardSectionProvider = ({ children }) => {
  const [activeSection, setActiveSection] = useState(null); // null = show all

  return (
    <DashboardSectionContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </DashboardSectionContext.Provider>
  );
};

export const useDashboardSection = () => useContext(DashboardSectionContext);
