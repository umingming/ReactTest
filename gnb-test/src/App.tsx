import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import TestPage from "./pages/TestPage";

function GnbTestPage() {
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
              <Link
                to="/test"
                className="px-4 py-2 bg-green-500 rounded hover:bg-green-400"
              >
                테스트 페이지
              </Link>
              <button className="px-4 py-2 bg-blue-500 rounded">로그인</button>
            </div>
          </div>
        </div>

        {/* 두번째 GNB */}
        <div className="h-60 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-6 h-full">
            <nav className="flex space-x-8">
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 font-bold"
              >
                Transform 버전
              </Link>
              <Link to="/sticky" className="text-gray-700 hover:text-blue-600">
                Sticky 버전
              </Link>
              <Link to="/test" className="text-gray-700 hover:text-blue-600">
                테스트
              </Link>
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
          <h1 className="text-4xl text-white font-bold">GNB 테스트 페이지</h1>
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

function StickyGnbPage() {
  return (
    <div className="h-dvh overflow-y-auto">
      {/* 최상단 GNB - 스크롤 시 사라짐 */}
      <div className="h-80 bg-blue-600 text-white">
        <div className="flex items-center justify-between px-6 h-full">
          <div className="text-xl font-bold">LOGO</div>
          <div className="flex space-x-4">
            <Link
              to="/test"
              className="px-4 py-2 bg-green-500 rounded hover:bg-green-400"
            >
              테스트 페이지
            </Link>
            <button className="px-4 py-2 bg-blue-500 rounded">로그인</button>
          </div>
        </div>
      </div>

      {/* 두번째 GNB - 스티키로 상단 고정 */}
      <div className="h-60 bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center justify-between px-6 h-full">
          <nav className="flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600">
              Transform 버전
            </Link>
            <Link
              to="/sticky"
              className="text-gray-700 hover:text-blue-600 font-bold"
            >
              Sticky 버전
            </Link>
            <Link to="/test" className="text-gray-700 hover:text-blue-600">
              테스트
            </Link>
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

      {/* 컨텐츠 영역 */}
      <div className="bg-green-400 h-96 flex items-center justify-center">
        <h1 className="text-4xl text-white font-bold">CSS Sticky 버전</h1>
      </div>

      {Array.from({ length: 10 }, (_, i) => (
        <div key={i} className="p-8 border-b">
          <h2 className="text-2xl font-bold mb-4">섹션 {i + 1}</h2>
          <p className="text-gray-600 mb-4">
            CSS Sticky만으로 구현한 간단한 GNB입니다. JavaScript 없이도 두번째
            GNB가 상단에 고정됩니다.
          </p>
          <div className="h-40 bg-gray-100 rounded flex items-center justify-center">
            <span className="text-gray-500">컨텐츠 {i + 1}</span>
          </div>
        </div>
      ))}

      <div className="bg-gray-800 text-white p-8 text-center">
        <h3 className="text-xl font-bold mb-4">CSS Sticky의 장점</h3>
        <ul className="text-left max-w-md mx-auto space-y-2">
          <li>• JavaScript 불필요</li>
          <li>• 성능 최적화</li>
          <li>• 브라우저 네이티브 지원</li>
          <li>• 코드 간소화</li>
        </ul>
      </div>
    </div>
  );
}

function GradientStickyGnbPage() {
  return (
    <div className="h-dvh overflow-y-auto">
      {/* 최상단 GNB - 스크롤 시 사라짐 */}
      <div className="h-80 bg-blue-600 text-white">
        <div className="flex items-center justify-between px-6 h-full">
          <div className="text-xl font-bold">LOGO</div>
          <div className="flex space-x-4">
            <Link
              to="/test"
              className="px-4 py-2 bg-green-500 rounded hover:bg-green-400"
            >
              테스트 페이지
            </Link>
            <button className="px-4 py-2 bg-blue-500 rounded">로그인</button>
          </div>
        </div>
      </div>

      {/* 두번째 GNB - 그라데이션 효과 */}
      <div className="h-60 bg-gradient-to-b from-white via-white/95 to-transparent border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center justify-between px-6 h-full bg-white/80 backdrop-blur-md rounded-b-lg mx-4">
          <nav className="flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600">
              Transform 버전
            </Link>
            <Link to="/sticky" className="text-gray-700 hover:text-blue-600">
              Sticky 버전
            </Link>
            <Link
              to="/gradient"
              className="text-gray-700 hover:text-blue-600 font-bold"
            >
              그라데이션 버전
            </Link>
            <Link to="/test" className="text-gray-700 hover:text-blue-600">
              테스트
            </Link>
          </nav>
          <div>
            <input
              type="text"
              placeholder="검색..."
              className="px-3 py-1 border rounded text-sm bg-white/90"
            />
          </div>
        </div>
      </div>

      {/* 컨텐츠 영역 */}
      <div className="bg-orange-400 h-96 flex items-center justify-center">
        <h1 className="text-4xl text-white font-bold">
          그라데이션 Sticky 버전
        </h1>
      </div>

      {Array.from({ length: 10 }, (_, i) => (
        <div key={i} className="p-8 border-b">
          <h2 className="text-2xl font-bold mb-4">섹션 {i + 1}</h2>
          <p className="text-gray-600 mb-4">
            그라데이션과 backdrop-blur로 스크롤되는 컨텐츠가 살짝 보이도록
            구현했습니다.
          </p>
          <div className="h-40 bg-gradient-to-r from-blue-100 to-purple-100 rounded flex items-center justify-center">
            <span className="text-gray-700 font-medium">컨텐츠 {i + 1}</span>
          </div>
        </div>
      ))}

      <div className="bg-gray-800 text-white p-8 text-center">
        <h3 className="text-xl font-bold mb-4">해결 방법들</h3>
        <ul className="text-left max-w-lg mx-auto space-y-2">
          <li>
            • <strong>반투명 배경:</strong> bg-white/90
          </li>
          <li>
            • <strong>백드롭 블러:</strong> backdrop-blur-sm
          </li>
          <li>
            • <strong>그라데이션:</strong> from-white to-transparent
          </li>
          <li>
            • <strong>둥근 모서리:</strong> 시각적 분리감
          </li>
        </ul>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GnbTestPage />} />
        <Route path="/sticky" element={<StickyGnbPage />} />
        <Route path="/gradient" element={<GradientStickyGnbPage />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </Router>
  );
}

export default App;
