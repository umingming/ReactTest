import { useState } from "react";
import { useForm } from "react-hook-form";

// export function ToDoList() {
//     const [toDo, setToDo] = useState("");
//     const changeToDo = (event: React.FormEvent<HTMLInputElement>) => {
//         const {
//             currentTarget: { value }
//         } = event;
//         setToDo(value);
//     }
//     const submitToDo = (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();
//         console.log(toDo)
//     }

//     return (
//         <div>
//             <form onSubmit={submitToDo}>
//                 <input onChange={changeToDo} value={toDo} placeholder="Write a to do" />
//                 <button>Add</button>
//             </form>
//         </div>
//     );
// }