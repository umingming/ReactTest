import React, { useState } from "react";
import {
  CelebrityInfo,
  calculateCelebritySaju,
  generateCelebritySajuInterpretation,
  generateRandomCelebrity,
} from "../utils/celebritySaju";

const CelebritySajuGenerator: React.FC = () => {
  const [celebrityInfo, setCelebrityInfo] = useState<CelebrityInfo>({
    name: "",
    year: 1995,
    month: 1,
    day: 1,
    hour: 12,
    gender: "F",
    profession: "아이돌",
    group: "",
    agency: "",
    debutYear: 2020,
  });

  const [generatedContent, setGeneratedContent] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // 폼 입력 처리
  const handleInputChange = (
    field: keyof CelebrityInfo,
    value: string | number
  ) => {
    setCelebrityInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // 사주 생성
  const generateSaju = () => {
    if (!celebrityInfo.name.trim()) {
      alert("연예인 이름을 입력해주세요!");
      return;
    }

    setIsGenerating(true);

    // 약간의 지연 효과 (생성하는 느낌)
    setTimeout(() => {
      const sajuData = calculateCelebritySaju(celebrityInfo);
      const interpretation = generateCelebritySajuInterpretation(
        celebrityInfo,
        sajuData
      );
      setGeneratedContent(interpretation);
      setIsGenerating(false);
    }, 1500);
  };

  // 랜덤 연예인 생성
  const generateRandomCeleb = () => {
    const randomCeleb = generateRandomCelebrity();
    setCelebrityInfo(randomCeleb);
  };

  // 클립보드 복사
  const copyToClipboard = async () => {
    if (generatedContent) {
      await navigator.clipboard.writeText(generatedContent);
      alert(
        "포스트가 클립보드에 복사되었습니다! 포스타입에 붙여넣기 하세요! 📋"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
            🔮✨ 연예인 사주 자동 생성기 ✨🔮
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            팬들이 열광할 자극적이고 긴 연예인 사주 해석을 자동으로
            생성해보세요!
          </p>
          <p className="text-sm text-gray-500">
            포스타입에 바로 올릴 수 있는 완성된 포스트를 만들어드려요! 🚀
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 입력 폼 */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              📝 연예인 정보 입력
            </h2>

            <div className="space-y-4">
              {/* 기본 정보 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    🌟 이름 *
                  </label>
                  <input
                    type="text"
                    value={celebrityInfo.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="예: 아이유, 방탄소년단 지민"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    🎭 직업
                  </label>
                  <select
                    value={celebrityInfo.profession}
                    onChange={(e) =>
                      handleInputChange("profession", e.target.value)
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="아이돌">아이돌</option>
                    <option value="가수">가수</option>
                    <option value="배우">배우</option>
                    <option value="래퍼">래퍼</option>
                    <option value="댄서">댄서</option>
                    <option value="방송인">방송인</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    👥 그룹명 (선택)
                  </label>
                  <input
                    type="text"
                    value={celebrityInfo.group || ""}
                    onChange={(e) => handleInputChange("group", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="예: BTS, BLACKPINK"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    🏢 소속사 (선택)
                  </label>
                  <input
                    type="text"
                    value={celebrityInfo.agency || ""}
                    onChange={(e) =>
                      handleInputChange("agency", e.target.value)
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="예: HYBE, YG엔터테인먼트"
                  />
                </div>
              </div>

              {/* 생년월일 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    📅 출생년도
                  </label>
                  <input
                    type="number"
                    value={celebrityInfo.year}
                    onChange={(e) =>
                      handleInputChange("year", parseInt(e.target.value))
                    }
                    min="1980"
                    max="2010"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    📅 월
                  </label>
                  <input
                    type="number"
                    value={celebrityInfo.month}
                    onChange={(e) =>
                      handleInputChange("month", parseInt(e.target.value))
                    }
                    min="1"
                    max="12"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    📅 일
                  </label>
                  <input
                    type="number"
                    value={celebrityInfo.day}
                    onChange={(e) =>
                      handleInputChange("day", parseInt(e.target.value))
                    }
                    min="1"
                    max="31"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ⚧️ 성별
                  </label>
                  <select
                    value={celebrityInfo.gender}
                    onChange={(e) =>
                      handleInputChange("gender", e.target.value as "M" | "F")
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="F">여성</option>
                    <option value="M">남성</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  🎬 데뷔년도 (선택)
                </label>
                <input
                  type="number"
                  value={celebrityInfo.debutYear || ""}
                  onChange={(e) =>
                    handleInputChange("debutYear", parseInt(e.target.value))
                  }
                  min="2000"
                  max="2024"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="예: 2019"
                />
              </div>

              {/* 버튼들 */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={generateRandomCeleb}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105"
                >
                  🎲 랜덤 연예인
                </button>

                <button
                  onClick={generateSaju}
                  disabled={isGenerating}
                  className="flex-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 disabled:scale-100"
                >
                  {isGenerating ? "🔮 생성 중..." : "✨ 사주 생성하기"}
                </button>
              </div>
            </div>
          </div>

          {/* 결과 표시 */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                📄 생성된 포스트
              </h2>
              {generatedContent && (
                <button
                  onClick={copyToClipboard}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-200 flex items-center gap-2"
                >
                  📋 복사하기
                </button>
              )}
            </div>

            <div className="h-96 overflow-y-auto">
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mb-4"></div>
                  <p className="text-gray-600">
                    ✨ 마법같은 사주 해석을 생성하고 있어요...
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    팬들이 열광할 내용으로 준비 중! 🔥
                  </p>
                </div>
              ) : generatedContent ? (
                <div className="prose max-w-none">
                  <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded-lg border">
                    {generatedContent}
                  </pre>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <div className="text-6xl mb-4">🔮</div>
                  <p className="text-lg font-medium">연예인 정보를 입력하고</p>
                  <p className="text-lg font-medium">
                    "✨ 사주 생성하기" 버튼을 눌러보세요!
                  </p>
                  <p className="text-sm mt-4 text-center">
                    팬들이 좋아할 자극적이고 긴 사주 해석을
                    <br />
                    자동으로 만들어드려요! 📝✨
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 사용법 안내 */}
        <div className="max-w-4xl mx-auto mt-12 bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            📖 사용법 및 특징
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-purple-600 mb-4">
                🚀 주요 특징
              </h4>
              <ul className="space-y-2 text-gray-700">
                <li>
                  ✅ <strong>초장문 포스트</strong>: 3000자 이상의 풍부한 내용
                </li>
                <li>
                  ✅ <strong>자극적인 내용</strong>: 연애, 스캔들, 숨겨진 성격
                  등
                </li>
                <li>
                  ✅ <strong>팬 맞춤형</strong>: 팬들이 좋아할 표현과 이모지
                  활용
                </li>
                <li>
                  ✅ <strong>SEO 최적화</strong>: 해시태그와 키워드 자동 포함
                </li>
                <li>
                  ✅ <strong>포스타입 최적화</strong>: 마크다운 형식으로 생성
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-pink-600 mb-4">
                📝 사용법
              </h4>
              <ol className="space-y-2 text-gray-700">
                <li>
                  <strong>1단계:</strong> 연예인 정보 입력 (이름은 필수)
                </li>
                <li>
                  <strong>2단계:</strong> "✨ 사주 생성하기" 클릭
                </li>
                <li>
                  <strong>3단계:</strong> "📋 복사하기"로 클립보드에 복사
                </li>
                <li>
                  <strong>4단계:</strong> 포스타입에 붙여넣기 후 발행
                </li>
                <li>
                  <strong>5단계:</strong> 팬들의 뜨거운 반응 확인! 🔥
                </li>
              </ol>
            </div>
          </div>

          <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-800 mb-2">⚠️ 주의사항</h4>
            <p className="text-sm text-yellow-700">
              생성된 사주 해석은 엔터테인먼트 목적으로만 사용하세요. 실제
              연예인의 사생활과는 관련이 없으며, 모든 내용은 창작물입니다.
              포스팅 시 "재미로 보는 사주 해석" 등의 문구를 추가하는 것을
              권장합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CelebritySajuGenerator;
