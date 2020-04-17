import React, { useReducer, useContext } from "react";
import { Alert } from "react-native";
import { TodoContext } from "./todoContext";
import { todoReducer } from "./todoReducer";
import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from "../types";
import { ScreenContext } from "../screen/screenContext";

export const TodoState = ({ children }) => {
  const initialState = {
    todoList: [
      { id: "1", title: "Выучить React Native" },
      { id: "2", title: "Написать приложение" },
    ],
  };

  const { change_screen } = useContext(ScreenContext);

  const [state, dispatch] = useReducer(todoReducer, initialState); //второй параметр (initialState)-это начальное значение state

  const addTodo = (title) => dispatch({ type: ADD_TODO, title: title });

  const removeTodoItem = (id) => {
    const todo = state.todoList.find((t) => t.id === id);

    Alert.alert(
      "Удаление элемента",
      `Вы уверены, что хотите удалить "${todo.title}"?`,
      [
        {
          text: "Отмена",
          style: "cancel",
        },
        {
          text: "Удалить",
          style: "destructive",
          onPress: () => {
            change_screen(null);
            dispatch({ type: REMOVE_TODO, id: id });
          },
        },
      ],
      { cancelable: false }
    );
  };

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
