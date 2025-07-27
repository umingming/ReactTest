import React, { useState, useEffect } from "react";
import tistoryApi, { TistoryPost } from "../services/tistoryApi";

interface Category {
  id: string;
  name: string;
}

const TistoryPoster: React.FC = () => {
  const [accessToken, setAccessToken] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 포스트 입력 상태
  const [post, setPost] = useState<TistoryPost>({
    title: "",
    content: "",
    visibility: "2",
    category: "",
    tag: "",
  });

  // URL에서 인증 코드 확인
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code && !accessToken) {
      handleAuthCallback(code);
    }
  }, [accessToken]);

  // 저장된 토큰 확인
  useEffect(() => {
    const savedToken = localStorage.getItem("tistory_access_token");
    if (savedToken) {
      setAccessToken(savedToken);
      setIsAuthenticated(true);
      loadCategories(savedToken);
    }
  }, []);

  // 인증 콜백 처리
  const handleAuthCallback = async (code: string) => {
    try {
      setIsLoading(true);
      const token = await tistoryApi.getAccessToken(code);
      setAccessToken(token);
      setIsAuthenticated(true);
      localStorage.setItem("tistory_access_token", token);

      // URL에서 코드 파라미터 제거
      window.history.replaceState({}, document.title, window.location.pathname);

      await loadCategories(token);
    } catch (error) {
      console.error("인증 실패:", error);
      alert("인증에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  // 카테고리 로드
  const loadCategories = async (token: string) => {
    try {
      const response = await tistoryApi.getCategories(token);
      if (response.tistory?.item?.categories) {
        setCategories(response.tistory.item.categories);
      }
    } catch (error) {
      console.error("카테고리 로드 실패:", error);
    }
  };

  // 티스토리 인증
  const handleAuth = () => {
    const authUrl = tistoryApi.getAuthUrl();
    window.location.href = authUrl;
  };

  // 로그아웃
  const handleLogout = () => {
    localStorage.removeItem("tistory_access_token");
    setAccessToken("");
    setIsAuthenticated(false);
    setCategories([]);
  };

  // 포스트 작성
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!post.title.trim() || !post.content.trim()) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await tistoryApi.createPost(accessToken, post);

      if (response.tistory?.status === "200") {
        alert("포스트가 성공적으로 작성되었습니다!");
        // 폼 초기화
        setPost({
          title: "",
          content: "",
          visibility: "2",
          category: "",
          tag: "",
        });
      } else {
        throw new Error("포스트 작성에 실패했습니다.");
      }
    } catch (error) {
      console.error("포스트 작성 실패:", error);
      alert("포스트 작성에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  // 대화 내용 자동 정리 (MVP 기능)
  const formatConversation = () => {
    const today = new Date().toISOString().split("T")[0];
    const template = `# ${today} - AI 대화 정리

## 주요 내용
- 

## 학습한 기술
- 

## 코드 예시
\`\`\`javascript
// 여기에 코드 입력
\`\`\`

## 참고 링크
- 

---
*AI와의 대화를 통해 학습한 내용을 정리했습니다.*`;

    setPost((prev) => ({
      ...prev,
      title: `${today} - AI 학습 정리`,
      content: template,
    }));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">로딩 중...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          티스토리 자동 포스터
        </h1>
        <p className="text-gray-600 mb-4 text-center">
          티스토리 블로그에 자동으로 포스트를 작성할 수 있습니다.
        </p>
        <button
          onClick={handleAuth}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition duration-200"
        >
          티스토리 연동하기
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">티스토리 포스트 작성</h1>
            <button
              onClick={handleLogout}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition duration-200"
            >
              로그아웃
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <button
              type="button"
              onClick={formatConversation}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mb-4 transition duration-200"
            >
              📝 대화 정리 템플릿 생성
            </button>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              제목
            </label>
            <input
              type="text"
              value={post.title}
              onChange={(e) =>
                setPost((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="포스트 제목을 입력하세요"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              내용
            </label>
            <textarea
              value={post.content}
              onChange={(e) =>
                setPost((prev) => ({ ...prev, content: e.target.value }))
              }
              rows={15}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="포스트 내용을 입력하세요 (HTML, 마크다운 지원)"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                공개 설정
              </label>
              <select
                value={post.visibility}
                onChange={(e) =>
                  setPost((prev) => ({
                    ...prev,
                    visibility: e.target.value as any,
                  }))
                }
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="2">발행</option>
                <option value="1">보호</option>
                <option value="0">비공개</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                카테고리
              </label>
              <select
                value={post.category}
                onChange={(e) =>
                  setPost((prev) => ({ ...prev, category: e.target.value }))
                }
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">카테고리 선택</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                태그
              </label>
              <input
                type="text"
                value={post.tag}
                onChange={(e) =>
                  setPost((prev) => ({ ...prev, tag: e.target.value }))
                }
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="태그1, 태그2, 태그3"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded transition duration-200"
          >
            {isLoading ? "포스트 작성 중..." : "포스트 작성하기"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TistoryPoster;
