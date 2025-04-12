import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

/*
  참고 사이트
  https://www.npmjs.com/package/react-beautiful-dnd?activeTab=dependencies
  https://codesandbox.io/p/sandbox/k260nyxq9v?file=%2Findex.js%3A82%2C18-82%2C45
  https://dribbble.com/shots/20564935-Drag-drop-table-rows
  https://dribbble.com/shots/24303774-Oversite-web-app
*/

export default function DragBox() {
  const getItems = (count) =>
    Array.from({ length: count }, (_, i) => ({
      id: `item-${i}`,
      content: `item ${i}`,
      showDetail: false,
    }));

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const grid = 8;

  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",

    background: isDragging ? "lightgreen" : "grey",

    ...draggableStyle,
  });

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
    width: 250,
  });

  const [items, setItems] = useState(getItems(10));

  const toggleShowDetail = (index) => {
    items[index].showDetail = !items[index].showDetail;
    setItems([...items]);
  };

  const onDragEnd = ({ source, destination }) => {
    if (destination) {
      const newItems = reorder(items, source.index, destination.index);
      setItems(newItems);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <table
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <tbody
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    <tr onClick={() => toggleShowDetail(index)}>
                      <td>
                        <span {...provided.dragHandleProps}>여기</span>
                      </td>
                      <td>{item.content}</td>
                      <td>{`show: ${item.showDetail}`}</td>
                      <td>
                        <button>test</button>
                      </td>
                    </tr>
                    {item.showDetail && (
                      <tr>
                        <td colSpan={4} className="h-80 w-full bg-white">
                          뭉탱이
                        </td>
                      </tr>
                    )}
                  </tbody>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </table>
        )}
      </Droppable>
    </DragDropContext>
  );
}
