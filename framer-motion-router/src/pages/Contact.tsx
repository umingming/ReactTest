import React from "react";
import { motion } from "framer-motion";

const Contact: React.FC = () => {
  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
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
      <h1>연락처</h1>
      <p>다양한 애니메이션 효과를 확인해보세요.</p>
      <div className="content">
        <motion.div
          className="contact-form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2>연락 양식</h2>
          <motion.div
            className="form-group"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            <label>이름:</label>
            <input type="text" placeholder="이름을 입력하세요" />
          </motion.div>
          <motion.div
            className="form-group"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <label>이메일:</label>
            <input type="email" placeholder="이메일을 입력하세요" />
          </motion.div>
          <motion.div
            className="form-group"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.3 }}
          >
            <label>메시지:</label>
            <textarea placeholder="메시지를 입력하세요"></textarea>
          </motion.div>
          <motion.button
            className="submit-btn"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            전송
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact;
