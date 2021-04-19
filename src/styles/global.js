import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  @font-face {
    font-family: 'Poppins';
    src: url('./assets/fonts/Poppins/Poppins-Regular.ttf') format('truetype');
    font-weight: normal;
  }

  @font-face {
    font-family: 'Poppins';
    src: url('./assets/fonts/Poppins/Poppins-Bold.ttf') format('truetype');
    font-weight: bold;
  }

  * {
    border: 0;
    padding: 0;
    margin: 0;
    outline: 0;
    font-family: 'Poppins', sans-serif;
    font-weight: normal;
    font-size: 14px;
    text-decoration: none;
    color: black;
  }

  html,
  body {
    width: 100%;
    height: 100%;
  }
`;
