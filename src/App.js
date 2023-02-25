import React, { useState } from "react";
import "./App.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";

const itemsFromBackend = [
  { id: uuid(), content: "First task" },
  { id: uuid(), content: "Second task" },
  { id: uuid(), content: "Third task" },
  { id: uuid(), content: "Fourth task" },
];

const columnsFromBackend = [
  {
    id: uuid(),
    name: "Todo",
    items: itemsFromBackend,
  },

  {
    id: uuid(),
    name: "Progress",
    items: [],
  },

  {
    id: uuid(),
    name: "Blocked",
    items: [],
  },

  {
    id: uuid(),
    name: "Completed",
    items: [],
  },
];

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;

  const sourceColumn = columns.find(
    (column) => column.id === result.source.droppableId
  );

  console.log({ sourceColumn });
  const destinationColumn = columns.find(
    (column) => column.id === result.destination.droppableId
  );
  console.log({ destinationColumn });

  if (sourceColumn === destinationColumn) {
    const items = Array.from(sourceColumn.items);
    const [reorderedItem] = items.splice(result.source.index, 1);

    console.log("items:", items);
    items.splice(result.destination.index, 0, reorderedItem);

    const updatedColumns = columns.map((column) => {
      if (column.id === sourceColumn.id) {
        return { ...column, items };
      } else {
        return column;
      }
    });

    setColumns(updatedColumns);
  } else {
    const sourceItems = Array.from(sourceColumn.items);
    console.log("sourceItems:", result);
    const [reorderedItem] = sourceItems.splice(result.source.index, 1);
    console.log("reordered:", reorderedItem);
    const destinationItems = Array.from(destinationColumn.items);
    destinationItems.splice(result.destination.index, 0, reorderedItem);

    const updatedColumns = columns.map((column) => {
      if (column.id === sourceColumn.id) {
        return { ...column, items: sourceItems };
      } else if (column.id === destinationColumn.id) {
        return { ...column, items: destinationItems };
      } else {
        return column;
      }
    });

    setColumns(updatedColumns);
  }
};

function App() {
  const [columns, setColumns] = useState(columnsFromBackend);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100%",
        margin: 8,
      }}
    >
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {columns.map(({ id, items, name }) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h2>{name}</h2>
              <div style={{ margin: "8px" }}>
                <Droppable key={id} droppableId={id}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "lightgrey",
                          padding: 4,
                          width: 250,
                          minHeight: 500,
                        }}
                      >
                        {items.map((item, index) => (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(provided, snapshot) => {
                              return (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={{
                                    userSelect: "none",
                                    padding: 16,
                                    margin: "0 0 8px 0",
                                    minHeight: "50px",
                                    background: snapshot.isDragging
                                      ? "#456c86"
                                      : name === "Todo"
                                      ? "#263B4A"
                                      : name === "Progress"
                                      ? "green"
                                      : name === "Blocked"
                                      ? "red"
                                      : "purple",
                                    color: "white",
                                    ...provided.draggableProps.style,
                                  }}
                                >
                                  {item.content}
                                </div>
                              );
                            }}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}

export default App;
