import React from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const About: React.FC = () => {
  const location = useLocation();
  const animate = (location.state as any)?.animate === true;
  const content = (
    <>
      <h1>소개 페이지</h1>
      <p>
        이 프로젝트는 framer-motion을 활용한 페이지 전환 효과를 테스트하기 위해
        만들어졌습니다.
      </p>
      <div className="content">
        <h2>기술 스택</h2>
        <div className="tech-stack">
          <div className="tech-item">React</div>
          <div className="tech-item">TypeScript</div>
          <div className="tech-item">Framer Motion</div>
          <div className="tech-item">React Router</div>
        </div>
      </div>
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
