import { createContext, ReactNode, RefObject, useRef, useState } from "react";

interface ToastProps{
  show: boolean;
  message: string;
}

interface ModalProps{
  show: boolean;
}

interface GlobalContextData{
  isDropdownMenuOpen: boolean;
  dropdownButtonRef: RefObject<HTMLLIElement>;
  toggleDropdownMenu: () => void;
  closeDropdownMenu: () => void;
  modalType: ModalProps;
  closeModal: () => void;
  openModal: () => void;
  isDialogOpen: boolean;
  closeDialog: () => void;
  openDialog: () => void;
  toast: ToastProps;
  closeToast: () => void;
  openToast: (message: string) => void;
}

interface GlobalContextProviderProps{
  children: ReactNode;
}

export const GlobalContext = createContext({} as GlobalContextData);

export function GlobalContextProvider({ children }: GlobalContextProviderProps){
  const dropdownButtonRef = useRef<HTMLLIElement>(null);

  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [modalType, setModalType] = useState({} as ModalProps);
  const [toast, setToast] = useState({} as ToastProps);

  function closeDropdownMenu(){
    setIsDropdownMenuOpen(false);
  }

  function toggleDropdownMenu(){
    setIsDropdownMenuOpen((prevState) => !prevState);
  }

  function closeModal(){
    setModalType({
      show: false,
    });
  }

  function openModal(){
    setModalType({
      show: true
    });
  }

  function closeDialog(){
    setIsDialogOpen(false);
  }

  function openDialog(){
    setIsDialogOpen(true);
  }

  function closeToast(){
    setToast({
      show: false,
      message: '',
    });
  }

  function openToast(message: string){
    setToast({
      show: true,
      message,
    });
  }

  return(
    <GlobalContext.Provider value={{
      isDropdownMenuOpen,
      dropdownButtonRef,
      toggleDropdownMenu,
      closeDropdownMenu,
      modalType,
      closeModal,
      openModal,
      isDialogOpen,
      closeDialog,
      openDialog,
      toast,
      closeToast,
      openToast,
    }}>
      {children}
    </GlobalContext.Provider>
  )
}