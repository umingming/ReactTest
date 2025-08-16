import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useHammerSwipe } from "../hooks/useHammerSwipe";
import { useLocation, useNavigate } from "react-router-dom";
import { useHistoryContext } from "../context/HistoryContext";

interface VirtualStackNavigatorProps {
  children: React.ReactNode;
  edgeWidth?: number;
}

interface PageState {
  path: string;
  component: React.ReactNode;
  timestamp: number;
}

export const VirtualStackNavigator: React.FC<VirtualStackNavigatorProps> = ({
  children,
  edgeWidth = 150,
}) => {
  const location = useLocation();
  const { previousPath, historyStack } = useHistoryContext();
  const { elementRef, isDragging, dragX, canGoBack, progress } =
    useHammerSwipe(edgeWidth);

  // 가상 페이지 스택 (최근 3개 페이지만 메모리에 유지)
  const [pageStack, setPageStack] = useState<PageState[]>([]);
  const currentPageRef = useRef<React.ReactNode>(children);

  // 현재 페이지가 변경될 때 스택 업데이트
  useEffect(() => {
    currentPageRef.current = children;

    setPageStack((prevStack) => {
      const newStack = [...prevStack];
      const currentPath = location.pathname;

      // 현재 페이지가 이미 스택에 있는지 확인
      const existingIndex = newStack.findIndex(
        (page) => page.path === currentPath
      );

      if (existingIndex === -1) {
        // 새로운 페이지 추가
        newStack.push({
          path: currentPath,
          component: children,
          timestamp: Date.now(),
        });

        // 최대 5개 페이지만 유지 (메모리 관리)
        if (newStack.length > 5) {
          newStack.shift();
        }
      } else {
        // 기존 페이지 업데이트
        newStack[existingIndex] = {
          path: currentPath,
          component: children,
          timestamp: Date.now(),
        };
      }

      return newStack;
    });
  }, [children, location.pathname]);

  // 이전 페이지 컴포넌트 찾기
  const getPreviousPageComponent = () => {
    if (!previousPath) return null;

    const previousPage = pageStack.find((page) => page.path === previousPath);
    return previousPage?.component || null;
  };

  const previousPageComponent = getPreviousPageComponent();

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
      {/* 이전 페이지 (실제 컴포넌트 인스턴스) */}
      <AnimatePresence>
        {canGoBack && previousPageComponent && (
          <motion.div
            key={`previous-${previousPath}`}
            initial={{ x: -window.innerWidth }}
            animate={{
              x: isDragging ? dragX - window.innerWidth : -window.innerWidth,
            }}
            exit={{ x: -window.innerWidth }}
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
            {previousPageComponent}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 현재 페이지 */}
      <motion.div
        key={`current-${location.pathname}`}
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
          방식: Virtual Stack
          <br />
          스택 크기: {pageStack.length}
          <br />
          메모리: {pageStack.map((p) => p.path).join(", ")}
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
          {(progress * 100).toFixed(0)}% | Virtual
        </div>
      )}

      {/* 페이지 스택 시각화 (개발 모드) */}
      {process.env.NODE_ENV === "development" && (
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            left: "10px",
            background: "rgba(0,0,0,0.7)",
            color: "white",
            padding: "8px 12px",
            borderRadius: "8px",
            fontSize: "10px",
            zIndex: 1001,
            fontFamily: "monospace",
            maxWidth: "300px",
          }}
        >
          <div>페이지 스택:</div>
          {pageStack.map((page, index) => (
            <div
              key={page.path}
              style={{
                color:
                  page.path === location.pathname
                    ? "#4CAF50"
                    : page.path === previousPath
                      ? "#FF9800"
                      : "#FFF",
                marginLeft: "10px",
              }}
            >
              {index}: {page.path}{" "}
              {page.path === location.pathname ? "(현재)" : ""}
              {page.path === previousPath ? "(이전)" : ""}
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};
