import { useState } from "react";

interface SquareProps {
    value: string;
}

function Square() {
    const [value, setValue] = useState(" ");

    const handleClick = () => setValue("X");

    return (
        <button className="square" onClick={handleClick}>
            {value}
        </button>
    );
}

export default function Board() {
    return (
        <>
            <div className="board-row">
                <Square />
                <Square />
                <Square />
            </div>
            <div className="board-row">
                <Square />
                <Square />
                <Square />
            </div>
            <div className="board-row">
                <Square />
                <Square />
                <Square />
            </div>
        </>
    );
}
