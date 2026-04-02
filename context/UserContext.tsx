"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  name: string;
  email: string;
  role: string;
}

interface UserContextType {
  user: User;
  setUser: (user: User) => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<User>({ name: "", email: "", role: "" });
  const [isLoading, setIsLoading] = useState(true);

  // Sync with LocalStorage on Load
  useEffect(() => {
    const savedName = localStorage.getItem("userName") || "";
    const savedEmail = localStorage.getItem("userEmail") || "";
    const savedRole = localStorage.getItem("userRole") || "";
    
    setUserState({ name: savedName, email: savedEmail, role: savedRole });
    setIsLoading(false);
  }, []);

  const setUser = (newUser: User) => {
    setUserState(newUser);
    localStorage.setItem("userName", newUser.name);
    localStorage.setItem("userEmail", newUser.email);
    localStorage.setItem("userRole", newUser.role);
  };

  return (
    <UserContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};