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

interface IFormData {
    errors: {
        email: {
            message: string,
        }
    },
    email: string,
    toDo1: string,
    toDo2: string,
}


export function ToDoList() {
    /*
        watch를 사용해 값을 추적할 수 있다.
    */
    const { register, watch, handleSubmit, formState: { errors } } = useForm<IFormData>();
    // console.log(watch())
    console.log("errors:", errors)

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
                            message: "More than 5"
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
                {/* 정규식을 사용해 패턴 밸리데이션할 수 있다. 마찬가지로 문자열도 되고 객체형식으로 정의 가능 */}
                <input 
                    {...register("email", { 
                        required: true,
                        pattern: {
                            value: /^[\w]+@naver.com$/,
                            message: "이메일 형식 입력해라."
                        }
                    })} 
                    placeholder="Write a to do"
                />
                {/* 객체 참조 에러날 때는 항상 타입정의했는지 확인하기 */}
                <span>
                    {
                        errors?.email?.message
                    }
                </span>
                <button>Add</button>
            </form>
        </div>
    );
}