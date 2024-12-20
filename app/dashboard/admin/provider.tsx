"use client";

import { User } from "@prisma/client";
import { useState, createContext, useContext } from "react";

export const ToggleAdminContext = createContext<{
  isCollapse: boolean;
  SetIsCollapse: React.Dispatch<React.SetStateAction<boolean>>;
  user?: User;
  SetUser?: React.Dispatch<React.SetStateAction<User | undefined>>;
} | null>(null);

export const AdminContextProvider = ({
  children,
  user: initialUser,
}: {
  children: React.ReactNode;
  user: User;
}) => {
  const [isCollapse, SetIsCollapse] = useState(false);
  const [user, SetUser] = useState<User | undefined>(initialUser);
  return (
    <ToggleAdminContext.Provider value={{ user, SetIsCollapse, isCollapse, SetUser }}>
      {children}
    </ToggleAdminContext.Provider>
  );
};

export const useAdminContext = () => {
  const context = useContext(ToggleAdminContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
