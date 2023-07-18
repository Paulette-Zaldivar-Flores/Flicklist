import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import './Navbar.css';
import logo from './images/logo.png';
import avatar from './images/avatar.png';

const MovieNavbar = () => {



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
        </Navbar.Collapse>
        <Navbar.Brand>
        <img src={avatar} alt="Avatar" className="avatar" />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default MovieNavbar;
