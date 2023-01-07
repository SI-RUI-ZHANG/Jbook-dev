import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {v4 as uuid} from "uuid";

export type CellTypes = "code" | "text";
export type Direction = "up" | "down";

export interface Cell {
  id: string;
  content: string;
  type: CellTypes;
}

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {}
};

// Action types
type MoveCellAction = PayloadAction<{ id: string; direction: Direction }>;
type UpdateCellAction = PayloadAction<{ id: string; content: string }>;
type DeleteCellAction = PayloadAction<{ id: string }>;
type InsertCellAfterAction = PayloadAction<{ id: string | null; type: CellTypes }>;
type InsertCellBeforeAction = PayloadAction<{ id: string | null; type: CellTypes }>;

// Create a slice
const cellSlice = createSlice({
  name: "cells",
  initialState,
  reducers: {
    moveCell: (cellState, action: MoveCellAction) => {
      const {id, direction} = action.payload;
      const index = cellState.order.findIndex((id) => id === action.payload.id);
      const targetIndex = direction === "up" ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex > cellState.order.length - 1) {
        return;
      }

      cellState.order[index] = cellState.order[targetIndex];
      cellState.order[targetIndex] = id;
    },
    updateCell: (cellState, action: UpdateCellAction) => {
      const {id, content} = action.payload;
      cellState.data[id].content = content;
    },
    insertCellBefore: (cellState, action: InsertCellBeforeAction) => {
      const {id, type} = action.payload;
      const cell: Cell = {id: uuid(), content: "", type};
      // Insert the cell into the data object
      cellState.data[cell.id] = cell;
      // Find the index of the cell we want to insert before
      const index = cellState.order.findIndex((cellId) => cellId === id);
      // If the index is -1, we want to insert the cell at the beginning
      if (index < 0) {
        cellState.order.unshift(cell.id);
      } else {
        cellState.order.splice(index, 0, cell.id);
      }
    },
    insertCellAfter: (cellState, action: InsertCellAfterAction) => {
      const {id, type} = action.payload;
      const cell: Cell = {id: uuid(), content: "", type};
      // Insert the cell into the data object
      cellState.data[cell.id] = cell;
      // Find the index of the cell we want to insert after
      const index = cellState.order.findIndex((cellId) => cellId === id);
      // If the index is -1, we want to insert the cell at the beginning
      if (index < 0) {
        cellState.order.unshift(cell.id);
      } else {
        cellState.order.splice(index + 1, 0, cell.id);
      }
    },
    deleteCell: (cellState, action: DeleteCellAction) => {
      delete cellState.data[action.payload.id];
      cellState.order = cellState.order.filter(id => id !== action.payload.id);
    },
  },
});

// Export the reducer
export default cellSlice.reducer;

// Export the actions
export const {
  moveCell,
  updateCell,
  insertCellBefore,
  insertCellAfter,
  deleteCell
} = cellSlice.actions;

