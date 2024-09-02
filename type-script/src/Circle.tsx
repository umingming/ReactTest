import styled from "styled-components"

interface CircleProps {
    bgColor?: string;
}

const Container = styled.div<CircleProps>`
    width: 200px;
    height: 200px;
    background-color: ${(props) => props.bgColor || "blue"};
`;

export default function Circle({ bgColor }: CircleProps) {
    return <Container bgColor={bgColor} />
}