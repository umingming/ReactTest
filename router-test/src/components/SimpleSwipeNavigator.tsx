import React from "react";
import { motion } from "framer-motion";
import { useHammerSwipe } from "../hooks/useHammerSwipe";
import { useLocation } from "react-router-dom";
import { useHistoryContext } from "../context/HistoryContext";

interface SimpleSwipeNavigatorProps {
  children: React.ReactNode;
  edgeWidth?: number;
}

// 페이지 컴포넌트를 직접 렌더링하지 않고 내용만 복제
const getPreviousPageContent = (path: string) => {
  const contentMap: { [key: string]: React.ReactNode } = {
    "/": (
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

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            marginTop: "40px",
          }}
        >
          <div
            style={{
              padding: "20px",
              backgroundColor: "#007AFF",
              color: "white",
              borderRadius: "12px",
              textAlign: "center",
              fontSize: "18px",
            }}
          >
            📄 페이지 1로 이동
          </div>

          <div
            style={{
              padding: "20px",
              backgroundColor: "#34C759",
              color: "white",
              borderRadius: "12px",
              textAlign: "center",
              fontSize: "18px",
            }}
          >
            📄 페이지 2로 이동
          </div>

          <div
            style={{
              padding: "20px",
              backgroundColor: "#FF9500",
              color: "white",
              borderRadius: "12px",
              textAlign: "center",
              fontSize: "18px",
            }}
          >
            📄 페이지 3으로 이동
          </div>
        </div>
      </div>
    ),
    "/page1": (
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
          <h2>🎯 스와이프 테스트</h2>
          <p>이 페이지에서 스와이프 백 기능을 테스트해보세요!</p>
        </div>
      </div>
    ),
    "/page2": (
      <div
        style={{
          padding: "30px",
          minHeight: "100vh",
          backgroundColor: "#e8f5e8",
        }}
      >
        <h1>�� 페이지 2</h1>
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
        </div>
      </div>
    ),
    "/page3": (
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
        </div>
      </div>
    ),
  };

  return contentMap[path] || null;
};

export const SimpleSwipeNavigator: React.FC<SimpleSwipeNavigatorProps> = ({
  children,
  edgeWidth = 150,
}) => {
  const location = useLocation();
  const { previousPath, historyStack } = useHistoryContext();
  const { elementRef, isDragging, dragX, canGoBack, progress } =
    useHammerSwipe(edgeWidth);

  return (
    <motion.div
      ref={elementRef}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        touchAction: "pan-y",
        overflow: "hidden",
      }}
    >
      {/* 실제 이전 페이지 (뒤에 숨어있다가 스와이프 시 나타남) */}
      {canGoBack && previousPath && (
        <motion.div
          animate={{
            x: isDragging ? dragX - window.innerWidth : -window.innerWidth,
          }}
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
            backgroundColor: "white",
          }}
        >
          {getPreviousPageContent(previousPath)}
        </motion.div>
      )}

      {/* 현재 페이지 (스와이프 시 오른쪽으로 밀려남) */}
      <motion.div
        animate={{
          x: isDragging ? dragX : 0,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 400 }}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          zIndex: 2,
          backgroundColor: "white",
          boxShadow: isDragging ? "-5px 0 20px rgba(0,0,0,0.3)" : "none",
        }}
      >
        {children}
      </motion.div>

      {/* 디버그 정보 */}
      {process.env.NODE_ENV === "development" && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            background: "rgba(0,0,0,0.7)",
            color: "white",
            padding: "8px 12px",
            borderRadius: "8px",
            fontSize: "11px",
            zIndex: 1001,
            fontFamily: "monospace",
          }}
        >
          현재: {location.pathname}
          <br />
          이전: {previousPath || "none"}
          <br />
          히스토리: [{historyStack.join(", ")}]
        </div>
      )}

      {/* 스와이프 진행률 표시 */}
      {isDragging && (
        <div
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            background: "rgba(0,0,0,0.7)",
            color: "white",
            padding: "8px 12px",
            borderRadius: "20px",
            fontSize: "12px",
            zIndex: 1001,
          }}
        >
          {(progress * 100).toFixed(0)}%
        </div>
      )}
    </motion.div>
  );
};
