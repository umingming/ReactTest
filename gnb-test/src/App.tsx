import { useState, useEffect, useRef } from "react";

function App() {
  const [scrollY, setScrollY] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const contentElement = contentRef.current;
    if (!contentElement) return;

    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      const currentScrollY = contentElement.scrollTop;

      // GNB 애니메이션용 스크롤 값은 80px로 제한
      const gnbScrollY = Math.min(currentScrollY, 80);
      setScrollY(gnbScrollY);

      // 기존 타임아웃 클리어
      clearTimeout(timeoutId);

      // 스크롤이 멈춘 후 정확한 위치로 재조정
      timeoutId = setTimeout(() => {
        const finalScrollY = Math.min(contentElement.scrollTop, 80);
        setScrollY(finalScrollY);
      }, 50);
    };

    contentElement.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      contentElement.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="h-dvh flex flex-col">
      {/* 통합 GNB 섹션 */}
      <div
        className="transition-transform duration-200 ease-out"
        style={{
          height: `${Math.max(60, 140 - scrollY)}px`,
          transform: `translateY(-${Math.min(scrollY, 80)}px)`,
        }}
      >
        {/* 최상단 GNB */}
        <div className="h-80 bg-blue-600 text-white">
          <div className="flex items-center justify-between px-6 h-full">
            <div className="text-xl font-bold">LOGO</div>
            <div className="flex space-x-4">
              <button className="px-4 py-2 bg-blue-500 rounded">로그인</button>
              <button className="px-4 py-2 bg-green-500 rounded">
                회원가입
              </button>
            </div>
          </div>
        </div>

        {/* 두번째 GNB */}
        <div className="h-60 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-6 h-full">
            <nav className="flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600">
                카테고리1
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600">
                카테고리2
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600">
                카테고리3
              </a>
            </nav>
            <div>
              <input
                type="text"
                placeholder="검색..."
                className="px-3 py-1 border rounded text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 컨텐츠 영역 */}
      <div ref={contentRef} className="flex-1 overflow-y-auto">
        <div className="h-96 bg-purple-400 flex items-center justify-center">
          <h1 className="text-4xl text-white font-bold">메인 배너</h1>
        </div>

        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} className="p-8 border-b">
            <h2 className="text-2xl font-bold mb-4">섹션 {i + 1}</h2>
            <p className="text-gray-600 mb-4">스크롤 테스트 컨텐츠입니다.</p>
            <div className="h-40 bg-gray-100 rounded"></div>
          </div>
        ))}

        <div className="bg-gray-800 text-white p-8 text-center">
          <p>스크롤 위치: {scrollY}px</p>
        </div>
      </div>
    </div>
  );
}

export default App;
