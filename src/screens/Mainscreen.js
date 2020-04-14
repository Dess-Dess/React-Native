import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Image, Dimensions } from "react-native";
import { AddTodo } from "../components/AddTodo";
import { ToDoItem } from "../components/ToDoItem";
import { THEME } from "../theme";

export const Mainscreen = ({
  addTodo,
  todoList,
  removeTodoItem,
  openTodoItem,
}) => {
  const [deviceWidth, setDeviceWidth] = useState(
    Dimensions.get("window").width - THEME.PADDING * 2
  );

  const [deviceHeight, setDeviceHeight] = useState(
    Dimensions.get("window").height - THEME.HEADER
  );

  useEffect(() => {
    const update = () => {
      const width = Dimensions.get("window").width - THEME.PADDING * 2;
      setDeviceWidth(width);
      const height = Dimensions.get("window").height - THEME.HEADER;
      setDeviceHeight(height);
    };
    Dimensions.addEventListener("change", update);

    return () => {
      Dimensions.removeEventListener("change", update);
    };
  });

  let content = (
    <View style={{ width: deviceWidth, height: deviceHeight }}>
      <FlatList
        keyExtractor={(item) => item.id}
        data={todoList}
        renderItem={({ item }) => (
          <ToDoItem
            todo={item}
            onRemove={removeTodoItem}
            onOpen={openTodoItem}
          />
        )}
      />
    </View>
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
