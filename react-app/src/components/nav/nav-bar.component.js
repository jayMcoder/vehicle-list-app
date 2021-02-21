import { Component, Fragment } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class NavBar extends Component {

  render() {
    return (
      <Fragment>
        <header>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">
              Car Lease
            </Navbar.Brand>
            <Nav className="mr-auto">
              {/* <Nav.Link to={"/"}>List Vehicle</Nav.Link> */}
              <Link to={"/"} className="nav-link">List Vehicle</Link>
              <Link to={"/add"} className="nav-link">Add Vehicle</Link>
            </Nav>
          </Navbar>
        </header>
      </Fragment>
    );
  }

}

export default NavBar;