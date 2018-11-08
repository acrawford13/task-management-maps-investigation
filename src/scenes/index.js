import React, { Fragment } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';

import store from 'store';

import theme from 'components/themes/theme';
import Main from './Main/Main';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Fira+Sans:400,500,700');

  html,
  body,
  form,
  input,
  textarea,
  button {
    font-family: 'Fira Sans', sans-serif;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    background-color: #FCFCFC;
    overflow: hidden;
  }

  ::selection {
    color: white;
    background-color: #1F8A96;
  }

  * {
    box-sizing: border-box;
  }

  @media screen and (max-width: 480px) {
    html {
      font-size: 87.5%;
    }
  }
`;

const App = () => (
  <ThemeProvider theme={theme}>
    <Fragment>
      <GlobalStyle />
      <Provider store={store}>
        <Main />
      </Provider>
    </Fragment>
  </ThemeProvider>
);

export default App;