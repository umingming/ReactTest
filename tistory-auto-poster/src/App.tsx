import React, { useState } from "react";
import "./App.css";
import AutoTistoryPoster from "./components/AutoTistoryPoster";
import TokenExtractor from "./components/TokenExtractor";
import EasyTokenFinder from "./components/EasyTokenFinder";

function App() {
  const [activeTab, setActiveTab] = useState<"finder" | "extractor" | "poster">(
    "finder"
  );

  return (
    <div className="App min-h-screen bg-gray-50">
      {/* 탭 네비게이션 */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => setActiveTab("finder")}
              className={`px-6 py-2 rounded-lg font-medium transition duration-200 ${
                activeTab === "finder"
                  ? "bg-green-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              🎯 쉬운 토큰 찾기
            </button>
            <button
              onClick={() => setActiveTab("extractor")}
              className={`px-6 py-2 rounded-lg font-medium transition duration-200 ${
                activeTab === "extractor"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              🔍 토큰 추출기
            </button>
            <button
              onClick={() => setActiveTab("poster")}
              className={`px-6 py-2 rounded-lg font-medium transition duration-200 ${
                activeTab === "poster"
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              🚀 자동 포스터
            </button>
          </div>
        </div>
      </div>

      {/* 탭 컨텐츠 */}
      <div className="py-6">
        {activeTab === "finder" && <EasyTokenFinder />}
        {activeTab === "extractor" && <TokenExtractor />}
        {activeTab === "poster" && <AutoTistoryPoster />}
      </div>
    </div>
  );
}

export default App;
