import React, { useState } from "react";
import axios from "axios";

interface PostData {
  title: string;
  content: string;
  category: string;
  tags: string;
}

const AutoTistoryPoster: React.FC = () => {
  const [accessToken, setAccessToken] = useState("");
  const [blogName] = useState("yumding");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [post, setPost] = useState<PostData>({
    title: "2025-01-27 - AI 학습 정리",
    content: `# 2025-01-27 - AI 학습 정리

## 🤖 주요 대화 내용
- React DnD Provider 패턴에 대한 질문과 설명
- DndProvider가 HTML 태그가 아닌 React 컴포넌트라는 점 학습
- JSX → JavaScript 변환 과정과 Context API 원리 이해
- Canvas 가이드 룰러 구현 시 숫자가 잘리는 문제 해결
- 티스토리 자동 포스팅 시스템 개발 (MVP → 복사-붙여넣기 방식)

## 💡 새로 학습한 개념
- **MVP (Minimum Viable Product)**: 최소 기능 제품의 개념
- **React Context Pattern**: DndProvider의 내부 작동 원리
- **JSX 변환**: \`<DndProvider>\` → \`React.createElement()\` 과정
- **Canvas Guides**: react-guides 라이브러리 사용법
- **Overflow 처리**: CSS overflow: visible로 텍스트 잘림 방지

## 🔧 기술/도구
- React DnD (react-dnd, react-dnd-html5-backend)
- @scena/react-guides (캔버스 룰러)
- TypeScript
- TailwindCSS
- 티스토리 Open API (대안으로 복사-붙여넣기 방식 구현)

## 📝 코드 예시

### React DnD Provider 설정
\`\`\`jsx
<DndProvider backend={HTML5Backend}>
  <List />
</DndProvider>
\`\`\`

### Canvas 가이드 구현 (숫자 잘림 해결)
\`\`\`jsx
// Vertical 가이드 - 숫자 잘림 방지
<div style={{
  width: 50, // 30px → 50px로 증가
  height: Math.max(canvasSize.height, 300),
  overflow: "visible" // 텍스트 잘림 방지
}}>
  <Guides ref={verticalGuidesRef} type="vertical" />
</div>
\`\`\`

### 티스토리 포스터 핵심 기능
\`\`\`tsx
// 클립보드 복사 기능
const copyToClipboard = async (text: string, type: string) => {
  await navigator.clipboard.writeText(text);
  setCopySuccess(\`\${type} 복사됨!\`);
};

// 마크다운 → HTML 변환
const convertToHtml = () => {
  const htmlContent = post.content
    .replace(/# (.*)/g, '<h1>$1</h1>')
    .replace(/## (.*)/g, '<h2>$1</h2>')
    .replace(/\\*\\*(.*?)\\*\\*/g, '<strong>$1</strong>');
  copyToClipboard(htmlContent, 'HTML 코드');
};
\`\`\`

## 🔗 참고 링크
- [React DnD 공식 문서](https://react-dnd.github.io/react-dnd/)
- [티스토리 개발자 가이드](https://www.tistory.com/guide)
- [@scena/react-guides GitHub](https://github.com/daybrush/guides)

## 📚 추가 학습할 내용
- 브라우저 확장 프로그램 개발 (자동 대화 캡처)
- 카카오 개발자 센터 API 활용
- Canvas 조작 고급 기법
- 웹 스크래핑을 통한 자동화

## 🎯 프로젝트 결과물
**티스토리 자동 포스터** (\`/ReactTest/tistory-auto-poster\`)
- ✅ 대화 정리 템플릿 자동 생성
- ✅ 마크다운 → HTML 변환
- ✅ 클립보드 복사 기능
- ✅ 실시간 미리보기
- ✅ 사용법 가이드 포함

## 🚀 개발 과정
1. **문제 인식**: DnD Provider 패턴 이해 필요
2. **학습**: JSX 변환과 Context API 원리 파악
3. **실습**: Canvas 가이드 구현 중 텍스트 잘림 문제 발생
4. **해결**: overflow: visible과 컨테이너 크기 조정으로 해결
5. **확장**: 티스토리 자동 포스팅 아이디어 제안
6. **구현**: API 문제로 복사-붙여넣기 방식으로 대안 구현

---
> 💬 *AI와의 대화를 통해 React 생태계와 개발 자동화에 대해 학습했습니다.*
> 
> **작성일**: 2025-01-27  
> **카테고리**: AI 학습  
> **태그**: #React #DnD #Canvas #티스토리 #자동화 #MVP`,
    category: "AI 학습",
    tags: "React, DnD, Canvas, 티스토리, 자동화, MVP",
  });

  // 수동으로 액세스 토큰 입력받기
  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessToken.trim()) {
      setMessage("토큰이 설정되었습니다. 이제 포스트를 작성할 수 있습니다.");
    }
  };

  // 티스토리 API로 포스트 작성
  const publishPost = async () => {
    if (!accessToken) {
      setMessage("❌ 액세스 토큰을 먼저 입력해주세요.");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("access_token", accessToken);
      formData.append("output", "json");
      formData.append("blogName", blogName);
      formData.append("title", post.title);
      formData.append("content", post.content);
      formData.append("visibility", "2"); // 발행
      formData.append("tag", post.tags);

      const response = await axios.post(
        "https://www.tistory.com/apis/post/write",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.tistory?.status === "200") {
        const postUrl =
          response.data.tistory?.url || `https://${blogName}.tistory.com`;
        setMessage(`✅ 포스트가 성공적으로 발행되었습니다! 
        URL: ${postUrl}`);
      } else {
        throw new Error(
          response.data.tistory?.error?.message || "포스트 작성 실패"
        );
      }
    } catch (error: any) {
      console.error("포스트 작성 실패:", error);
      if (error.response?.status === 401) {
        setMessage("❌ 인증 실패: 액세스 토큰이 유효하지 않습니다.");
      } else if (error.response?.status === 403) {
        setMessage("❌ 권한 없음: 블로그 쓰기 권한을 확인해주세요.");
      } else {
        setMessage(`❌ 포스트 작성 실패: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 토큰 획득 가이드
  const getTokenGuide = () => {
    return `
🔑 액세스 토큰 획득 방법:

방법 1: 브라우저 개발자 도구 사용
1. 티스토리 관리자 페이지 (https://yumding.tistory.com/manage) 접속
2. F12 → Network 탭 열기
3. 글쓰기 또는 설정 변경 시도
4. 요청 헤더에서 'access_token' 찾기

방법 2: 카카오 개발자 센터
1. https://developers.kakao.com/ 접속
2. 애플리케이션 등록
3. 카카오 로그인 API 사용하여 토큰 획득

방법 3: 티스토리 OAuth (수동)
1. https://www.tistory.com/oauth/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=http://localhost:3000&response_type=code
2. 인증 후 code 파라미터 획득
3. code로 access_token 요청
    `;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* 헤더 */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            🚀 티스토리 자동 포스터 (API 버전)
          </h1>
          <p className="mt-2 opacity-90">
            API를 통해 자동으로 티스토리에 포스팅합니다!
          </p>
        </div>

        <div className="p-6">
          {/* 토큰 입력 섹션 */}
          {!accessToken && (
            <div className="mb-8 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h2 className="text-xl font-semibold text-yellow-800 mb-4">
                🔑 1단계: 액세스 토큰 입력
              </h2>

              <form onSubmit={handleTokenSubmit} className="mb-4">
                <input
                  type="password"
                  value={accessToken}
                  onChange={(e) => setAccessToken(e.target.value)}
                  placeholder="티스토리 액세스 토큰을 입력하세요"
                  className="w-full p-3 border border-gray-300 rounded-lg mb-3"
                  required
                />
                <button
                  type="submit"
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg"
                >
                  토큰 설정
                </button>
              </form>

              <details className="mt-4">
                <summary className="cursor-pointer text-yellow-700 font-medium">
                  📖 토큰 획득 방법 보기
                </summary>
                <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-x-auto">
                  {getTokenGuide()}
                </pre>
              </details>
            </div>
          )}

          {/* 포스트 내용 */}
          <div className="space-y-6">
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
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>

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
                  className="w-full p-3 border border-gray-300 rounded-lg"
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
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📄 내용
              </label>
              <textarea
                value={post.content}
                onChange={(e) =>
                  setPost((prev) => ({ ...prev, content: e.target.value }))
                }
                rows={20}
                className="w-full p-4 border border-gray-300 rounded-lg font-mono text-sm"
              />
            </div>

            {/* 발행 버튼 */}
            <div className="flex gap-4">
              <button
                onClick={publishPost}
                disabled={isLoading || !accessToken}
                className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg font-medium transition duration-200 flex items-center gap-2"
              >
                {isLoading ? "🔄 발행 중..." : "🚀 자동 발행하기"}
              </button>
            </div>

            {/* 메시지 */}
            {message && (
              <div
                className={`p-4 rounded-lg ${
                  message.includes("✅")
                    ? "bg-green-100 border border-green-400 text-green-700"
                    : message.includes("❌")
                      ? "bg-red-100 border border-red-400 text-red-700"
                      : "bg-blue-100 border border-blue-400 text-blue-700"
                }`}
              >
                <pre className="whitespace-pre-wrap font-sans">{message}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoTistoryPoster;
