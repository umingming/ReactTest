import { useRef } from "react";

interface ImageInputProps {
  onLoad: (image: HTMLImageElement) => void;
}

export function ImageInput({ onLoad }: ImageInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const loadImage = ({
    target: { files },
  }: React.ChangeEvent<HTMLInputElement>) => {
    const file = files?.[0];
    if (!file) return;

    const image = new Image();
    image.src = URL.createObjectURL(file);
    image.onload = () => onLoad(image);
  };

  return (
    <div>
      <p>파일 놔주세욥</p>
      <input ref={inputRef} type="file" accept="image/*" onChange={loadImage} />
      ;
    </div>
  );
}
