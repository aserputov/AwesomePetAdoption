import React, { Fragment } from "react";
import {
  Nav,
  Navbar,
  NavDropdown,
  Container,
  Image,
  Spinner,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./NavigationBar.css";
import Logo from "../../images/PawHubLogo.png";
import { useSignOut } from "react-supabase";
import { useAuth } from "../../context/SupaContext";

const petList = ["Dog", "Cat", "Rabbit", "Horse", "Bird"];
const PetTypes = () =>
  petList.map((type) => (
    <NavDropdown.Item key={type} as={Link} to={`/pets/${type.toLowerCase()}`}>
      {type}
    </NavDropdown.Item>
  ));

export default function NavigationBar() {
  const [{ fetching }, signOut] = useSignOut();
  const onClickSignOut = async () => {
    await signOut();
  };
  const { session, username } = useAuth();
  // bg="orange-gradient"
  return (
    <Navbar bg="orange-gradient" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <Image src={Logo} height={40} width={40} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <NavDropdown title="Pets" id="navbarScrollingDropdown">
              <PetTypes />
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/pets">
                All Pets
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/resources">
              Resources
            </Nav.Link>
            <Nav.Link as={Link} to="/donate">
              Donate
            </Nav.Link>
            <NavDropdown
              title={<i className="bi bi-person-circle"></i>}
              id="navbarScrollingDropdown"
            >
              <NavDropdown.Item>Hello, {username}</NavDropdown.Item>
              <NavDropdown.Divider />
              {!session && (
                <Fragment>
                  <NavDropdown.Item as={Link} to="/register">
                    Register
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/login">
                    Login
                  </NavDropdown.Item>
                </Fragment>
              )}
              {session && (
                <NavDropdown.Item
                  disabled={fetching}
                  onClick={() => onClickSignOut()}
                >
                  {fetching ? (
                    <Fragment>
                      <Spinner animation="grow" size="sm" />
                      Logging out
                    </Fragment>
                  ) : (
                    "Logout"
                  )}
                </NavDropdown.Item>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
