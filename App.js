import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { Navbar } from "./src/components/Navbar";
import { Mainscreen } from "./src/screens/Mainscreen";
import { Todoscreen } from "./src/screens/Todoscreen";

export default function App() {
  const [todoId, setTodoId] = useState(null);
  const [todoList, setTodos] = useState([]);

  const addTodo = (title) => {
    const newTodo = {
      id: Date.now().toString(),
      title: title,
    };

    setTodos((todoList) => {
      return [...todoList, newTodo];
    });
  };

  const removeTodoItem = (id) => {
    setTodos((todoList) => todoList.filter((todo) => todo.id !== id));
  };

  let content = (
    <Mainscreen
      todoList={todoList}
      addTodo={addTodo}
      removeTodoItem={removeTodoItem}
      openTodoItem={setTodoId}
    />
  );

  if (todoId) {
    const todoItem = todoList.find(todo => todo.id === todoId)
    content = <Todoscreen todoTitle={todoItem.title} goBack={()=>setTodoId(null)} />;
  }

  return (
    <View>
      <Navbar title="Todo App"></Navbar>
      <View style={styles.container}>{content}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
