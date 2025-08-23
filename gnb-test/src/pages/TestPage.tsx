function TestPage() {
  return (
    <div
      className="h-dvh bg-gray-50 flex flex-col overflow-y-scroll relative"
      style={{ WebkitTransform: "translateZ(0)" }}
    >
      <div className="w-full bg-amber-900 flex items-center justify-center z-10 sticky top-0">
        <div className="h-100 text-white font-bold flex items-center justify-center">
          고정 헤더 (배경색 있음)
        </div>
      </div>

      {/* 비교용 - 배경색 없는 스티키 */}
      <div className="w-full flex items-center justify-center z-10 sticky top-100">
        <div className="h-100 font-bold flex items-center justify-center">
          투명 헤더 (배경색 없음)
        </div>
      </div>
      <div className="p-8">
        <h1 className="text-4xl font-bold h-100 text-gray-800 mb-4 text-center flex items-center justify-center">
          테스트 페이지
        </h1>
        <div className="text-gray-600 h-300 bg-red-100 mb-4 flex items-center justify-center">
          섹션 1
        </div>
        <div className="text-gray-600 h-300 bg-blue-100 mb-4 flex items-center justify-center">
          섹션 2
        </div>
        <div className="text-gray-600 h-300 bg-green-100 mb-4 flex items-center justify-center">
          섹션 3
        </div>
        <div className="text-gray-600 h-300 bg-yellow-100 mb-4 flex items-center justify-center">
          섹션 4
        </div>
      </div>
    </div>
  );
}

export default TestPage;
