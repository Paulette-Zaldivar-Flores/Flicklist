import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Navbar.css';
import logo from './images/logo.png';



function MovieNavbar() {
  return (
    <Navbar className="custom-navbar" variant="light" expand="dark">
      <Container>
        <Navbar.Brand href="/"><img
              src={logo}
              alt = "logo"
              className = "logo"
            /></Navbar.Brand>
        <Navbar.Toggle className = "navlink" aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className = "navlink" href="/">Home</Nav.Link>
            <Nav.Link className = "navlink" href="/Watch-Next">Watch Next</Nav.Link>
            <Nav.Link className = "navlink" href="/Watch-Later">Watch Later</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MovieNavbar;
