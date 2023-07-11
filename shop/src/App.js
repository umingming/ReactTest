import { useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import './App.css';
import data from './assets/data';

function App() {
    const brand = "이천's캔들";
    const [products] = useState(data);

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
            <div className="container">
                <div className="row">
                    {
                        products.map(({ id, ...product }) => (
                            <Product
                                key={id}
                                product={product}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

function Product({ product: { title, content, img } }) {
    return (
        <div className="col-md-4">
            <img src={img} alt={title} width="80%" />
            <h4>{title}</h4>
            <p>{content}</p>
        </div>
    );
}

export default App;
