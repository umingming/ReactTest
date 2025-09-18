import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleGoToAbout = () => {
    setIsAnimating(true);
    // 애니메이션이 시작된 후 navigate
    setTimeout(() => {
      navigate("/about", { state: { from: "/", animate: true } });
    }, 50);
  };

  const content = (
    <>
      <h1>홈 페이지</h1>
      <p>framer-motion을 사용한 라우터 애니메이션 테스트입니다.</p>
      <div className="content">
        <h2>주요 기능</h2>
        <ul>
          <li>부드러운 페이지 전환 애니메이션</li>
          <li>다양한 애니메이션 효과</li>
          <li>React Router와의 완벽한 통합</li>
        </ul>
        <button
          onClick={handleGoToAbout}
          style={{
            marginTop: "2rem",
            padding: "1rem 2rem",
            fontSize: "1.1rem",
            backgroundColor: "#667eea",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          About 페이지로 이동
        </button>
      </div>
    </>
  );

  // 항상 motion.div로 렌더링하되, exit 애니메이션은 About 버튼 클릭시에만
  return (
    <motion.div
      className="page"
      initial={{ x: 0 }}
      animate={{ x: 0 }}
      exit={isAnimating ? { x: -window.innerWidth } : { x: 0 }}
      transition={{
        type: "tween",
        ease: [0.25, 0.46, 0.45, 0.94],
        duration: isAnimating ? 0.3 : 0,
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

export default Home;
