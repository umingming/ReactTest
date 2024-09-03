import { useState } from "react";
import styled from "styled-components"

interface CircleProps {
    bgColor?: string;
    borderColor?: string;
}

const Container = styled.div<CircleProps>`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: ${(props) => props.bgColor || "blue"};
    border: 1px solid ${(props) => props.borderColor || "blue"};
`;

export default function Circle({ bgColor, borderColor = bgColor }: CircleProps) {
    const [counter, setCounter] = useState<number|string>(0);
    return (
        <Container bgColor={bgColor} borderColor={borderColor}>
            {counter}
        </Container>
    )
}