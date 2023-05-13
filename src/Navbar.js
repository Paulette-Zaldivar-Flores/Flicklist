import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Navbar.css';

function MovieNavbar() {
  return (
    <Navbar className="custom-navbar" variant="light" expand="dark">
      <Container>
        <Navbar.Brand href="/">Movie List 🎬</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/Watch-Next">Watch Next</Nav.Link>
            <Nav.Link href="/Watch-Later">Watch Later</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MovieNavbar;
