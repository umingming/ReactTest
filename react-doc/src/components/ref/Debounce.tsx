import { useRef } from "react";

interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode;
}
function DebouncedButton({ onClick, children }: ButtonProps) {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    return (
        <button
            className="w-60 rounded-md border-2"
            onClick={() => {
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                }
                timeoutRef.current = setTimeout(() => {
                    onClick();
                }, 1000);
            }}
        >
            {children}
        </button>
    );
}

export default function Debounce() {
    return (
        <div className="mt-10 flex flex-col items-center justify-center gap-2">
            <DebouncedButton onClick={() => alert("Spaceship launched!")}>
                Launch the spaceship
            </DebouncedButton>
            <DebouncedButton onClick={() => alert("Soup boiled!")}>
                Boil the soup
            </DebouncedButton>
            <DebouncedButton onClick={() => alert("Lullaby sung!")}>
                Sing a lullaby
            </DebouncedButton>
        </div>
    );
}
