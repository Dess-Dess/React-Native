import React, { useState } from "react";
import { View, StyleSheet, TextInput, Keyboard, Alert } from "react-native";
import { THEME } from "../theme";
import { AntDesign } from "@expo/vector-icons";
import { AppText } from "../ui/AppText";

export const AddTodo = ({ onSubmit }) => {
  const [value, setValue] = useState("");

  const presshandler = () => {
    if (value.trim()) {
      onSubmit(value);
      setValue("");
      Keyboard.dismiss();
    } else {
      Alert.alert("Название дела не может быть пустым!");
    }
  };

  return (
    <View style={styles.block}>
      {/* <AppText> */}
      <TextInput
        style={styles.input}
        onChangeText={(text) => setValue(text)}
        value={value}
        placeholder="Введите название дела..."
        autoCorrect={true}
      />
      {/* </AppText> */}
      {/* <Button title="Добавить" onPress={presshandler}></Button> */}
      <AntDesign.Button onPress={presshandler} name="pluscircleo">
        <AppText style={{ color: "white" }}>Добавить</AppText>
      </AntDesign.Button>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  input: {
    width: "60%",
    borderStyle: "solid",
    borderBottomWidth: 2,
    borderBottomColor: THEME.MAIN_COLOR,
    padding: 10,
    fontFamily: "porcelain-regular",
    fontSize: 24,
  },
});
