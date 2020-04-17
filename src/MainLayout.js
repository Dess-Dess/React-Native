import React, { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Navbar } from "./components/Navbar";
import { THEME } from "./theme";
import { Mainscreen } from "./screens/Mainscreen";
import { Todoscreen } from "./screens/Todoscreen";
import { ScreenContext } from "./context/screen/screenContext";

export const MainLayout = () => {
  const { todoId } = useContext(ScreenContext);

  return (
    <View>
      <Navbar title="Todo App"></Navbar>
      <View style={styles.container}>
        {todoId ? <Todoscreen /> : <Mainscreen />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: THEME.PADDING,
  },
});
