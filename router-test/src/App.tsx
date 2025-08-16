import "./App.css";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { HistoryProvider } from "./context/HistoryContext";
import Main from "./pages/Main";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import Page3 from "./pages/Page3";

// 각 페이지를 HistoryProvider로 감싸는 래퍼 컴포넌트
const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <HistoryProvider>{children}</HistoryProvider>
);

const router = createHashRouter([
  {
    path: "/",
    element: (
      <PageWrapper>
        <Main />
      </PageWrapper>
    ),
  },
  {
    path: "/page1",
    element: (
      <PageWrapper>
        <Page1 />
      </PageWrapper>
    ),
  },
  {
    path: "/page2",
    element: (
      <PageWrapper>
        <Page2 />
      </PageWrapper>
    ),
  },
  {
    path: "/page3",
    element: (
      <PageWrapper>
        <Page3 />
      </PageWrapper>
    ),
  },
]);

function App() {
  return (
    <div
      className="App"
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        margin: 0,
        padding: 0,
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
