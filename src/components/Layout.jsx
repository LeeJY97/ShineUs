// Layout.js
import React from "react";
import styled from "styled-components";
import Nav from "../components/Nav";

const LayoutContainer = styled.div`
  display: flex;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
`;

const Layout = ({ children }) => {
  return (
    <LayoutContainer>
      <Nav />
      <Content>{children}</Content>
    </LayoutContainer>
  );
};

export default Layout;
