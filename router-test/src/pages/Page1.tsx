import { Link } from "react-router-dom";
import { VirtualStackNavigator } from "../components/VirtualStackNavigator";

export default function Page1() {
  return (
    <VirtualStackNavigator>
      <div
        style={{
          padding: "30px",
          minHeight: "100vh",
          backgroundColor: "#e3f2fd",
        }}
      >
        <h1>📄 페이지 1</h1>
        <p>← 왼쪽 가장자리에서 스와이프하여 뒤로가기</p>

        <div
          style={{
            marginTop: "40px",
            padding: "30px",
            backgroundColor: "white",
            borderRadius: "16px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <h2>🎯 Virtual Stack 테스트</h2>
          <p>이 페이지에서 스와이프 백 기능을 테스트해보세요!</p>

          <ul style={{ lineHeight: 1.8 }}>
            <li>화면 왼쪽 150px 범위에서 시작</li>
            <li>오른쪽으로 드래그</li>
            <li>실제 이전 페이지 컴포넌트가 뒤에서 나타남</li>
          </ul>

          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              backgroundColor: "#e3f2fd",
              borderRadius: "8px",
              fontSize: "14px",
            }}
          >
            <strong>💡 Virtual Stack 특징:</strong>
            <br />
            이전 페이지의 실제 React 컴포넌트 인스턴스가 메모리에 유지되어
            상태와 인터랙션이 그대로 보존됩니다.
          </div>
        </div>

        <div style={{ marginTop: "30px" }}>
          <Link
            to="/page2"
            style={{
              display: "inline-block",
              padding: "15px 30px",
              backgroundColor: "#34C759",
              color: "white",
              textDecoration: "none",
              borderRadius: "8px",
              marginRight: "10px",
            }}
          >
            다음 페이지 →
          </Link>

          <Link
            to="/"
            style={{
              display: "inline-block",
              padding: "15px 30px",
              backgroundColor: "#666",
              color: "white",
              textDecoration: "none",
              borderRadius: "8px",
            }}
          >
            홈으로
          </Link>
        </div>
      </div>
    </VirtualStackNavigator>
  );
}
