type Increment = (n: number) => number;

const increment: Increment = (n) => n + 1;
increment.toString = () => "n => n+1";

export default function State() {
    return (
        <>
            <TestCase baseState={0} queue={[1, 1, 1]} expected={1} />
            <hr />
            <TestCase
                baseState={0}
                queue={[increment, increment, increment]}
                expected={3}
            />
            <hr />
            <TestCase baseState={0} queue={[5, increment]} expected={6} />
            <hr />
            <TestCase baseState={0} queue={[5, increment, 42]} expected={42} />
        </>
    );
}

interface TestCaseProps {
    baseState: number;
    queue: (number | Increment)[];
    expected: number;
}

function TestCase({ baseState, queue, expected }: TestCaseProps) {
    const actual = getFinalState(baseState, queue);
    return (
        <>
            <p>
                Base state: <b>{baseState}</b>
            </p>
            <p>
                Queue: <b>[{queue.join(", ")}]</b>
            </p>
            <p>
                Expected result: <b>{expected}</b>
            </p>
            <p
                style={{
                    color: actual === expected ? "green" : "red",
                }}
            >
                Your result: <b>{actual}</b> (
                {actual === expected ? "correct" : "wrong"})
            </p>
        </>
    );
}

function getFinalState(baseState: number, queue: (number | Increment)[]) {
    let finalState = baseState;

    for (const update of queue) {
        if (typeof update === "number") {
            finalState = update;
        } else {
            finalState = update(finalState);
        }
    }

    return finalState;
}
