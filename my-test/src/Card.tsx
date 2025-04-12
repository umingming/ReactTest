import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

/**
 * Your Component
 */
export default function Card() {
    return (
        <div>
            <DndProvider backend={HTML5Backend}>
                <div>Test</div>
            </DndProvider>
        </div>
    );
}
