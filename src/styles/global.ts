import { createGlobalStyle } from "styled-components";

export const GLobalStyle = createGlobalStyle`
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  :focus{
    outline: 0.2rem solid ${(props) => props.theme['blue-400']};
  }

  body{
    background-color: ${(props) => props.theme['gray-700']};
    color: ${(props) => props.theme['gray-200']};
    -webkit-font-smoothing: antialiased;
  }

  body,
  input,
  textarea,
  button{
    font-family: 'Lato', sans-serif;
    font-weight: 400;
    font-size: 1rem;
  }

  main{
    flex: 1;
    display: grid;
    grid-template-columns: 1fr;
    padding: 4rem 0;
  }
`;