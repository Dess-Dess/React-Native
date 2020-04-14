import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { AppText } from "../ui/AppText";

export const ToDoItem = ({ todo, onRemove, onOpen }) => {
  return (
    <TouchableOpacity
      onPress={() => onOpen(todo.id)}
      onLongPress={() => onRemove(todo.id)}
    >
      <View style={styles.todoItem}>
        <AppText>
          <Text style={styles.title}>{todo.title}</Text>
        </AppText>
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
  title: {},
});
