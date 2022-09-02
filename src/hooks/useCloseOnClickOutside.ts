import { RefObject } from "react";

export function useCloseOnClickOutside<T extends HTMLElement>(e: MouseEvent, ref: RefObject<T>, buttonRef: RefObject<HTMLLIElement>,handler: () => void){
  if(!ref.current || !buttonRef.current){ return; }

  const element = e.target as HTMLElement;

  if(!buttonRef.current.contains(element) && !ref.current.contains(element)){
    handler();
  }
}