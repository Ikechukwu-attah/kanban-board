import { v4 as uuid } from "uuid";

const itemsFromBackend = [
  { id: uuid(), content: "First task" },
  { id: uuid(), content: "Second task" },
  { id: uuid(), content: "Third task" },
  { id: uuid(), content: "Fourth task" },
  { id: uuid(), content: "Fifth task" },
];

export const columnsFromBackend = [
  {
    id: uuid(),
    name: "Todo",
    items: itemsFromBackend,
  },

  {
    id: uuid(),
    name: "In Progress",
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
