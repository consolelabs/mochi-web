import { Fragment } from "react";
import { Footer } from "./footer";
import { Navbar } from "./navbar";

interface Props {
  children: React.ReactNode;
}

export const Layout = (props: Props) => (
  <Fragment>
    <Navbar />
    {props.children}
    <Footer />
  </Fragment>
);
