import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Nav from "../components/Nav";

const StyledLayoutContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px;
  width: 100vw;
  max-width: 1200px;
  min-width: 800px;
  margin: 0 auto;
`;

const StyledMainBox = styled.div`
  width: 600px;
`;

const Layout = () => {
  return (
    <StyledLayoutContainer>
      <Nav />
      <StyledMainBox>
        <Outlet />
      </StyledMainBox>
    </StyledLayoutContainer>
  );
};

export default Layout;
