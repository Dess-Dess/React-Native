import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { AddTodo } from "../components/AddTodo";
import { ToDoItem } from "../components/ToDoItem";

export const Mainscreen = ({ addTodo, todoList, removeTodoItem, openTodoItem }) => {
  return (
    <View>
      <AddTodo onSubmit={addTodo} />

      <FlatList
        keyExtractor={(item) => item.id}
        data={todoList}
        renderItem={({ item }) => (
          <ToDoItem todo={item} onRemove={removeTodoItem} onOpen={openTodoItem} />
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({});
