import { useState } from "react";

export default function Form() {
    const [value, setValue] = useState<string|number>("");
    
    function changeValue(event: React.FormEvent<HTMLInputElement>) {
        const {
            currentTarget: { value }
        } = event;
        setValue(value);
    }
    function submitValue(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault
        console.log(event);
    }

    return (
        <div>
            <form onSubmit={submitValue}>
                <input 
                    value={value}
                    onChange={changeValue}
                    type="text"
                />
                <button>enter</button>
            </form>

        </div>
    )
}