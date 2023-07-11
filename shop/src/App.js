import './App.css';
import { Container, Nav, Navbar } from 'react-bootstrap';

function App() {
    const brand = "이천's캔들";
    return (
        <div className="App">
            <Navbar bg="light" data-bs-theme="light">
                <Container>
                    <Navbar.Brand href="#home">{ brand }</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Best</Nav.Link>
                        <Nav.Link href="#features">Candle</Nav.Link>
                        <Nav.Link href="#pricing">Freshener</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
}

export default App;
