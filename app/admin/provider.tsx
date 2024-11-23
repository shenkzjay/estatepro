import { useState, createContext } from "react";

export const ToggleAdminContext = createContext<{
  isCollapse: boolean;
  SetIsCollapse: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);
