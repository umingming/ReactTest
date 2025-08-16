import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Hammer from "hammerjs";

export const useHammerSwipe = (edgeWidth: number = 150) => {
  const navigate = useNavigate();
  const location = useLocation();
  const elementRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [canGoBack, setCanGoBack] = useState(false);

  // 뒤로갈 수 있는지 확인
  useEffect(() => {
    setCanGoBack(window.history.length > 1);
  }, [location]);

  useEffect(() => {
    if (!elementRef.current) return;

    const hammer = new Hammer.Manager(elementRef.current, {
      recognizers: [
        [
          Hammer.Pan,
          {
            direction: Hammer.DIRECTION_HORIZONTAL,
            threshold: 10,
            pointers: 1,
          },
        ],
      ],
    });

    hammer.on("panstart", (e: HammerInput) => {
      // 화면 왼쪽 가장자리에서 시작하고 뒤로갈 수 있을 때만
      if (
        e.center.x < edgeWidth &&
        e.direction === Hammer.DIRECTION_RIGHT &&
        canGoBack
      ) {
        setIsDragging(true);
        if ("vibrate" in navigator) navigator.vibrate(10);
      }
    });

    hammer.on("panmove", (e: HammerInput) => {
      if (isDragging && e.deltaX > 0) {
        setDragX(Math.min(e.deltaX, 300)); // 최대 300px까지 허용
      }
    });

    hammer.on("panend", (e: HammerInput) => {
      if (isDragging) {
        const shouldGoBack =
          e.deltaX > 100 || (e.deltaX > 50 && Math.abs(e.velocityX) > 0.5);

        if (shouldGoBack) {
          if ("vibrate" in navigator) navigator.vibrate([10, 20, 10]);
          // 애니메이션이 끝난 후 네비게이션
          setTimeout(() => navigate(-1), 200);
        }

        // 드래그 상태는 즉시 종료하지 않고 애니메이션 후에
        if (!shouldGoBack) {
          setIsDragging(false);
          setDragX(0);
        }
      }
    });

    return () => hammer.destroy();
  }, [navigate, edgeWidth, isDragging, canGoBack]);

  return {
    elementRef,
    isDragging,
    dragX,
    canGoBack,
    progress: Math.min(dragX / 100, 1),
    // 뒤로가기 완료 콜백
    onNavigateComplete: () => {
      setIsDragging(false);
      setDragX(0);
    },
  };
};
