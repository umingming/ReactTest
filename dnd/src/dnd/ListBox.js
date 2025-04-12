import React, { useState, useCallback, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

const ListItem = ({ text, index, moveListItem }) => {
  // useDrag - the list item is draggable
  const [{ isDragging }, dragRef] = useDrag({
    type: "item",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // useDrop - the list item is also a drop area
  const [_, dropRef] = useDrop({
    accept: "item",
    hover: (item, monitor) => {
      const dragIndex = item.index;
      const hoverIndex = index;
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top;

      // if dragging down, continue only when hover is smaller than middle Y
      if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
      // if dragging up, continue only when hover is bigger than middle Y
      if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;

      moveListItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  // Join the 2 refs together into one (both draggable and can be dropped on)
  const ref = useRef(null);
  const dragDropRef = dragRef(dropRef(ref));

  // Make items being dragged transparent, so it's easier to see where we drop them
  const opacity = isDragging ? 0 : 1;
  return (
    <div ref={dragDropRef} style={{ opacity }}>
      {text}
    </div>
  );
};

const PETS = [
  { id: 1, name: "dog" },
  { id: 2, name: "cat" },
  { id: 3, name: "fish" },
  { id: 4, name: "hamster" },
];

export const List = () => {
  const [pets, setPets] = useState(PETS);

  const movePetListItem = useCallback(
    (dragIndex, hoverIndex) => {
      const dragItem = pets[dragIndex];
      const hoverItem = pets[hoverIndex];
      // Swap places of dragItem and hoverItem in the pets array
      setPets((pets) => {
        const updatedPets = [...pets];
        updatedPets[dragIndex] = hoverItem;
        updatedPets[hoverIndex] = dragItem;
        return updatedPets;
      });
    },
    [pets]
  );

  return (
    <div>
      {pets.map((pet, index) => (
        <ListItem
          key={pet.id}
          index={index}
          text={pet.name}
          moveListItem={movePetListItem}
        />
      ))}
    </div>
  );
};
