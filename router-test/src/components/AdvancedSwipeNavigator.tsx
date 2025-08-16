import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { useHammerSwipe } from "../hooks/useHammerSwipe";
import { useLocation, useNavigate } from "react-router-dom";
import { useHistoryContext } from "../context/HistoryContext";
import Main from "../pages/Main";
import Page1 from "../pages/Page1";
import Page2 from "../pages/Page2";
import Page3 from "../pages/Page3";

interface AdvancedSwipeNavigatorProps {
  children: React.ReactNode;
  edgeWidth?: number;
}

// 페이지 컴포넌트 매핑
const getPageComponent = (path: string) => {
  const componentMap: { [key: string]: React.ComponentType } = {
    "/": Main,
    "/page1": Page1,
    "/page2": Page2,
    "/page3": Page3,
  };
  return componentMap[path];
};

export const AdvancedSwipeNavigator: React.FC<AdvancedSwipeNavigatorProps> = ({
  children,
  edgeWidth = 150,
}) => {
  const location = useLocation();
  const { previousPath, historyStack } = useHistoryContext();
  const { elementRef, isDragging, dragX, canGoBack, progress } =
    useHammerSwipe(edgeWidth);

  // 이전 페이지를 렌더링할 숨겨진 컨테이너
  const [hiddenContainer, setHiddenContainer] = useState<HTMLDivElement | null>(
    null
  );
  const [previousPageElement, setPreviousPageElement] =
    useState<HTMLDivElement | null>(null);

  // 숨겨진 컨테이너 생성
  useEffect(() => {
    const container = document.createElement("div");
    container.style.cssText = `
      position: fixed;
      top: -200vh;
      left: 0;
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      pointer-events: none;
      z-index: -1000;
    `;
    document.body.appendChild(container);
    setHiddenContainer(container);

    return () => {
      if (container && document.body.contains(container)) {
        document.body.removeChild(container);
      }
    };
  }, []);

  // 이전 페이지 렌더링
  useEffect(() => {
    if (!hiddenContainer || !previousPath || !canGoBack) return;

    const PreviousComponent = getPageComponent(previousPath);
    if (!PreviousComponent) return;

    // 이전에 만든 엘리먼트 정리
    if (previousPageElement) {
      hiddenContainer.removeChild(previousPageElement);
    }

    // 새로운 이전 페이지 엘리먼트 생성
    const pageElement = document.createElement("div");
    pageElement.style.cssText = `
      width: 100%;
      height: 100%;
      background: white;
    `;

    hiddenContainer.appendChild(pageElement);
    setPreviousPageElement(pageElement);

    // 페이지 렌더링을 위한 임시 root 생성
    const root = (window as any).ReactDOM?.createRoot?.(pageElement);
    if (root) {
      root.render(React.createElement(PreviousComponent));
    }
  }, [hiddenContainer, previousPath, canGoBack, previousPageElement]);

  // 스와이프 중일 때 이전 페이지를 실제 화면에 복사
  const renderPreviousPageSnapshot = () => {
    if (!isDragging || !previousPageElement) return null;

    // 이전 페이지의 HTML을 복사
    return (
      <div
        style={{ width: "100%", height: "100%" }}
        dangerouslySetInnerHTML={{
          __html: previousPageElement.innerHTML,
        }}
      />
    );
  };

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
      {/* 실제 이전 페이지 스냅샷 (스와이프 시에만 표시) */}
      {canGoBack && previousPath && isDragging && (
        <motion.div
          animate={{
            x: dragX - window.innerWidth,
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
          {renderPreviousPageSnapshot()}
        </motion.div>
      )}

      {/* 현재 페이지 */}
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
          방식: Portal + Snapshot
          <br />
          히스토리: [{historyStack.join(", ")}]
        </div>
      )}

      {/* 스와이프 진행률 */}
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
