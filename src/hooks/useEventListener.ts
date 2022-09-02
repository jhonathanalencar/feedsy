import { useEffect, useRef } from "react";

export function useEventListener<KW extends keyof WindowEventMap>(eventName: KW, handler: (event: WindowEventMap[KW]) => void){
  const savedHandler = useRef(handler);

  useEffect(() =>{
    const targetElement = window;

    const eventListener: typeof handler = (event) => savedHandler.current(event);

    targetElement.addEventListener(eventName, eventListener);

    return () => {
      targetElement.removeEventListener(eventName, eventListener)
    }
  }, [eventName]);
}