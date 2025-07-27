import React, { useState } from "react";

const EasyTokenFinder: React.FC = () => {
  const [step, setStep] = useState(1);
  const [foundToken, setFoundToken] = useState("");

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    alert("복사되었습니다!");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
        🔍 티스토리 토큰 찾기 - 쉬운 방법들
      </h1>

      {/* 방법 선택 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 border-2 border-green-200 rounded-lg bg-green-50">
          <h3 className="text-xl font-bold text-green-700 mb-3">
            🎯 방법 1: 직접 추출
          </h3>
          <p className="text-green-600 mb-4">브라우저 콘솔에서 바로 추출</p>
          <button
            onClick={() => setStep(1)}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg"
          >
            이 방법 사용
          </button>
        </div>

        <div className="p-6 border-2 border-blue-200 rounded-lg bg-blue-50">
          <h3 className="text-xl font-bold text-blue-700 mb-3">
            🔧 방법 2: Network 탭
          </h3>
          <p className="text-blue-600 mb-4">개발자 도구로 요청 확인</p>
          <button
            onClick={() => setStep(2)}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
          >
            이 방법 사용
          </button>
        </div>

        <div className="p-6 border-2 border-purple-200 rounded-lg bg-purple-50">
          <h3 className="text-xl font-bold text-purple-700 mb-3">
            🤖 방법 3: 자동 스크립트
          </h3>
          <p className="text-purple-600 mb-4">JavaScript로 자동 추출</p>
          <button
            onClick={() => setStep(3)}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg"
          >
            이 방법 사용
          </button>
        </div>
      </div>

      {/* 방법 1: 직접 추출 */}
      {step === 1 && (
        <div className="p-6 bg-green-50 rounded-lg border border-green-200">
          <h2 className="text-2xl font-bold text-green-700 mb-4">
            🎯 방법 1: 브라우저 콘솔 사용
          </h2>

          <div className="space-y-4">
            <div className="p-4 bg-white rounded border">
              <h3 className="font-bold mb-2">
                1단계: 티스토리 관리자 페이지 접속
              </h3>
              <a
                href="https://yumding.tistory.com/manage"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                https://yumding.tistory.com/manage 열기 →
              </a>
            </div>

            <div className="p-4 bg-white rounded border">
              <h3 className="font-bold mb-2">2단계: 개발자 도구 열기</h3>
              <p>F12 키를 누르거나 우클릭 → "검사" 클릭</p>
            </div>

            <div className="p-4 bg-white rounded border">
              <h3 className="font-bold mb-2">
                3단계: Console 탭에서 다음 코드 실행
              </h3>
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm overflow-x-auto">
                <code>{`// 쿠키에서 토큰 찾기
document.cookie.split(';').forEach(cookie => {
  if (cookie.includes('access_token') || cookie.includes('TSSESSION')) {
    console.log('찾은 토큰:', cookie.trim());
  }
});

// 또는 localStorage 확인
Object.keys(localStorage).forEach(key => {
  if (key.includes('token') || key.includes('auth')) {
    console.log('localStorage 토큰:', key, localStorage[key]);
  }
});`}</code>
              </div>
              <button
                onClick={() =>
                  copyToClipboard(`document.cookie.split(';').forEach(cookie => {
  if (cookie.includes('access_token') || cookie.includes('TSSESSION')) {
    console.log('찾은 토큰:', cookie.trim());
  }
});

Object.keys(localStorage).forEach(key => {
  if (key.includes('token') || key.includes('auth')) {
    console.log('localStorage 토큰:', key, localStorage[key]);
  }
});`)
                }
                className="mt-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded"
              >
                📋 코드 복사
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 방법 2: Network 탭 */}
      {step === 2 && (
        <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">
            🔧 방법 2: Network 탭 사용
          </h2>

          <div className="space-y-4">
            <div className="p-4 bg-white rounded border">
              <h3 className="font-bold mb-2">1단계: 글쓰기 페이지 접속</h3>
              <a
                href="https://yumding.tistory.com/manage/newpost"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                https://yumding.tistory.com/manage/newpost 열기 →
              </a>
            </div>

            <div className="p-4 bg-white rounded border">
              <h3 className="font-bold mb-2">
                2단계: 개발자 도구 → Network 탭
              </h3>
              <p>F12 → Network 탭 클릭 → "Clear" 버튼으로 기존 요청 삭제</p>
            </div>

            <div className="p-4 bg-white rounded border">
              <h3 className="font-bold mb-2">3단계: 글 작성 후 임시저장</h3>
              <p>제목: "테스트", 내용: "테스트" 입력 후 "임시저장" 버튼 클릭</p>
            </div>

            <div className="p-4 bg-white rounded border">
              <h3 className="font-bold mb-2">4단계: POST 요청에서 토큰 찾기</h3>
              <p>
                Network 탭에서{" "}
                <code className="bg-gray-200 px-2 py-1 rounded">write</code>{" "}
                또는 <code className="bg-gray-200 px-2 py-1 rounded">save</code>{" "}
                요청 클릭
              </p>
              <p>
                → Form Data 또는 Request Payload에서{" "}
                <code className="bg-gray-200 px-2 py-1 rounded">
                  access_token
                </code>{" "}
                값 확인
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 방법 3: 자동 스크립트 */}
      {step === 3 && (
        <div className="p-6 bg-purple-50 rounded-lg border border-purple-200">
          <h2 className="text-2xl font-bold text-purple-700 mb-4">
            🤖 방법 3: 자동 추출 스크립트
          </h2>

          <div className="space-y-4">
            <div className="p-4 bg-white rounded border">
              <h3 className="font-bold mb-2">북마클릿 사용하기</h3>
              <p className="mb-3">
                아래 링크를 북마크에 추가하고, 티스토리 관리자 페이지에서
                클릭하면 자동으로 토큰을 찾아줍니다.
              </p>

              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs overflow-x-auto mb-3">
                <code>{`javascript:(function(){
  let tokens = [];
  
  // 쿠키 검사
  document.cookie.split(';').forEach(cookie => {
    if (cookie.includes('access_token')) {
      tokens.push('Cookie access_token: ' + cookie.split('=')[1]);
    }
    if (cookie.includes('TSSESSION')) {
      tokens.push('TSSESSION: ' + cookie.split('=')[1]);
    }
  });
  
  // localStorage 검사
  Object.keys(localStorage).forEach(key => {
    if (key.toLowerCase().includes('token') || key.toLowerCase().includes('auth')) {
      tokens.push('localStorage ' + key + ': ' + localStorage[key]);
    }
  });
  
  // 결과 표시
  if (tokens.length > 0) {
    alert('찾은 토큰들:\\n\\n' + tokens.join('\\n'));
  } else {
    alert('토큰을 찾을 수 없습니다. Network 탭 방법을 사용해보세요.');
  }
})();`}</code>
              </div>

              <button
                onClick={() =>
                  copyToClipboard(
                    `javascript:(function(){let tokens = [];document.cookie.split(';').forEach(cookie => {if (cookie.includes('access_token')) {tokens.push('Cookie access_token: ' + cookie.split('=')[1]);}if (cookie.includes('TSSESSION')) {tokens.push('TSSESSION: ' + cookie.split('=')[1]);}});Object.keys(localStorage).forEach(key => {if (key.toLowerCase().includes('token') || key.toLowerCase().includes('auth')) {tokens.push('localStorage ' + key + ': ' + localStorage[key]);}});if (tokens.length > 0) {alert('찾은 토큰들:\\n\\n' + tokens.join('\\n'));} else {alert('토큰을 찾을 수 없습니다. Network 탭 방법을 사용해보세요.');}})();`
                  )
                }
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
              >
                📋 북마클릿 복사
              </button>

              <div className="mt-3 text-sm text-gray-600">
                <p>
                  <strong>사용법:</strong>
                </p>
                <ol className="list-decimal list-inside mt-1">
                  <li>위 코드를 복사</li>
                  <li>브라우저 북마크 추가 → URL에 붙여넣기</li>
                  <li>티스토리 관리자 페이지에서 북마크 클릭</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 토큰 입력 영역 */}
      <div className="mt-8 p-6 bg-gray-50 rounded-lg border">
        <h3 className="text-lg font-bold mb-3">🔑 찾은 토큰 입력하기</h3>
        <div className="flex gap-3">
          <input
            type="text"
            value={foundToken}
            onChange={(e) => setFoundToken(e.target.value)}
            placeholder="찾은 토큰을 여기에 입력하세요"
            className="flex-1 p-3 border border-gray-300 rounded-lg"
          />
          <button
            onClick={() => {
              if (foundToken) {
                localStorage.setItem("tistory_token", foundToken);
                alert(
                  "토큰이 저장되었습니다! 🚀 자동 포스터 탭으로 이동하세요."
                );
              }
            }}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg"
          >
            저장
          </button>
        </div>
      </div>

      {/* 추가 팁 */}
      <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <h4 className="font-bold text-yellow-800 mb-2">💡 추가 팁</h4>
        <ul className="list-disc list-inside text-sm text-yellow-700 space-y-1">
          <li>
            <strong>방법 1</strong>이 가장 빠르고 쉬워요!
          </li>
          <li>
            <strong>방법 2</strong>는 가장 확실하지만 조금 복잡해요
          </li>
          <li>
            <strong>방법 3</strong>은 한 번 설정하면 계속 사용할 수 있어요
          </li>
          <li>토큰이 안 보이면 티스토리에 로그인이 안 된 상태일 수 있어요</li>
        </ul>
      </div>
    </div>
  );
};

export default EasyTokenFinder;
