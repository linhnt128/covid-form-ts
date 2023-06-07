import { createSlice, PayloadAction, CaseReducer  } from "@reduxjs/toolkit";
import { ITableRow } from "../../utils/types/table/TableTypes";




interface DataState {
  rows: ITableRow[];

};

const initialState: DataState = {
  rows: [],

};

// function thực thi và trả về updated state của dataTable. Trong đó, dataTable là biến để hứng giá trị trả về.
const fetchDataReducer: CaseReducer<DataState, PayloadAction<ITableRow>> = (state = initialState, action) => {
  // mutation || IMMER library
  state.rows.unshift(action.payload);

};


const updateDataReducer: CaseReducer<DataState, PayloadAction<ITableRow>> = (state = initialState, action) => {
  // mutation || IMMER library
  const id = action.payload.id;
  const formIndex = state.rows.findIndex(item => item.id === id);
  state.rows[formIndex] = action.payload;

};

const deleteDataReducer: CaseReducer<DataState, PayloadAction<ITableRow>> = (state = initialState, action) => {
  // mutation || IMMER library
  const id = action.payload;
  state.rows = state.rows.filter(item => item.id !== id);

};

const loadDataSlice = createSlice({
    name: "LOAD-DATA", // prefix
    initialState,
    reducers: {
      renderData: fetchDataReducer, // renderData = action.type (case "....") trong redux
      editFormData: updateDataReducer, 
      deleteFormData: deleteDataReducer
    },
});




export const { renderData, editFormData, deleteFormData } = loadDataSlice.actions;
export const loadDataReducer = loadDataSlice.reducer; //loadDataReducer is a name of reducer that match with the case of renderData


