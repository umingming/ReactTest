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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      initial={{ x: 100, opacity: 0.8 }}
      animate={{
        x: 0,
        opacity: 1,
        transition: {
          duration: 0.4,
          ease: [0.25, 0.8, 0.25, 1],
        },
      }}
      exit={{
        x: -100,
        opacity: 0.8,
        transition: {
          duration: 0.4,
          ease: [0.25, 0.8, 0.25, 1],
        },
      }}
      className="page"
    >
      <h1>갤러리</h1>
      <p>다양한 애니메이션 효과가 적용된 갤러리입니다.</p>
      <motion.div
        className="gallery-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {images.map((image) => (
          <motion.div
            key={image.id}
            className="gallery-item"
            variants={itemVariants}
            whileHover={{
              scale: 1.05,
              rotateZ: 5,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.95 }}
            style={{ backgroundColor: image.color }}
          >
            <h3>{image.title}</h3>
            <p>#{image.color}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Gallery;
