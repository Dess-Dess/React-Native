import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from "../types";

const handlers = {
  [ADD_TODO]: (state, { title }) => ({
    ...state,
    todoList: [...state.todoList, { id: Date.now().toString(), title }],
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
  DEFAULT: (state) => state,
};

export const todoReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
