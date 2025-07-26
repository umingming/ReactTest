import { useRef, useState } from "react";
import Guides from "@scena/react-guides";

import { ImageInput } from "@/components/ImageInput";

export function ImageCanvas() {
  // #region Canvas
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const isCanvasLoaded = canvasSize.width > 0 && canvasSize.height > 0;

  const loadToCanvas = (image: HTMLImageElement) => {
    const context = canvasRef.current?.getContext("2d");
    if (!canvasRef.current || !context) return;

    const { width, height } = image;
    canvasRef.current.width = width;
    canvasRef.current.height = height;
    context.drawImage(image, 0, 0, width, height);

    // 캔버스 크기 상태 업데이트
    setCanvasSize({ width, height });
  };
  // #endregion Canvas

  // #region Guides
  const horizontalGuidesRef = useRef<Guides>(null);
  const verticalGuidesRef = useRef<Guides>(null);
  // #endregion Guides

  return (
    <div className="relative h-fit w-fit bg-gray-800">
      {isCanvasLoaded && (
        <>
          <div
            className="absolute top-0 left-30"
            style={{
              width: canvasSize.width,
              height: 30,
            }}
          >
            <Guides
              ref={horizontalGuidesRef}
              type="horizontal"
              style={{ width: "100%", height: "100%" }}
              backgroundColor="transparent"
            />
          </div>

          <div
            className="absolute top-30 left-0"
            style={{
              width: 30,
              height: canvasSize.height,
            }}
          >
            <Guides
              ref={verticalGuidesRef}
              type="vertical"
              style={{ width: "100%", height: "100%" }}
              backgroundColor="transparent"
            />
          </div>
        </>
      )}

      {/* 캔버스는 가이드 공간만큼 여백을 두고 배치 */}
      <div className="pt-30 pl-30">
        {!isCanvasLoaded && <ImageInput onLoad={loadToCanvas} />}
        <canvas ref={canvasRef} className="border border-gray-300" />
      </div>
    </div>
  );
}
