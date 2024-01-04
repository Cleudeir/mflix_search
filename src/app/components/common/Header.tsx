'use client'
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import genres from "../../utils/genres";
import Image from "next/image";
import Link from "next/link";


interface Props {
  type: "movie" | "tv";
  search: (e: any) => void;
}
function Header({ type, search }: Props) {
  return (
    <Navbar
      collapseOnSelect
      bg="ligth"
      expand={"sm"}
      className="h-[50px] bg-white text-xl text-black "
    >
      <Container fluid>        
        <Image src={"/icon.png"} alt={"Mflix"} width={40} height={40} className="mx-2"/>
        <Nav.Link as={Link} style={{backgroundColor: type === "movie" ? "black": undefined}} className={type === "movie" ? "px-2 py-1 bg-green-300 text-white rounded-sm" : "p-1"} href="/movie">Filmes</Nav.Link>
        <Nav.Link as={Link} style={{backgroundColor: type === "tv" ? "black": undefined}} className={type === "tv" ? "px-2 py-1 bg-green-300 text-white rounded-sm" : "p-1"} href="/tv">Series</Nav.Link>
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
            <Nav className="justify-content-end flex-grow-1 sm:items-center ">

              <Nav.Link as={Link} href={`/${type}/watched`}>Watched</Nav.Link>
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
            <Form className="d-flex py-2">
              <Form.Control
                type="search"
                id='input'
                placeholder="Buscar"
                className="me-2"
                aria-label="Search"
                onChange={(e) => { search(e) }}
              />
              <button
                type='button'
                className="sm:hidden border-2 rounded-lg px-2 hover:bg-lime-600 hover:text-white"
                onClick={() => {
                  const element: HTMLElement | null = document?.querySelector(".btn-close")
                  if (element) {
                    element.click()
                  }
                }}
              >
                Search
              </button>
            </Form>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default Header;
