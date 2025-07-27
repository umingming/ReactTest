import React, { useState } from "react";

interface PostData {
  title: string;
  content: string;
  category: string;
  tags: string;
}

const SimpleTistoryPoster: React.FC = () => {
  const [post, setPost] = useState<PostData>({
    title: "",
    content: "",
    category: "",
    tags: "",
  });

  const [copySuccess, setCopySuccess] = useState<string>("");

  // 대화 정리 템플릿 생성
  const generateTemplate = () => {
    const today = new Date().toISOString().split("T")[0];
    const template = `# ${today} - AI 학습 정리

## 🤖 주요 대화 내용
- 

## 💡 새로 학습한 개념
- 

## 🔧 기술/도구
- 

## 📝 코드 예시
\`\`\`javascript
// 여기에 중요한 코드 스니펫 추가
\`\`\`

## 🔗 참고 링크
- 

## 📚 추가 학습할 내용
- 

---
> 💬 *AI와의 대화를 통해 학습한 내용을 정리했습니다.*
> 
> **작성일**: ${today}  
> **카테고리**: AI 학습  
> **태그**: #AI #학습정리 #개발`;

    setPost((prev) => ({
      ...prev,
      title: `${today} - AI 학습 정리`,
      content: template,
      category: "AI 학습",
      tags: "AI, 학습정리, 개발, 대화정리",
    }));
  };

  // 클립보드에 복사
  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(`${type} 복사됨!`);
      setTimeout(() => setCopySuccess(""), 2000);
    } catch (err) {
      console.error("복사 실패:", err);
      setCopySuccess("복사 실패");
      setTimeout(() => setCopySuccess(""), 2000);
    }
  };

  // 전체 포스트 복사
  const copyFullPost = () => {
    const fullPost = `제목: ${post.title}

카테고리: ${post.category}
태그: ${post.tags}

---

${post.content}`;

    copyToClipboard(fullPost, "전체 포스트");
  };

  // 티스토리 에디터용 HTML 변환
  const convertToHtml = () => {
    const htmlContent = post.content
      .replace(/# (.*)/g, "<h1>$1</h1>")
      .replace(/## (.*)/g, "<h2>$1</h2>")
      .replace(/### (.*)/g, "<h3>$1</h3>")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/`(.*?)`/g, "<code>$1</code>")
      .replace(/```(\w+)?\n([\s\S]*?)```/g, "<pre><code>$2</code></pre>")
      .replace(/- (.*)/g, "<li>$1</li>")
      .replace(/\n\n/g, "</p><p>")
      .replace(/^(.*)$/gm, "<p>$1</p>")
      .replace(/<p><li>/g, "<ul><li>")
      .replace(/<\/li><\/p>/g, "</li></ul>");

    copyToClipboard(htmlContent, "HTML 코드");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* 헤더 */}
        <div className="bg-orange-500 text-white p-6">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            📝 티스토리 포스트 작성기
          </h1>
          <p className="mt-2 opacity-90">
            AI 대화 내용을 정리해서 티스토리에 바로 붙여넣을 수 있어요!
          </p>
        </div>

        {/* 메인 컨텐츠 */}
        <div className="p-6">
          {/* 템플릿 생성 버튼 */}
          <div className="mb-6">
            <button
              onClick={generateTemplate}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition duration-200 flex items-center gap-2"
            >
              ✨ 대화 정리 템플릿 생성하기
            </button>
          </div>

          {/* 포스트 입력 폼 */}
          <div className="space-y-6">
            {/* 제목 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📌 제목
              </label>
              <input
                type="text"
                value={post.title}
                onChange={(e) =>
                  setPost((prev) => ({ ...prev, title: e.target.value }))
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="포스트 제목을 입력하세요"
              />
            </div>

            {/* 카테고리와 태그 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  📁 카테고리
                </label>
                <input
                  type="text"
                  value={post.category}
                  onChange={(e) =>
                    setPost((prev) => ({ ...prev, category: e.target.value }))
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="예: AI 학습, 개발, 일상"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  🏷️ 태그
                </label>
                <input
                  type="text"
                  value={post.tags}
                  onChange={(e) =>
                    setPost((prev) => ({ ...prev, tags: e.target.value }))
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="태그1, 태그2, 태그3"
                />
              </div>
            </div>

            {/* 내용 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📄 내용 (마크다운 지원)
              </label>
              <textarea
                value={post.content}
                onChange={(e) =>
                  setPost((prev) => ({ ...prev, content: e.target.value }))
                }
                rows={20}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent font-mono text-sm"
                placeholder="여기에 대화 내용을 정리해서 입력하세요..."
              />
            </div>

            {/* 복사 버튼들 */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={copyFullPost}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition duration-200 flex items-center gap-2"
              >
                📋 전체 포스트 복사
              </button>

              <button
                onClick={() => copyToClipboard(post.content, "내용만")}
                className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-medium transition duration-200 flex items-center gap-2"
              >
                📝 내용만 복사
              </button>

              <button
                onClick={convertToHtml}
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium transition duration-200 flex items-center gap-2"
              >
                🌐 HTML로 복사
              </button>
            </div>

            {/* 복사 성공 메시지 */}
            {copySuccess && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
                ✅ {copySuccess}
              </div>
            )}
          </div>

          {/* 사용법 안내 */}
          <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">
              📖 사용법
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-blue-700">
              <li>"✨ 대화 정리 템플릿 생성하기" 버튼 클릭</li>
              <li>생성된 템플릿에 실제 대화 내용 입력</li>
              <li>"📋 전체 포스트 복사" 또는 "📝 내용만 복사" 클릭</li>
              <li>티스토리 관리자 페이지 → 글쓰기로 이동</li>
              <li>복사한 내용을 붙여넣기 (Ctrl+V 또는 Cmd+V)</li>
              <li>카테고리와 태그 설정 후 발행!</li>
            </ol>
          </div>

          {/* 팁 */}
          <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-800 mb-2">💡 팁</h4>
            <ul className="list-disc list-inside space-y-1 text-yellow-700 text-sm">
              <li>마크다운 문법을 사용하면 더 예쁘게 정리할 수 있어요</li>
              <li>HTML 복사는 티스토리 HTML 편집기에서 사용하세요</li>
              <li>코드 블록은 ```로 감싸면 자동으로 하이라이팅됩니다</li>
              <li>정기적으로 학습 내용을 정리하면 복습에 도움이 됩니다</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleTistoryPoster;
