import styled from 'styled-components';

export default styled.div`
  background-image: linear-gradient(
    -90deg,
    #d2d2d2 0%,
    #a2a2a2 50%,
    #d2d2d2 100%
  );
  background-size: 400% 400%;
  animation: shimmer 1.2s ease-in-out infinite;

  @keyframes shimmer{
    0%{
      background-position: 0% 0%;
    }
    100%{
      background-position: -135% 0%;
    }
  }
`;