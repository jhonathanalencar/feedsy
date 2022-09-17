import styled from 'styled-components';

export const LoadingContainer = styled.div`
  flex: 1;

  svg{
    color: ${({theme}) => theme['gray-100']};
    animation: spin 1s linear infinite;

    @keyframes spin{
      0%{
        transform: rotate(0);
      }
      100%{
        transform: rotate(360deg);
      }
    }
  }
`;