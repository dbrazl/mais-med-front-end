import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

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
  }

  h1, h2, h3, h4, p, textarea, button, a, div {
    color: black;
  }

  .Toastify__toast-body {
    color: white;
  }

  html,
  body {
    width: 100%;
    height: 100%;
  }
`;
