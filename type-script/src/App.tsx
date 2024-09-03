import { Outlet } from "react-router-dom";
import { styled } from "styled-components";
import Circle from "./Circle"
import Header from "./components/Header";
import Form from "./Form";

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
`

function App() {
  return (
    <div>
      <Container>
        <Header />
        <Form />
        <Circle bgColor="tomato" borderColor="black" />
        <Circle />
        <Outlet />
      </Container>
    </div>
  );
}

export default App;
