import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export const ToDoItem = ({ todo, onRemove }) => {
  return (
    <TouchableOpacity onPress={() => console.log('Pressed',todo.id)}
    onLongPress = {()=>onRemove(todo.id)}
    >
      <View style={styles.todoItem}>
        <Text>{todo.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 5,
    marginBottom: 10,
  },
});
