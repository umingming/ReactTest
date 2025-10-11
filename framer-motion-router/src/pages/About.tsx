import React from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const About: React.FC = () => {
  const location = useLocation();
  const animate = (location.state as any)?.animate === true;
  const content = (
    <>
      <h1>소개 페이지</h1>
    </>
  );

  // 항상 motion.div로 렌더링하되, 애니메이션은 조건부로
  return (
    <motion.div
      className="page"
      initial={animate ? { x: -window.innerWidth } : { x: 0 }}
      animate={{ x: 0 }}
      exit={animate ? { x: window.innerWidth } : { x: 0 }}
      transition={{
        type: "tween",
        ease: [0.25, 0.46, 0.45, 0.94],
        duration: animate ? 0.3 : 0,
      }}
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
      }}
    >
      {content}
    </motion.div>
  );
};

export default About;
