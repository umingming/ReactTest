import React from "react";
import "./App.css";
import styled from "@emotion/styled";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Button = styled("button")`
    color: gray;
`;

function App() {
    return (
        <div className="App">
            <ButtonContainer />
        </div>
    );
}

function ButtonContainer() {
    return (
        <Container fluid>
            <Row>
                <Col>%</Col>
                <Col>CE</Col>
                <Col>C</Col>
                <Col></Col>
            </Row>
            <Row>
                <Col>1</Col>
                <Col>2</Col>
            </Row>
        </Container>
    );
}

export default App;
