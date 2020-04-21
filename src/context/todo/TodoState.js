import React, { useReducer, useContext } from "react";
import { Alert } from "react-native";
import { TodoContext } from "./todoContext";
import { todoReducer } from "./todoReducer";
import {
  ADD_TODO,
  REMOVE_TODO,
  UPDATE_TODO,
  HIDE_LOADER,
  SHOW_LOADER,
  SHOW_ERROR,
  CLEAR_ERROR,
  FETCH_TODOLIST,
} from "../types";
import { ScreenContext } from "../screen/screenContext";
import { Http } from "../../http";

export const TodoState = ({ children }) => {
  const initialState = {
    todoList: [],
    loading: false,
    error: null,
  };

  const { change_screen } = useContext(ScreenContext);

  const [state, dispatch] = useReducer(todoReducer, initialState); //второй параметр (initialState)-это начальное значение state

  const addTodo = async (title) => {
    clearError();
    try {
      const data = await Http.post(
        "https://rn-todo-app-6fd06.firebaseio.com/todoList.json",
        { title }
      );

      dispatch({ type: ADD_TODO, title: title, id: data.name });
    } catch (error) {
      showError("Что-то пошло не так...");
    }
  };

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
          onPress: async () => {
            change_screen(null);
            await Http.delete(
              `https://rn-todo-app-6fd06.firebaseio.com/todoList/${id}.json`
            );

            dispatch({ type: REMOVE_TODO, id: id });
          },
        },
      ],
      { cancelable: false }
    );
  };

  const fetchTodoList = async () => {
    showLoader();
    clearError();
    try {
      const data = await Http.get(
        "https://rn-todo-app-6fd06.firebaseio.com/todoList.json"
      );

      const todoList = Object.keys(data).map((key) => ({
        ...data[key],
        id: key,
      }));
      dispatch({ type: FETCH_TODOLIST, todoList });
    } catch (error) {
      showError("Что-то пошло не так...");
      console.log(error);
    } finally {
      hideLoader();
    }
  };

  const updateTodo = async (id, title) => {
    clearError();
    try {
      await Http.patch(
        `https://rn-todo-app-6fd06.firebaseio.com/todoList/${id}.json`,
        { title }
      );
      dispatch({ type: UPDATE_TODO, id, title });
    } catch (error) {
      showError("Что-то пошло не так...");
      console.log(error);
    }
  };

  const showLoader = () => dispatch({ type: SHOW_LOADER });

  const hideLoader = () => dispatch({ type: HIDE_LOADER });

  const showError = (error) => dispatch({ type: SHOW_ERROR, error });

  const clearError = () => dispatch({ type: CLEAR_ERROR });

  return (
    <TodoContext.Provider
      value={{
        todoList: state.todoList,
        loading: state.loading,
        error: state.error,
        addTodo,
        removeTodoItem,
        updateTodo,
        fetchTodoList,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
