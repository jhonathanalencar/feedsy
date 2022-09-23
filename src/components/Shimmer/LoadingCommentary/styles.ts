import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 1rem;

  > div{
    display: flex; 
    gap: 1rem;

    .avatar-skeleton{
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      flex-shrink: 0;
    }

    > div{
      padding: 1rem;
      margin-top: 0;
      width: 100%;
      background-color: ${({theme}) => theme['gray-500']};
      border-radius: 0.25rem;
      height: 6rem;
      
      header{
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        margin: 0;

        .row-skeleton{
          width: 50%;
          height: 1.25rem;
        }
      }

      .row-skeleton{
        width: 25%;
        height: 1rem;
      }
    }
  }
`;