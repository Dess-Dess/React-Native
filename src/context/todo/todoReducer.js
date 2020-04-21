import {
  ADD_TODO,
  REMOVE_TODO,
  UPDATE_TODO,
  FETCH_TODOLIST,
  SHOW_LOADER,
  HIDE_LOADER,
  SHOW_ERROR,
  CLEAR_ERROR,
} from "../types";

const handlers = {
  [ADD_TODO]: (state, { title, id }) => ({
    ...state,
    todoList: [...state.todoList, { id: id, title }],
  }),
  [REMOVE_TODO]: (state, { id }) => ({
    ...state,
    todoList: state.todoList.filter((todoItem) => todoItem.id !== id),
  }),
  [UPDATE_TODO]: (state, { title, id }) => ({
    ...state,
    todoList: state.todoList.map((todoItem) => {
      if (todoItem.id === id) {
        todoItem.title = title;
      }
      return todoItem;
    }),
  }),
  [FETCH_TODOLIST]: (state, { todoList }) => ({ ...state, todoList }),
  [SHOW_LOADER]: (state) => ({ ...state, loading: true }),
  [HIDE_LOADER]: (state) => ({ ...state, loading: false }),
  [SHOW_ERROR]: (state, { error }) => ({ ...state, error }),
  [CLEAR_ERROR]: (state) => ({ ...state, error: null }),
  DEFAULT: (state) => state,
};

export const todoReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
