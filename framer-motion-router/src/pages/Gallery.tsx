import React from "react";
import { motion } from "framer-motion";

const Gallery: React.FC = () => {
  const images = [
    { id: 1, color: "#FF6B6B", title: "빨간색" },
    { id: 2, color: "#4ECDC4", title: "청록색" },
    { id: 3, color: "#45B7D1", title: "파란색" },
    { id: 4, color: "#96CEB4", title: "초록색" },
    { id: 5, color: "#FFEAA7", title: "노란색" },
    { id: 6, color: "#DDA0DD", title: "보라색" },
  ];

  return (
    <div className="page">
      <h1>갤러리</h1>
      <p>갤러리 페이지입니다.</p>
      <div className="gallery-grid">
        {images.map((image) => (
          <div
            key={image.id}
            className="gallery-item"
            style={{ backgroundColor: image.color }}
          >
            <h3>{image.title}</h3>
            <p>#{image.color}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
