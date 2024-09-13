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

export function ToDoList() {
    /*
        watch를 사용해 값을 추적할 수 있다.
    */
    const { register, watch, handleSubmit, formState } = useForm();
    // console.log(watch())
    console.log("errors:", formState.errors)

    const onValid = (data: any) => {
        console.log("valid:", data);
    }

    // 실패한 인풋으로 포커싱 이동됨.
    const onInvalid = (data: any) => {
        console.log("invalid:", data);
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onValid, onInvalid)}>
                <input 
                    {...register("toDo1", { 
                        required: true, 
                        minLength: {
                            value: 5,
                            message: "test"
                        }
                    })} 
                    placeholder="Write a to do" 
                />
                {/* required value에 문자열을 넣으면 그게 메시지다. */}
                <input 
                    {...register("toDo2", { 
                        required: "Required" 
                    })} 
                    placeholder="Write a to do"
                />
                <button>Add</button>
            </form>
        </div>
    );
}