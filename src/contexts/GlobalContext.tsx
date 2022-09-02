import { createContext, ReactNode, RefObject, useRef, useState } from "react";

interface GlobalContextData{
  isDropdownMenuOpen: boolean;
  dropdownButtonRef: RefObject<HTMLLIElement>;
  toggleDropdownMenu: () => void;
  closeDropdownMenu: () => void;
}

interface GlobalContextProviderProps{
  children: ReactNode;
}

export const GlobalContext = createContext({} as GlobalContextData);

export function GlobalContextProvider({ children }: GlobalContextProviderProps){
  const dropdownButtonRef = useRef<HTMLLIElement>(null);
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
      dropdownButtonRef,
      toggleDropdownMenu,
      closeDropdownMenu,
    }}>
      {children}
    </GlobalContext.Provider>
  )
}