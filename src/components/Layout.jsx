import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Nav from "../components/Nav";

const StyledLayoutContainer = styled.div`
  /* position: relative; */
  display: flex;
  justify-content: center;
  gap: 50px;
  width: 100vw;
  /* height: 90vh; */
  max-width: 1200px;
  min-width: 800px;
  margin: 0 auto;
`;

const StyledLayoutNavBox = styled.div`
  /* width: 400px; */
`;

const StyledMainBox = styled.div`
  width: 600px;
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
