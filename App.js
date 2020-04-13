import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import * as Font from "expo-font";
import {AppLoading} from 'expo'
import { Navbar } from "./src/components/Navbar";
import { Mainscreen } from "./src/screens/Mainscreen";
import { Todoscreen } from "./src/screens/Todoscreen";

async function loadApplication() {
  await Font.loadAsync({
    "roboto-regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "roboto-bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });
}

export default function App() {
  const [isReady, setIsReady] = useState(false)
  const [todoId, setTodoId] = useState(null);
  const [todoList, setTodos] = useState([
    /*  { id: "1", title: "Выучить React Native" },
    { id: "2", title: "Написать приложение" }, */
  ]);

  if(!isReady){
    return(<AppLoading 
    startAsync = {loadApplication}
    onError={err => console.log(err)}
    onFinish={()=> setIsReady(true)}
    />)
  }

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
  };

  const updateTodo = (id, title) => {
    setTodos((old) =>
      old.map((todo) => {
        if (todo.id === id) {
          todo.title = title;
        }
        return todo;
      })
    );
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
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
