import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import genres from "../utils/genres";
interface Props {
  dataFilter: (mode: "category" | "popular", param?: string | number) => void;
  type: "movie" | "tv"
  input: string;
  setInput: (value:string ) => void;
}
function Header({ dataFilter, type , input , setInput}: Props) {
  return (
    <Navbar bg="ligth" expand={"xl"} className="fixed top-0 left-0 mb-1 text-black">
      <Container fluid>
        <Navbar.Brand href="#">Mflix Search</Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${"xl"}`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${"xl"}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${"xl"}`}
          placement="end"          
        >
          <Offcanvas.Header closeButton >
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${"xl"}`}>
              Menu
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link href="/movie">Filmes</Nav.Link>
              <Nav.Link href="/tv">Series</Nav.Link>
              <NavDropdown
                title="Categorias"
                id={`offcanvasNavbarDropdown-expand-${"xl"}`}
              >
                {genres[type].map(({ id, name }: { id: number; name: string }) => (
                  <NavDropdown.Item
                    key={id}
                    onClick={() => dataFilter("category", id)}
                  >
                    {name}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Buscar"
                className="me-2"
                aria-label="Search"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />              
            </Form>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default Header;
