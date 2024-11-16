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

function Board() {
    const [xIsNext, setXIsNext] = useState(true);
    const [squares, setSquares] = useState(Array(9).fill(null));

    const nextTurn = xIsNext ? "X" : "O";

    function updateSquares(index: number) {
        if (squares[index] || calculateWinner(squares)) return;

        const nextSquares = squares.slice();
        nextSquares[index] = nextTurn;
        setSquares(nextSquares);
        setXIsNext(!xIsNext);
    }

    // useMemo는 불필요한 재계산 방지이므로 간단한 경우에는 사용하지 않음!
    const winner = calculateWinner(squares);
    const status = winner ? `Winner: ${winner}` : `Next player: ${nextTurn}`;

    return (
        <>
            <div>{status}</div>
            <div className="flex flex-col gap-1">
                <div className="flex gap-1">
                    <Square
                        value={squares[0]}
                        onClick={() => updateSquares(0)}
                    />
                    <Square
                        value={squares[2]}
                        onClick={() => updateSquares(2)}
                    />
                    <Square
                        value={squares[1]}
                        onClick={() => updateSquares(1)}
                    />
                </div>
                <div className="flex gap-1">
                    <Square
                        value={squares[3]}
                        onClick={() => updateSquares(3)}
                    />
                    <Square
                        value={squares[4]}
                        onClick={() => updateSquares(4)}
                    />
                    <Square
                        value={squares[5]}
                        onClick={() => updateSquares(5)}
                    />
                </div>
                <div className="flex gap-1">
                    <Square
                        value={squares[6]}
                        onClick={() => updateSquares(6)}
                    />
                    <Square
                        value={squares[7]}
                        onClick={() => updateSquares(7)}
                    />
                    <Square
                        value={squares[8]}
                        onClick={() => updateSquares(8)}
                    />
                </div>
            </div>
        </>
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
    return (
        <div>
            <Board />
        </div>
    );
}
