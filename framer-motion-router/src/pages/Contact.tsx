import React from "react";

const Contact: React.FC = () => {
  return (
    <div className="page">
      <h1>연락처</h1>
      <p>연락처 페이지입니다.</p>
      <div className="content">
        <div className="contact-form">
          <h2>연락 양식</h2>
          <div className="form-group">
            <label>이름:</label>
            <input type="text" placeholder="이름을 입력하세요" />
          </div>
          <div className="form-group">
            <label>이메일:</label>
            <input type="email" placeholder="이메일을 입력하세요" />
          </div>
          <div className="form-group">
            <label>메시지:</label>
            <textarea placeholder="메시지를 입력하세요"></textarea>
          </div>
          <button className="submit-btn">전송</button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
