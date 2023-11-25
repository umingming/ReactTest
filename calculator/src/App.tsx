import React, { useState } from "react";
import "./App.css";
import styled from "@emotion/styled";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Input = styled("input")`
    width: 98%;
    height: 50px;
    margin: 10px;
    text-align: right;
`;
const Button = styled("button")`
    color: gray;
    width: 100%;
    height: 40px;
    margin: 5px auto;
    cursor: pointer;
`;

function App() {
    const [value, setValue] = useState("");

    function changeValue({ target: { value } }: { target: { value: string } }): void {
        if (/^[0-9]+$/.test(value)) {
            setValue(value);
        }
    }

    function addValue(num: number): void {
        setValue(value + num);
    }

    return (
        <div className="App">
            <Input value={value} onChange={changeValue} />
            <Container fluid>
                <Row>
                    <Col>
                        <Button>AC</Button>
                    </Col>
                    <Col>
                        <Button>+/-</Button>
                    </Col>
                    <Col>
                        <Button>%</Button>
                    </Col>
                    <Col>
                        <Button>÷</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button onClick={() => addValue(7)}>7</Button>
                    </Col>
                    <Col>
                        <Button onClick={() => addValue(8)}>8</Button>
                    </Col>
                    <Col>
                        <Button onClick={() => addValue(9)}>9</Button>
                    </Col>
                    <Col>
                        <Button>x</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button onClick={() => addValue(4)}>4</Button>
                    </Col>
                    <Col>
                        <Button onClick={() => addValue(5)}>5</Button>
                    </Col>
                    <Col>
                        <Button onClick={() => addValue(6)}>6</Button>
                    </Col>
                    <Col>
                        <Button>-</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button onClick={() => addValue(1)}>1</Button>
                    </Col>
                    <Col>
                        <Button onClick={() => addValue(2)}>2</Button>
                    </Col>
                    <Col>
                        <Button onClick={() => addValue(3)}>3</Button>
                    </Col>
                    <Col>
                        <Button>+</Button>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6}>
                        <Button onClick={() => addValue(0)}>0</Button>
                    </Col>
                    <Col>
                        <Button>.</Button>
                    </Col>
                    <Col>
                        <Button>=</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default App;
