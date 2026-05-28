import Nav from "./Nav.jsx";
import Footer from "./Footer.jsx";

export default function Layout({ children, route, isMap }) {
  return (
    <>
      <Nav route={route} />
      <main className={isMap ? "site-main map-main" : "site-main"}>{children}</main>
      {!isMap && <Footer />}
    </>
  );
}
