function App() {
  return (
    <div className="h-dvh relative w-full bg-red-100 flex flex-col">
      {/* <div className="h-100 w-full bg-blue-100">test</div> */}
      <div className="relative">
        <div className="h-100 w-full bg-blue-100">test</div>
        <div className="h-100 w-full bg-blue-200 sticky top-0">test</div>
      </div>
      <div className="flex-1 overflow-auto">
        <div className="h-3000">test</div>
      </div>
    </div>
  );
}

export default App;
