import React, { useState } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { THEME } from "../theme";
import { AppCard } from "../ui/AppCard";
import { EditModal } from "../components/EditModal";
import { AppTextBold } from "../ui/AppTextBold";
import { AppButton } from "../ui/AppButton";

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
        <AppTextBold>
          <Text style={styles.title}>{todo.title}</Text>
        </AppTextBold>
        <AppButton onPress={() => setVisible(true)}>
          <FontAwesome name="edit" size={20} />
        </AppButton>
      </AppCard>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <AppButton onPress={goBack} backgroundColor={THEME.GREY_COLOR}>
            <AntDesign name="back" size={20} />
          </AppButton> 
        </View>
        <View style={styles.button}>
          <AppButton
            backgroundColor={THEME.DANGER_COLOR}
            onPress={removeTodoItem}
          >
            <FontAwesome name="remove" size={20} />
          </AppButton>
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
    width: Dimensions.get('window').width/3,
  },
  title: {
    fontSize: 24,
  },
  card: {
    marginBottom: 20,
    padding: 15,
  },
});
