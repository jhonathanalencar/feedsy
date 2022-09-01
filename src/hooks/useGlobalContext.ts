import { useContext } from 'react';
import { GlobalContext } from '../contexts/GlobalContext';

export function useGlobalContext(){
  return useContext(GlobalContext);
}