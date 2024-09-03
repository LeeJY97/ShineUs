import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Nav from "../components/Nav";

const StyledLayoutContainer = styled.div`
  position: relative;
`;

const StyledLayoutNavBox = styled.div`
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 10;
`;

const Layout = () => {
  return (
    <StyledLayoutContainer>
      <StyledLayoutNavBox>
        <Nav />
      </StyledLayoutNavBox>
      <>
        <Outlet />
      </>
    </StyledLayoutContainer>
  );
};

export default Layout;
