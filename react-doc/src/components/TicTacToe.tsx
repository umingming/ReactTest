import { useState } from "react";

type SquareValue = null | string;
interface SquareProps {
    value: SquareValue;
    onClick: () => void;
}

function Square({ value, onClick }: SquareProps) {
    return (
        <button
            className="h-10 w-10 overflow-hidden bg-blue-50"
            onClick={onClick}
        >
            {value}
        </button>
    );
}

interface BoardProps {
    turn: string;
    squares: SquareValue[];
    onPlay: (squares: SquareValue[]) => void;
}

function Board({ turn, squares, onPlay }: BoardProps) {
    function updateSquares(index: number) {
        if (squares[index] || calculateWinner(squares)) return;

        const nextSquares = squares.slice();
        nextSquares[index] = turn;
        onPlay(nextSquares);
    }

    // useMemo는 불필요한 재계산 방지이므로 간단한 경우에는 사용하지 않음!
    const winner = calculateWinner(squares);
    const status = winner ? `Winner: ${winner}` : `Next player: ${turn}`;

    return (
        <div className="relative w-32">
            <div>{status}</div>
            <div className="grid grid-cols-3 gap-1">
                {squares.map((square, index) => (
                    <Square
                        key={index}
                        value={square}
                        onClick={() => updateSquares(index)}
                    />
                ))}
            </div>
        </div>
    );
}

function calculateWinner(squares: SquareValue[]) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    function isWinningLine([a, b, c]: number[]) {
        return (
            squares[a] && squares[a] === squares[b] && squares[a] === squares[c]
        );
    }

    const winningLine = lines.find(isWinningLine);
    return winningLine ? squares[winningLine[0]] : null;
}

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);

    const currentSquares = history[currentMove] as SquareValue[];
    // 중복되는 state는 피할 것
    const nextTurn = currentMove % 2 ? "O" : "X";

    function handlePlay(nextSquares: SquareValue[]) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove: number) {
        setCurrentMove(nextMove);
    }

    const moves = history.map((_, index) => {
        const description = index ? `Go to move #${index}` : "Go to game start";
        return (
            <li key={index}>
                <button
                    className="rounded-md border px-2"
                    onClick={() => jumpTo(index)}
                >
                    {description}
                </button>
            </li>
        );
    });

    return (
        <div className="flex gap-5">
            <Board
                turn={nextTurn}
                squares={currentSquares}
                onPlay={handlePlay}
            />
            <div className="mt-3">
                <ol className="flex list-decimal flex-col">{moves}</ol>
            </div>
        </div>
    );
}
