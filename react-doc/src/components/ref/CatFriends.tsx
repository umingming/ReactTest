import { useRef } from "react";

export default function CatFriends() {
    const firstCatRef = useRef<HTMLImageElement>(null);
    const secondCatRef = useRef<HTMLImageElement>(null);
    const thirdCatRef = useRef<HTMLImageElement>(null);

    function handleScrollToFirstCat() {
        firstCatRef.current!.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
        });
    }

    function handleScrollToSecondCat() {
        secondCatRef.current!.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
        });
    }

    function handleScrollToThirdCat() {
        thirdCatRef.current!.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
        });
    }

    return (
        <>
            <nav className="flex justify-center">
                <button onClick={handleScrollToFirstCat}>Neo</button>
                <button onClick={handleScrollToSecondCat}>Millie</button>
                <button onClick={handleScrollToThirdCat}>Bella</button>
            </nav>
            <div>
                <ul className="inline-flex min-w-96 gap-20 overflow-scroll px-10">
                    <li>
                        <img
                            className="h-auto w-96"
                            src="https://placecats.com/neo/300/200"
                            alt="Neo"
                            ref={firstCatRef}
                        />
                    </li>
                    <li>
                        <img
                            className="h-auto w-96"
                            src="https://placecats.com/millie/200/200"
                            alt="Millie"
                            ref={secondCatRef}
                        />
                    </li>
                    <li>
                        <img
                            className="h-auto w-96"
                            src="https://placecats.com/bella/199/200"
                            alt="Bella"
                            ref={thirdCatRef}
                        />
                    </li>
                </ul>
            </div>
        </>
    );
}
