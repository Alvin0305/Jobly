import { createContext, useContext, useEffect, useState } from "react";

export const TabContext = createContext(null);

export const TabProvider = ({ children }) => {
  const [tab, setTab] = useState(() => {
    const storedTab = sessionStorage.getItem("tab");
    return storedTab ? JSON.parse(storedTab) : null;
  });

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "tab") {
        const newTab = event.newValue ? JSON.parse(event.newValue) : null;
        setTab(newTab);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    if (tab) {
      sessionStorage.setItem("tab", JSON.stringify(tab));
    } else {
      sessionStorage.removeItem("tab");
    }
  }, [tab]);

  return (
    <TabContext.Provider value={{ tab, setTab }}>
      {children}
    </TabContext.Provider>
  );
};

export const useTab = () => useContext(TabContext);
