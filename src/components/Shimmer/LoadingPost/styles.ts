import styled from 'styled-components';

export const Container = styled.div`
  margin-inline: auto;
  width: min(700px, 100% - 1rem * 2);
  background-color: ${({theme}) => theme['gray-400']};
  border-radius: 0.25rem;
  padding: 1rem;
  margin-bottom: 2rem;

  > div{
    header{
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 2rem;

      .avatar-skeleton{
        height: 3rem;
        width: 3rem;
        border-radius: 50%;
        flex-shrink: 0;
      }
  
      .row-skeleton{
        width: 50%;
        height: 2rem;
      }

      .icon-skeleton{
        width: 1.75rem;
        height: 1.75rem;
        margin-left: auto;
        border-radius: 0.25rem;
      }
    }

    .square-skeleton{
      height: 8rem;
      width: 100%;
      margin-top: 2rem;
      border-radius: 0.25rem;
    }
  }
`;