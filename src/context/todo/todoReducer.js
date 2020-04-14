import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from "../types";

export const todoReducer = (state, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todoList: [
          ...state.todoList,
          { id: Date.now().toString(), title: action.title },
        ],
      };
    case REMOVE_TODO:
      return {
        ...state,
        todoList: state.todoList.filter(
          (todoItem) => todoItem.id !== action.id
        ),
      };
    case UPDATE_TODO:
      return {
        ...state,
        todoList: state.todoList.map((todoItem) => {
          if (todoItem.id === action.id) {
            todoItem.title = action.title;
          }
          return todoItem;
        }),
      };
    default:
      return state;
  }
};
