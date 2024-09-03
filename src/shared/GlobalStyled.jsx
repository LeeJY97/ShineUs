import { createGlobalStyle } from "styled-components";

const GlobalStyled = createGlobalStyle`
@font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
}

@font-face {
    font-family: 'Paperlogy-8ExtraBold';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2408-3@1.0/Paperlogy-8ExtraBold.woff2') format('woff2');
    font-weight: 800;
    font-style: normal;
}
 body {
    background-color: #FFF3DC;
    font-family: 'Pretendard-Regular';
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
    font-family: 'Paperlogy-8ExtraBold';
    cursor: pointer;
     padding: 10px 20px;
      border-radius: 20px;
  }
  button:hover {
  background-color: #ffb84d;

}
`;
export default GlobalStyled;
