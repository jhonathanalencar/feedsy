import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './styles/themes/default';
import { Router } from './Router';
import { GLobalStyle } from './styles/global';
import { GlobalContextProvider } from './contexts/GlobalContext';
import { AuthContextProvider } from './contexts/AuthContext';

export function App(){
  return(
    <ThemeProvider theme={defaultTheme}>
      <GlobalContextProvider>
        <AuthContextProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </AuthContextProvider>
      </GlobalContextProvider>
      <GLobalStyle />
    </ThemeProvider>
  )
}