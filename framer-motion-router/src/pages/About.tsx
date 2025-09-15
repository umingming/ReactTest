import React from "react";
import { motion } from "framer-motion";

const About: React.FC = () => {
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
      <h1>소개 페이지</h1>
      <p>
        이 프로젝트는 framer-motion을 활용한 페이지 전환 효과를 테스트하기 위해
        만들어졌습니다.
      </p>
      <div className="content">
        <h2>기술 스택</h2>
        <div className="tech-stack">
          <motion.div
            className="tech-item"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            React
          </motion.div>
          <motion.div
            className="tech-item"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            TypeScript
          </motion.div>
          <motion.div
            className="tech-item"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Framer Motion
          </motion.div>
          <motion.div
            className="tech-item"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            React Router
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
