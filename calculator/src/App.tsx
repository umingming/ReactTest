import React, { useState, useRef } from "react";
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
    const [value, setValue] = useState("0");
    const [index, setIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    function changeIndex(): void {
        //react는 ref에서 current 사용
        setIndex(inputRef.current?.selectionEnd ?? 0);
    }

    function resetIndex(e: React.FocusEvent<HTMLInputElement>): void {
        if (!e.relatedTarget) {
            setIndex(value.length);
        }
    }

    function changeNumber({ target: { value } }: { target: { value: string } }): void {
        if (/^[0-9]+$/.test(value)) {
            setValue(value);
        }
    }

    function addZero(): void {
        //처음 위치에선 0 추가 안 되도록
        if (index > 0) {
            addNumber("0");
        } else {
            //포커싱 효과
            inputRef.current?.focus();
        }
    }

    function addNumber(number: string): void {
        if (value === "0") {
            setValue(number);
        } else {
            const numbers = value.split("");
            numbers.splice(index, 0, number);
            setValue(numbers.join(""));
        }

        inputRef.current?.focus();

        //커서 위치 잡기
        setIndex(index + 1);
        setTimeout(() => {
            inputRef.current?.setSelectionRange(index + 1, index + 1);
        }, 2);
    }

    return (
        <div className="App">
            <Input ref={inputRef} value={value} onChange={changeNumber} onClick={changeIndex} onBlur={resetIndex} />
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
                        <ButtonNumber value="7" onClick={addNumber} />
                    </Col>
                    <Col>
                        <ButtonNumber value="8" onClick={addNumber} />
                    </Col>
                    <Col>
                        <ButtonNumber value="9" onClick={addNumber} />
                    </Col>
                    <Col>
                        <Button>x</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ButtonNumber value="4" onClick={addNumber} />
                    </Col>
                    <Col>
                        <ButtonNumber value="5" onClick={addNumber} />
                    </Col>
                    <Col>
                        <ButtonNumber value="6" onClick={addNumber} />
                    </Col>
                    <Col>
                        <Button>-</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ButtonNumber value="1" onClick={addNumber} />
                    </Col>
                    <Col>
                        <ButtonNumber value="2" onClick={addNumber} />
                    </Col>
                    <Col>
                        <ButtonNumber value="3" onClick={addNumber} />
                    </Col>
                    <Col>
                        <Button>+</Button>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6}>
                        <ButtonNumber value="0" onClick={addZero} />
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

type ButtonProps = {
    value: string;
    onClick: (value: string) => void;
};
function ButtonNumber({ value, onClick }: ButtonProps) {
    return <Button onClick={() => onClick(value)}>{value}</Button>;
}

export default App;
