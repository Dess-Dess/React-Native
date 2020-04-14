import React, { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Navbar } from "./components/Navbar";
import { THEME } from "./theme";
import { Mainscreen } from "./screens/Mainscreen";
import { Todoscreen } from "./screens/Todoscreen";
import { TodoContext } from "./context/todo/todoContext";

export const MainLayout = () => {
  const { todoList, addTodo, removeTodoItem, updateTodo } = useContext(
    TodoContext
  );
  const [todoId, setTodoId] = useState(null);
  //const [todoList, setTodos] = useState([]);

  /* const addTodo = (title) => {
    const newTodo = {
      id: Date.now().toString(),
      title: title,
    };

    setTodos((todoList) => {
      return [...todoList, newTodo];
    });
  }; */

  /* const removeTodoItem = (id) => {
    const todo = todoList.find((t) => t.id === id);
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
            setTodoId(null);
            setTodos((todoList) => todoList.filter((todo) => todo.id !== id));
          },
        },
      ],
      { cancelable: false }
    );
  }; */

  /* const updateTodo = (id, title) => {
    setTodos((old) =>
      old.map((todo) => {
        if (todo.id === id) {
          todo.title = title;
        }
        return todo;
      })
    );
  }; */
  
  let content = (
    <Mainscreen
      todoList={todoList}
      addTodo={addTodo}
      removeTodoItem={removeTodoItem}
      openTodoItem={setTodoId}
    />
  );

  if (todoId) {
    const todoItem = todoList.find((todo) => todo.id === todoId);

    content = (
      <Todoscreen
        todo={todoItem}
        goBack={() => setTodoId(null)}
        removeTodoItem={() => removeTodoItem(todoItem.id)}
        onSave={updateTodo}
      />
    );
  }

  return (
    <View>
      <Navbar title="Todo App"></Navbar>
      <View style={styles.container}>{content}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: THEME.PADDING,
  },
});
