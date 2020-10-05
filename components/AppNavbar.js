import Link from "next/link";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import styles from "./AppNavbar.module.css";

// Navbar component located on every page of the site

function AppNavbar(props) {
  const user = props.user;

  return (
    <Navbar bg="light" expand="lg" className={styles.navBars}>
      <div className={styles.book}>
        <img src="logo.png" width={90} height={90} alt="yo"></img>
      </div>

      <Container className={styles.title}>
        <Link href="/" passHref={true}>
          <Navbar.Brand>
            <h3>UCSB Textbooks Buy and Sell</h3>
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle />
    
// Navbar options only appear if a user is logged in
    
        <Navbar.Collapse className="justify-content-end">
          <Nav className="mr-auto">
            {user && (
              <Link href="sellerPostPage" passHref={true}>
                <Nav.Link>
                  <h5>My Posts</h5>
                </Nav.Link>
              </Link>
            )}
            {user && (
              <Link href="sellerPostSalePage" passHref={true}>
                <Nav.Link>
                  <h5>Post a Book for Sale</h5>
                </Nav.Link>
              </Link>
            )}
          </Nav>

          <Nav>
            {user ? (
              <NavDropdown
                title={
                  <>
                    Hi, {user.name}
                    <Image
                      className="ml-2"
                      src={user.picture}
                      width={24}
                      height={24}
                    />
                  </>
                }
              >
                <NavDropdown.Item className="text-danger" href="/api/logout">
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Button data-cy="login" href="/api/login">
                Login
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
