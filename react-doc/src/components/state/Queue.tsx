import { useState } from "react";

export default function Queue() {
    const [pending, setPending] = useState(0);
    const [completed, setCompleted] = useState(0);

    function handleClick() {
        setPending(pending + 1);
        delay(3000).then(() => {
            setPending((pending) => pending - 1);
            setCompleted((completed) => completed + 1);
        });
    }

    return (
        <>
            <h3>Pending: {pending}</h3>
            <h3>Completed: {completed}</h3>
            <button onClick={handleClick}>Buy</button>
        </>
    );
}

function delay(ms: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
