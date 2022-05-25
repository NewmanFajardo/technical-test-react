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
const Movie = lazy(() => import('./pages/movie/Movie'));
const MovieDetails = lazy(() => import('./pages/movie/MovieDetails'));
const Tv = lazy(() => import('./pages/tv/Tv'));
const TvDetails = lazy(() => import('./pages/tv/TvDetails'));

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
                      <Route index element={<Movie />} />
                      <Route path="/movie" element={<Movie />} />
                      <Route path="/movie/details" element={<MovieDetails />} />
                      <Route path="/tv" element={<Tv />} />
                      <Route path="/tv/details" element={<TvDetails />} />
                      <Route path="*" element={<Movie />} />
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
