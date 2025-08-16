import { Link } from "react-router-dom";
import { VirtualStackNavigator } from "../components/VirtualStackNavigator";

export default function Page3() {
  return (
    <VirtualStackNavigator>
      <div
        style={{
          padding: "30px",
          minHeight: "100vh",
          backgroundColor: "#fff3e0",
        }}
      >
        <h1>📄 페이지 3</h1>
        <p>← 마지막 페이지에서도 스와이프 백!</p>

        <div
          style={{
            marginTop: "40px",
            padding: "30px",
            backgroundColor: "white",
            borderRadius: "16px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <h2>🎉 마지막 페이지</h2>
          <p>스와이프 백 기능이 모든 페이지에서 잘 작동하는지 확인했나요?</p>

          <div
            style={{
              padding: "20px",
              backgroundColor: "#fff8e1",
              borderRadius: "8px",
              marginTop: "20px",
              border: "2px solid #ffb74d",
            }}
          >
            <strong>🔥 완벽!</strong> 이제 네이티브 앱처럼 자연스러운 스와이프
            백을 사용할 수 있습니다!
          </div>

          <div style={{ marginTop: "20px", fontSize: "14px", color: "#666" }}>
            <p>
              <strong>현재 설정:</strong>
            </p>
            <ul>
              <li>엣지 범위: 150px (기본값)</li>
              <li>뒤로가기 임계값: 100px</li>
              <li>빠른 스와이프: 50px + 속도 0.5 이상</li>
            </ul>
          </div>
        </div>

        <div style={{ marginTop: "30px" }}>
          <Link
            to="/"
            style={{
              display: "inline-block",
              padding: "15px 30px",
              backgroundColor: "#007AFF",
              color: "white",
              textDecoration: "none",
              borderRadius: "8px",
            }}
          >
            🏠 홈으로 돌아가기
          </Link>
        </div>
      </div>
    </VirtualStackNavigator>
  );
}
