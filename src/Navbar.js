import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Navbar.css';
import logo from './images/logo.png';
import avatar from './images/avatar.png';

const MovieNavbar = ({ isAuthenticated, userSignOut }) => {

  return (
    <Navbar className="custom-navbar me-auto" variant="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <img src={logo} alt="logo" className="logo" />
        </Navbar.Brand>
        <Navbar.Toggle className="navlink" aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className="navlink" href="/">Home</Nav.Link>
            <Nav.Link className="navlink" href="/Watch-Next">Watch Next</Nav.Link>
          </Nav>
          {isAuthenticated && (
            <Nav>
              <NavDropdown title={<img src={avatar} alt="Avatar" className="avatar" />} id="nav-dropdown">
                <NavDropdown.Item onClick={userSignOut}>Log Out</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MovieNavbar;
