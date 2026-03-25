import { createContext, useContext } from "react";

export const LayoutContext = createContext<{
  openImportModal: () => void;
}>({ openImportModal: () => {} });

export const useLayout = () => useContext(LayoutContext);
