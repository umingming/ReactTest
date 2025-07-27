import React, { useState } from "react";

const TokenExtractor: React.FC = () => {
  const [cookies, setCookies] = useState("");
  const [extractedToken, setExtractedToken] = useState("");

  const extractToken = () => {
    // 쿠키에서 토큰 관련 정보 추출 시도
    const tokenPatterns = [
      /access_token=([^;]+)/,
      /token=([^;]+)/,
      /TSSESSION=([^;]+)/,
      /_T_ANO=([^;]+)/,
    ];

    for (const pattern of tokenPatterns) {
      const match = cookies.match(pattern);
      if (match) {
        setExtractedToken(match[1]);
        return;
      }
    }

    setExtractedToken("토큰을 찾을 수 없습니다. 다른 방법을 시도해보세요.");
  };

  const copyToken = async () => {
    if (extractedToken && !extractedToken.includes("찾을 수 없습니다")) {
      await navigator.clipboard.writeText(extractedToken);
      alert("토큰이 복사되었습니다!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">🔍 토큰 추출기</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            쿠키 정보 붙여넣기:
          </label>
          <textarea
            value={cookies}
            onChange={(e) => setCookies(e.target.value)}
            rows={5}
            className="w-full p-3 border border-gray-300 rounded-lg text-xs"
            placeholder="브라우저에서 복사한 쿠키 정보를 여기에 붙여넣으세요"
          />
        </div>

        <button
          onClick={extractToken}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          토큰 추출하기
        </button>

        {extractedToken && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              추출된 토큰:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={extractedToken}
                readOnly
                className="flex-1 p-2 border border-gray-300 rounded text-xs"
              />
              {!extractedToken.includes("찾을 수 없습니다") && (
                <button
                  onClick={copyToken}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                >
                  복사
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <h3 className="font-semibold text-yellow-800 mb-2">
          💡 더 확실한 방법:
        </h3>
        <ol className="list-decimal list-inside text-sm text-yellow-700 space-y-1">
          <li>티스토리 관리자 페이지에서 F12 → Network 탭</li>
          <li>글 작성/수정 시도</li>
          <li>POST 요청에서 access_token 찾기</li>
          <li>그 값을 메인 앱에 입력</li>
        </ol>
      </div>
    </div>
  );
};

export default TokenExtractor;
