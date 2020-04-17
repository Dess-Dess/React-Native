import React, { useState } from "react";
import {
  TextInput,
  View,
  Button,
  Modal,
  Alert,
  StyleSheet,
} from "react-native";
import { THEME } from "../theme";
import { AppButton } from "../ui/AppButton";

export const EditModal = ({ isVisible, onCancel, todoTitle, onSave }) => {
  const [title, setTitle] = useState(todoTitle);

  const SaveTitle = () => {
    if (title.trim().length < 3) {
      Alert.alert(
        "Ошибка!",
        `Минимальная длина названия 3 символа. Сейчас ${
          title.trim().length
        } символов.`
      );
    } else {
      onSave(title);
    }
  };

  const CancelHandler = () => {
    setTitle(todoTitle);
    onCancel();
  };

  return (
    <Modal visible={isVisible} animationType="slide">
      <View style={styles.wrap}>
        {/* <AppText> */}
        <TextInput
          style={styles.textInput}
          placeholder="Введите название дела..."
          maxLength={64}
          value={title}
          onChangeText={setTitle}
        ></TextInput>
        {/* </AppText> */}
        <View style={styles.buttons}>
          <AppButton
            onPress={CancelHandler}
            backgroundColor={THEME.DANGER_COLOR}
          >
            Отменить
          </AppButton>
          <AppButton onPress={SaveTitle}>Сохранить</AppButton>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  textInput: {
    padding: 10,
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 2,
    width: "80%",
    fontFamily: "porcelain-regular",
    fontSize: 24,
  },
  wrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    width: "100%",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
