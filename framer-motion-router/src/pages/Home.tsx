import React from "react";
import { motion } from "framer-motion";

const Home: React.FC = () => {
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
      <h1>홈 페이지</h1>
      <p>framer-motion을 사용한 라우터 애니메이션 테스트입니다.</p>
      <div className="content">
        <h2>주요 기능</h2>
        <ul>
          <li>부드러운 페이지 전환 애니메이션</li>
          <li>다양한 애니메이션 효과</li>
          <li>React Router와의 완벽한 통합</li>
        </ul>
      </div>
    </motion.div>
  );
};

export default Home;
