import { ImageInput } from "@/components/ImageInput";
import Guides from "@scena/react-guides";
import { useRef } from "react";

export function ImageCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const loadToCanvas = (image: HTMLImageElement) => {
    const context = canvasRef.current?.getContext("2d");
    if (!canvasRef.current || !context) return;

    const { width, height } = image;
    canvasRef.current.width = width;
    canvasRef.current.height = height;
    context.drawImage(image, 0, 0, width, height);
  };

  return (
    <div>
      <Guides />
      <ImageInput onLoad={loadToCanvas} />
      <canvas ref={canvasRef} />
    </div>
  );
}
