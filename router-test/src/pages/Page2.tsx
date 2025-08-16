import { Link } from "react-router-dom";
import { VirtualStackNavigator } from "../components/VirtualStackNavigator";

export default function Page2() {
  return (
    <VirtualStackNavigator>
      <div
        style={{
          padding: "30px",
          minHeight: "100vh",
          backgroundColor: "#e8f5e8",
        }}
      >
        <h1>📄 페이지 2</h1>
        <p>← 스와이프 백으로 이전 페이지로!</p>

        <div
          style={{
            marginTop: "40px",
            padding: "30px",
            backgroundColor: "white",
            borderRadius: "16px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <h2>✨ 두 번째 페이지</h2>
          <p>여기서도 스와이프 백이 잘 작동하는지 확인해보세요!</p>

          <div
            style={{
              padding: "20px",
              backgroundColor: "#f0f9ff",
              borderRadius: "8px",
              marginTop: "20px",
            }}
          >
            <strong>💡 팁:</strong> 빠르게 스와이프하면 짧은 거리로도 뒤로가기가
            됩니다!
          </div>
        </div>

        <div style={{ marginTop: "30px" }}>
          <Link
            to="/page3"
            style={{
              display: "inline-block",
              padding: "15px 30px",
              backgroundColor: "#FF9500",
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
