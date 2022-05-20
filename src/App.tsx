import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '@emotion/react';
import React, { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import store from './redux/store';
import { AppContainer } from './styled-components/layout.styled.component';
import theme from './theme';
import { SnackbarUtilsConfigurator } from './utilities/snackbar.utility';
import { LayoutMovies } from './layout/LayoutMovies';
import { Loader } from './components/Loader';

// Routes
const Login = lazy(() => import('./pages/Login/Login'));

const App = () => {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <AppContainer className="App">
          <SnackbarProvider>
            <SnackbarUtilsConfigurator />
            <Suspense fallback={
              <Loader />
            }>
              <Provider store={store}>
                <BrowserRouter>
                  <LayoutMovies>
                    <Routes>
                      <Route path="/" element={<Login />} />
                    </Routes>
                  </LayoutMovies>
                </BrowserRouter>
              </Provider>
            </Suspense>
          </SnackbarProvider>
        </AppContainer>
      </ThemeProvider>
    </React.StrictMode>
  );
};

export default App;
