import { createGlobalStyle } from "styled-components";
const GlobalStyled = createGlobalStyle`
 body {
    background-color: #FFF3DC;
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    display:flex;
    justify-content: center;
    align-items:center;
    min-width: 320px;
    min-height: 100vh;
  }
  #root {
    max-width: 1280px;
    width: 100%;
    margin: 0 auto;
    text-align: center;
  }
  a {
  text-decoration: none;
  color: #333;
  }
  h2 {
  font-size: 1.5em;
  font-weight: bold;
  }
  button {
    background-color: #FFC966;
    border:none;
    cursor: pointer;
     padding: 10px 20px;
      border-radius: 20px;
  }
  button:hover {
  background-color: #ffb84d;
}
`;
export default GlobalStyled;
