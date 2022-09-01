import { createContext, ReactNode, useState } from "react";

interface GlobalContextData{
  isDropdownMenuOpen: boolean;
  toggleDropdownMenu: () => void;
  closeDropdownMenu: () => void;
}

interface GlobalContextProviderProps{
  children: ReactNode;
}

export const GlobalContext = createContext({} as GlobalContextData);

export function GlobalContextProvider({ children }: GlobalContextProviderProps){
  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);

  function closeDropdownMenu(){
    setIsDropdownMenuOpen(false);
  }

  function toggleDropdownMenu(){
    setIsDropdownMenuOpen((prevState) => !prevState);
  }

  return(
    <GlobalContext.Provider value={{
      isDropdownMenuOpen,
      toggleDropdownMenu,
      closeDropdownMenu,
    }}>
      {children}
    </GlobalContext.Provider>
  )
}