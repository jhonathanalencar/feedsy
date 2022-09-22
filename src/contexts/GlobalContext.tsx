import { createContext, ReactNode, RefObject, useRef, useState } from "react";

interface GlobalContextData{
  isDropdownMenuOpen: boolean;
  dropdownButtonRef: RefObject<HTMLLIElement>;
  toggleDropdownMenu: () => void;
  closeDropdownMenu: () => void;
  isModalOpen: boolean;
  closeModal: () => void;
  openModal: () => void;
  isDialogOpen: boolean;
  closeDialog: () => void;
  openDialog: () => void;
}

interface GlobalContextProviderProps{
  children: ReactNode;
}

export const GlobalContext = createContext({} as GlobalContextData);

export function GlobalContextProvider({ children }: GlobalContextProviderProps){
  const dropdownButtonRef = useRef<HTMLLIElement>(null);

  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function closeDropdownMenu(){
    setIsDropdownMenuOpen(false);
  }

  function toggleDropdownMenu(){
    setIsDropdownMenuOpen((prevState) => !prevState);
  }

  function closeModal(){
    setIsModalOpen(false);
  }

  function openModal(){
    setIsModalOpen(true);
  }

  function closeDialog(){
    setIsDialogOpen(false);
  }

  function openDialog(){
    setIsDialogOpen(true);
  }

  return(
    <GlobalContext.Provider value={{
      isDropdownMenuOpen,
      dropdownButtonRef,
      toggleDropdownMenu,
      closeDropdownMenu,
      isModalOpen,
      closeModal,
      openModal,
      isDialogOpen,
      closeDialog,
      openDialog,
    }}>
      {children}
    </GlobalContext.Provider>
  )
}