import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

// Helper function to get a tab-specific key for our user data
const getUserStorageKey = () => {
  // 1. Try to get a unique ID for this tab from sessionStorage.
  let tabId = sessionStorage.getItem("tabId");

  // 2. If it doesn't exist, generate a new one and save it.
  //    crypto.randomUUID() is a modern, standard way to get a unique string.
  if (!tabId) {
    tabId = crypto.randomUUID();
    sessionStorage.setItem("tabId", tabId);
  }

  // 3. Return a key that is unique to this tab.
  return `user_data_for_tab_${tabId}`;
};

export const UserProvider = ({ children }) => {
  // Get the unique storage key for this specific tab.
  const storageKey = getUserStorageKey();

  const [user, setUser] = useState(() => {
    // On initial load, read the user data from sessionStorage
    // using our tab-specific key.
    const storedUser = sessionStorage.getItem(storageKey);
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // This useEffect now only cares about changes happening IN THIS TAB.
  useEffect(() => {
    // When the user state changes, update sessionStorage for this tab.
    if (user) {
      sessionStorage.setItem(storageKey, JSON.stringify(user));
    } else {
      // If user logs out, remove their specific data.
      sessionStorage.removeItem(storageKey);
    }
  }, [user, storageKey]);

  // CRITICAL: We have removed the `window.addEventListener("storage")`.
  // This is what prevents tabs from syncing with each other.

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
