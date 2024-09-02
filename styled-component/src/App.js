import styled, { keyframes } from "styled-components";

const animation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`
const Container = styled.div`
  display: flex;
`;
const Text = styled.span`
  color: white;
`;
const Box = styled.div`
  background-color: ${({bgColor}) => bgColor || "teal"};
  width: 100px;
  height: 100px;
  animation: ${animation} 1s linear;
  span {
    font-size: 20px;
    &:hover {
      color: blue;
    }
  };
  span:hover {
    color: blue;
  }
  ${Text} {
    font-size: 20px;
    &:hover {
      color: blue;
    }
  }
`;
const Circle = styled(Box)`
  border-radius: 50px;
`
const Button = styled.button`
  background-color: tomato;
  color: white;
  border-radius: 15px;
`
const Input = styled.input.attrs({ required: true })`
  width: 100px;
`

export default function App() {
  return (
    <Container>
      <Input />
      <Input />
      <Circle>
        <Text>Circle</Text>
      </Circle>
      <Text>Test</Text>
      <Box as="header">
        <Text as="p" >
          Hello
        </Text>
        <Button>
          Button
        </Button>
      </Box>
      <Box bgColor="tomato" />

    </Container>
  );
}
