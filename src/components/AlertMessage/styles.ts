import styled from 'styled-components';

export const Error = styled.span<{ type: 'success' | 'error' }>`
  width: 100%;
  background-color: ${(props) => (
    props.type === 'success'
      ? props.theme['green-300']
      : props.theme['red-500']
  )};
  color: ${(props) => props.theme['gray-100']};
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.5rem;
  margin-block: 0.5rem;
  text-align: center;

  @media (max-width: 550px){    
    font-size: 1rem;  
    padding: 0.25rem 0.5rem;
  }
`;