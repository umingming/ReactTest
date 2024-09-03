import { styled } from "styled-components";
import Circle from "./Circle"
import Form from "./Form";

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
`

function App() {
  return (
    <div>
      <Container>
        <Form />
        <Circle bgColor="tomato" borderColor="black" />
        <Circle />
      </Container>
    </div>
  );
}

export default App;
