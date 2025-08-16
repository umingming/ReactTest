function App() {
  return (
    <div className="h-dvh relative w-full bg-red-100 flex flex-col overflow-auto">
      {/* <div className="h-100 w-full bg-blue-100">test</div> */}
      <div className="h-100 w-full bg-blue-100 sticky top-0">
        <div className="h-100 w-full bg-blue-100">test</div>
        <div className="h-100 w-full bg-blue-200 sticky top-0">test</div>
      </div>
      <div className="">
        <div className="h-3000">test</div>
      </div>
    </div>
  );
}

export default App;
