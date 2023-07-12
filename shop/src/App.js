import { useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import './App.css';
import {
    Routes, Route, Link, useParams, useNavigate, Outlet,
} from 'react-router-dom';
import styled from 'styled-components';
import data from './assets/data';

const YellowButton = styled.button`
    background: yellow;
`;

function App() {
    const brand = "이천's캔들";
    const navigate = useNavigate();

    return (
        <div className="App">
            <Navbar bg="light" data-bs-theme="light">
                <YellowButton />
                <Container>
                    <Navbar.Brand
                        onClick={() => { navigate('/'); }}
                    >
                        { brand }

                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link
                            onClick={() => { navigate('/'); }}
                        >
                            Best

                        </Nav.Link>
                        <Nav.Link href="#candle">Candle</Nav.Link>
                        <Nav.Link href="#freshener">Freshener</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route
                    path="/detail/:id"
                    element={<Detail />}
                />
                <Route path="/about" element={<About />}>
                    <Route path="member" element={<div>멤버</div>} />
                </Route>
                <Route path="/event" element={<Event />}>
                    <Route path="one" element={<p>첫 주문시 양배추즙</p>} />
                    <Route path="two" element={<p>생일 기념 쿠폰</p>} />
                </Route>
                <Route
                    path="*"
                    element={<div>없어요</div>}
                />
            </Routes>
        </div>
    );
}

function Event() {
    return (
        <div>
            <h4>오늘의 이벤트</h4>
            <Outlet />
        </div>
    );
}

function About() {
    return (
        <div>
            <h4>회사 정보임.</h4>
            <Outlet />
        </div>
    );
}

function Main() {
    const [products] = useState(data);
    return (
        <div className="container">
            <div className="row">
                {
                    products.map((i) => (
                        <Product
                            key={i.id}
                            product={i}
                        />
                    ))
                }
            </div>
        </div>
    );
}

function Product({ product: { id, title, content } }) {
    return (
        <div className="col-md-4">
            <Link to={`/detail/${id}`}>
                <img
                    src={`https://codingapple1.github.io/shop/shoes${id + 1}.jpg`}
                    alt={title}
                    width="80%"
                />
                <h4>{title}</h4>
                <p>{content}</p>
            </Link>
        </div>
    );
}

function Detail() {
    const { id } = useParams();
    const { title, content, price } = data.find((i) => i.id === +id);

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <img
                        src={`https://codingapple1.github.io/shop/shoes${+id + 1}.jpg`}
                        alt=""
                        width="100%"
                    />
                </div>
                <div className="col-md-6">
                    <h4 className="pt-5">{title}</h4>
                    <p>{content}</p>
                    <p>{price}</p>
                    <button type="button" className="btn btn-danger">주문하기</button>
                </div>
            </div>
        </div>
    );
}

export default App;
