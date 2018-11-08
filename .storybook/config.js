import React, { Fragment } from 'react';
import { configure, addDecorator } from '@storybook/react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

import theme from 'components/themes/theme';

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

// Register decorator
addDecorator(story => {

  

  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <GlobalStyle />
        {story()}
      </Fragment>
    </ThemeProvider>
  );
});

const req = require.context('../src', true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
