import React, { useState, useEffect, useContext, useCallback } from "react";
import { StyleSheet, View, FlatList, Image, Dimensions } from "react-native";
import { AddTodo } from "../components/AddTodo";
import { ToDoItem } from "../components/ToDoItem";
import { THEME } from "../theme";
import { TodoContext } from "../context/todo/todoContext";
import { ScreenContext } from "../context/screen/screenContext";
import { AppLoader } from "../ui/AppLoader";
import { AppText } from "../ui/AppText";
import { AppButton } from "../ui/AppButton";

export const Mainscreen = () => {
  const {
    addTodo,
    todoList,
    removeTodoItem,
    fetchTodoList,
    loading,
    error,
  } = useContext(TodoContext);
  const { change_screen } = useContext(ScreenContext);

  const [deviceWidth, setDeviceWidth] = useState(
    Dimensions.get("window").width - THEME.PADDING * 2
  );

  const [deviceHeight, setDeviceHeight] = useState(
    Dimensions.get("window").height - THEME.HEADER
  );

  const loadTodoList = useCallback(async () => await fetchTodoList(), [
    fetchTodoList,
  ]);

  useEffect(() => {
    loadTodoList();
  }, []);

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

  if (loading) {
    return <AppLoader />;
  }

  if (error) {
    return (
      <View style={styles.center}>
        <AppText style={styles.error}>{error}</AppText>
        <AppButton onPress={loadTodoList}>Повторить</AppButton>
      </View>
    );
  }

  let content = (
    <View style={{ width: deviceWidth, height: deviceHeight }}>
      <FlatList
        keyExtractor={(item) => item.id}
        data={todoList}
        renderItem={({ item }) => (
          <ToDoItem
            todo={item}
            onRemove={removeTodoItem}
            onOpen={change_screen}
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
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  error: {
    fontSize: 20,
    color: THEME.DANGER_COLOR,
  },
});
