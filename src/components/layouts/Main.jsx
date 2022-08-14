import React from "react";

//Components
import { Header, Footer, Container } from "./";

const Main = ({ children }) => {
  return (
    <div>
      <Header />
      <Container>{children}</Container>
      <Footer />
    </div>
  );
};

export default Main;
