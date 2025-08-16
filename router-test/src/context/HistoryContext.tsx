import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

interface HistoryContextType {
  previousPath: string | null;
  historyStack: string[];
}

const HistoryContext = createContext<HistoryContextType>({
  previousPath: null,
  historyStack: ["/"],
});

export const useHistoryContext = () => useContext(HistoryContext);

interface HistoryProviderProps {
  children: React.ReactNode;
}

export const HistoryProvider: React.FC<HistoryProviderProps> = ({
  children,
}) => {
  const location = useLocation();
  const [historyStack, setHistoryStack] = useState<string[]>(["/"]);
  const [previousPath, setPreviousPath] = useState<string | null>(null);

  useEffect(() => {
    const currentPath = location.pathname;

    setHistoryStack((prevStack) => {
      const newStack = [...prevStack];
      const currentIndex = newStack.lastIndexOf(currentPath);

      if (currentIndex === -1) {
        // 새로운 페이지로 이동
        newStack.push(currentPath);
      } else if (currentIndex === newStack.length - 2) {
        // 뒤로가기
        newStack.pop();
      }

      // 이전 페이지 경로 설정
      if (newStack.length > 1) {
        setPreviousPath(newStack[newStack.length - 2]);
      } else {
        setPreviousPath(null);
      }

      return newStack;
    });
  }, [location.pathname]);

  return (
    <HistoryContext.Provider value={{ previousPath, historyStack }}>
      {children}
    </HistoryContext.Provider>
  );
};
