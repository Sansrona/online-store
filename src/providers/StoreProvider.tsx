import { createContext, useContext } from "react";

import RootStore from "../stores/RootStore";

const StoreContext = createContext(RootStore);

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreContext.Provider value={RootStore}>{children}</StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
export default StoreProvider;
