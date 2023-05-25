import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import genres from "../../utils/genres";
import { Button } from "react-bootstrap";

interface Props {
  dataFilter: (genreId: number) => void;
  type: "movie" | "tv";
  input: string;
  search: () => void;
  setInput: (value: string) => void;
}
function Header({ dataFilter, type, input, setInput, search }: Props) {
  return (
    <Navbar
      collapseOnSelect
      bg="ligth"
      expand={"sm"}
      className="h-[50px] bg-white mb-1 text-black"
    >
      <Container fluid>
        <Navbar.Brand href="#">Mflix Search</Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${"xl"}`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${"xl"}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${"xl"}`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
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
                {genres[type].map(
                  ({ id, name }: { id: number; name: string }) => (
                    <NavDropdown.Item
                      href={`/${type}/category/${id}`}
                      key={id}
                      onClick={() => {
                        const element: HTMLElement | null = document?.querySelector(".btn-close")
                        if (element) {
                          element.click()
                        }
                      }
                      }
                    >
                      {name}
                    </NavDropdown.Item>
                  )
                )}
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
              <Button onClick={(e) => {
                search()
                const element: HTMLElement | null = document?.querySelector(".btn-close")
                if (element) {
                  element.click()
                }
              }} variant="outline-success">Search</Button>
            </Form>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default Header;
