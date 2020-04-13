import React from "react";
import { StyleSheet, View, FlatList, Image } from "react-native";
import { AddTodo } from "../components/AddTodo";
import { ToDoItem } from "../components/ToDoItem";

export const Mainscreen = ({
  addTodo,
  todoList,
  removeTodoItem,
  openTodoItem,
}) => {
  let content = (
    <FlatList
      style={styles.container}
      keyExtractor={(item) => item.id}
      data={todoList}
      renderItem={({ item }) => (
        <ToDoItem todo={item} onRemove={removeTodoItem} onOpen={openTodoItem} />
      )}
    />
  );

  if (todoList.length === 0) {
    content = (
      <View style={styles.imageWrap}>
        <Image
          style={styles.image}
          source={require("../../assets/no-items.png")}
        />
      </View>
    );
  }

  return (
    <View>
      <AddTodo onSubmit={addTodo} />
      {content}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginBottom: 325,
  },
  imageWrap: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    height: 300,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
