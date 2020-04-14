import React, { useReducer } from "react";
import { TodoContext } from "./todoContext";
import { todoReducer } from "./todoReducer";
import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from "../types";

export const TodoState = ({ children }) => {
  const initialState = {
    todoList: [
      { id: "1", title: "Выучить React Native" },
      { id: "2", title: "Написать приложение" },
    ],
  };

  const [state, dispatch] = useReducer(todoReducer, initialState);

  const addTodo = (title) => dispatch({ type: ADD_TODO, title: title });

  const removeTodoItem = (id) => dispatch({ type: REMOVE_TODO, id: id });

  const updateTodo = (id, title) => dispatch({ type: UPDATE_TODO, id, title });

  return (
    <TodoContext.Provider
      value={{
        todoList: state.todoList,
        addTodo,
        removeTodoItem,
        updateTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
