import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";

export const Todoscreen = ({goBack, todoTitle}) => {
  return (
    <View>
      <Text>{todoTitle}</Text>
      <Button title='Назад' onPress={goBack} />
    </View>
  );
};

const styles = StyleSheet.create({});
