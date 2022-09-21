import styled from "styled-components";

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  min-height: 100vh;
  background-color: ${(props) => props.theme['gray-800']};
`;

export const HeaderContainer = styled.header`
  width: 100%;
  background-color: ${(props) => props.theme['gray-900']};
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 99;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 95vw;
  margin: 0 auto;
  max-width: 1100px;
`;

export const Logo = styled.div`
  a{
    text-decoration: none;
  }

  strong{
    font-size: 2rem;
    color: ${(props) => props.theme['blue-100']};
    letter-spacing: -0.1rem;
    filter: brightness(0) invert(1);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-image: linear-gradient(90deg, #fff, #fff); 
    animation: colorCycle 10s ease-in-out infinite;

    span{
      font-size: 1.75rem;
    }

    @media (max-width: 550px){
      font-size: 1.75rem;
    }

    @keyframes colorCycle {
      0%, 30%, 70%, 100%{
        filter: brightness(0) invert(1);
      }
      10%{
        filter: none;
        background-image:linear-gradient(
          90deg, 
          ${(props) => props.theme['blue-700']},
          ${(props) => props.theme['green-400']}
        );
      }
      40%{
        filter: none;
        background-image: linear-gradient(
          90deg, 
          ${(props) => props.theme['red-300']}, 
          ${(props) => props.theme['yellow-500']}
        );
      }
      80%{
        filter: none;
        background-image: linear-gradient(
          90deg, 
          ${(props) => props.theme['purple-700']}, 
          ${(props) => props.theme['blue-900']}
        );
      }
    }
  }
`;

export const FooterContainer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme['green-300']};
  color: ${(props) => props.theme['gray-100']};
  padding: 1rem 0;

  span{
    font-size: 1rem;
  }
`;