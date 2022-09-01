import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Item = styled(Link)`
  width: 100% !important;
  border-radius: 0.25rem;
  font-size: 1.25rem;
  text-decoration: none;
  height: 3rem;
  justify-content: space-between !important;
  transition: background 0.3s;
  text-align: start;
  color: ${(props) => props.theme['gray-100']};
  margin-bottom: 0.2rem;
  margin-right: auto;
  
  span{
    display: flex;
    align-items: center; 
  }

  @media (max-width: 550px){
    font-size: 1.1rem;
  }
`;