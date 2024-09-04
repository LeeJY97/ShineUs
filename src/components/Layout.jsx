import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Nav from "../components/Nav";

const StyledLayoutContainer = styled.div`
  /* position: relative;
  display: flex;
  justify-content: center;
  gap: 50px;
  width: 100vw;
  height: 90vh;
  max-width: 1200px;
  min-width: 800px;
  margin: 0 auto; */
  display: flex;
  justify-content: center;
  /* align-items: center; */
  gap: 50px;
  width: 100vw;
  max-width: 1200px;
  min-width: 800px;
  margin: 0 auto;
`;

const StyledLayoutNavBox = styled.div`
  /* width: 400px; */
  width: 250px;
  flex-shrink: 0; /* 네브바 크기가 줄어들지 않도록 설정 */
`;

const StyledMainBox = styled.div`
  width: 600px;
  /* width: calc(100% - 300px); 
  max-width: 850px; 
  flex-shrink: 0;  */
`;

const Layout = () => {
  return (
    <StyledLayoutContainer>
      <StyledLayoutNavBox>
        <Nav />
      </StyledLayoutNavBox>
      <StyledMainBox>
        <Outlet />
      </StyledMainBox>
    </StyledLayoutContainer>
  );
};

export default Layout;
