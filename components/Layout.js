import Container from "react-bootstrap/Container";
import AppNavbar from "./AppNavbar";
import AppFooter from "./AppFooter";

// Every page is contrcuted in the same way: 
// Top: NavBar | Middle: page | Bottom: Footer
function Layout(props) {
  const user = props.user;

  return (
    <>
      <AppNavbar user={user} />
      <Container>{props.children}</Container>
      <AppFooter />
    </>
  );
}

export default Layout;
