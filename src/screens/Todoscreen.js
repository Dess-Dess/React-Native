import React, { useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { THEME } from "../theme";
import { AppCard } from "../ui/AppCard";
import { EditModal } from "../components/EditModal";

export const Todoscreen = ({ goBack, todo, removeTodoItem, onSave }) => {
  const [isVisible, setVisible] = useState(false);
  const SaveHandler = (title) => {    
    onSave(todo.id, title);
    setVisible(false);
  };
  return (
    <View>
      <EditModal
        isVisible={isVisible}
        onCancel={() => setVisible(false)}
        todoTitle={todo.title}
        onSave={SaveHandler}
      />

      <AppCard style={styles.card}>
        <Text style={styles.title}>{todo.title}</Text>
        <Button title="Ред." onPress={() => setVisible(true)} />
      </AppCard>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button title="Назад" onPress={goBack} color={THEME.GREY_COLOR} />
        </View>
        <View style={styles.button}>
          <Button
            title="Удалить"
            color={THEME.DANGER_COLOR}
            onPress={removeTodoItem}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    width: "40%",
  },
  title: {
    fontSize: 20,
  },
  card: {
    marginBottom: 20,
    padding: 15,
  },
});
