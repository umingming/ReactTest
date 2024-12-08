import { useRef, useState } from "react";

export default function Chat() {
    const [text, setText] = useState("");

    //현재 텍스트를 추적하는 두 가지 방법
    const textRef = useRef(text);
    const inputRef = useRef<HTMLInputElement>(null);

    const [isSending, setIsSending] = useState(false);

    // 구성요소가 랜더링될 때마다 로컬 변수가 처음부터 초기화됨. 로컬 변수에 저장하면 다음 핸들러는 저장된 값이 아닌 null을 보게 됨.
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    function handleChange({
        target: { value },
    }: React.ChangeEvent<HTMLInputElement>) {
        setText(value);
        textRef.current = value;
    }

    function handleSend() {
        setIsSending(true);
        timeoutRef.current = setTimeout(() => {
            alert("Sent!" + inputRef.current?.value);
            setIsSending(false);
        }, 3000);
    }

    function handleUndo() {
        setIsSending(false);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }

    return (
        <>
            <input ref={inputRef} value={text} onChange={handleChange} />
            <button disabled={isSending} onClick={handleSend}>
                {isSending ? "Sending..." : "Send"}
            </button>
            {isSending && <button onClick={handleUndo}>Undo</button>}
        </>
    );
}
