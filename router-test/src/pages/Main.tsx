import { Link } from "react-router-dom";
import { useState } from "react";
import { SimpleSwipeNavigator } from "../components/SimpleSwipeNavigator";
import { VirtualStackNavigator } from "../components/VirtualStackNavigator";

type NavigatorType = "simple" | "virtual";

export default function Main() {
  const [navigatorType, setNavigatorType] = useState<NavigatorType>("virtual");

  const NavigatorComponent =
    navigatorType === "virtual" ? VirtualStackNavigator : SimpleSwipeNavigator;

  return (
    <NavigatorComponent edgeWidth={200}>
      <div
        style={{
          padding: "30px",
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
        }}
      >
        <h1>🏠 메인 페이지</h1>
        <p>
          화면 왼쪽 <strong>200px 범위</strong>에서 우로 스와이프하여 뒤로가기!
        </p>

        {/* 네비게이터 방식 선택 */}
        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ margin: "0 0 15px 0" }}>🔄 네비게이션 방식 선택</h3>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <button
              onClick={() => setNavigatorType("simple")}
              style={{
                padding: "12px 16px",
                backgroundColor:
                  navigatorType === "simple" ? "#007AFF" : "#f0f0f0",
                color: navigatorType === "simple" ? "white" : "#333",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "14px",
                textAlign: "left",
              }}
            >
              📋 <strong>Simple (복제 방식)</strong>
              <br />
              <span style={{ fontSize: "12px", opacity: 0.8 }}>
                페이지 내용을 정적으로 복제해서 표시
              </span>
            </button>

            <button
              onClick={() => setNavigatorType("virtual")}
              style={{
                padding: "12px 16px",
                backgroundColor:
                  navigatorType === "virtual" ? "#007AFF" : "#f0f0f0",
                color: navigatorType === "virtual" ? "white" : "#333",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "14px",
                textAlign: "left",
              }}
            >
              🧠 <strong>Virtual Stack (메모리 방식)</strong>
              <br />
              <span style={{ fontSize: "12px", opacity: 0.8 }}>
                실제 컴포넌트 인스턴스를 메모리에 유지
              </span>
            </button>
          </div>

          <div
            style={{
              marginTop: "15px",
              padding: "10px",
              backgroundColor: "#f8f9fa",
              borderRadius: "6px",
              fontSize: "12px",
              color: "#666",
            }}
          >
            현재:{" "}
            <strong>
              {navigatorType === "simple"
                ? "Simple 복제 방식"
                : "Virtual Stack 방식"}
            </strong>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            marginTop: "30px",
          }}
        >
          <Link
            to="/page1"
            style={{
              padding: "20px",
              backgroundColor: "#007AFF",
              color: "white",
              textDecoration: "none",
              borderRadius: "12px",
              textAlign: "center",
              fontSize: "18px",
            }}
          >
            📄 페이지 1로 이동
          </Link>

          <Link
            to="/page2"
            style={{
              padding: "20px",
              backgroundColor: "#34C759",
              color: "white",
              textDecoration: "none",
              borderRadius: "12px",
              textAlign: "center",
              fontSize: "18px",
            }}
          >
            📄 페이지 2로 이동
          </Link>

          <Link
            to="/page3"
            style={{
              padding: "20px",
              backgroundColor: "#FF9500",
              color: "white",
              textDecoration: "none",
              borderRadius: "12px",
              textAlign: "center",
              fontSize: "18px",
            }}
          >
            📄 페이지 3으로 이동
          </Link>
        </div>

        <div
          style={{
            marginTop: "40px",
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "12px",
            fontSize: "14px",
            lineHeight: 1.6,
          }}
        >
          <h3>🔍 방식별 차이점</h3>
          <div style={{ marginTop: "15px" }}>
            <h4 style={{ color: "#007AFF" }}>📋 Simple (복제 방식)</h4>
            <ul style={{ marginLeft: "20px" }}>
              <li>페이지 내용을 정적으로 복제</li>
              <li>가볍고 빠름</li>
              <li>상태나 인터랙션은 복제되지 않음</li>
            </ul>

            <h4 style={{ color: "#34C759", marginTop: "15px" }}>
              🧠 Virtual Stack (메모리 방식)
            </h4>
            <ul style={{ marginLeft: "20px" }}>
              <li>실제 React 컴포넌트 인스턴스를 메모리에 유지</li>
              <li>상태와 인터랙션이 그대로 보존</li>
              <li>메모리 사용량이 더 많음</li>
              <li>더 자연스러운 네이티브 경험</li>
            </ul>
          </div>
        </div>
      </div>
    </NavigatorComponent>
  );
}
