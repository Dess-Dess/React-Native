import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Platform,
  TouchableNativeFeedback,
} from "react-native";
import { AppText } from "../ui/AppText";
import { THEME } from "../theme";
export const AppButton = ({
  children,
  onPress,
  backgroundColor = THEME.MAIN_COLOR,
  color = "white",
}) => {
  const Wrapper =
    Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;
    
  return (
    <Wrapper onPress={onPress} activeOpacity={0.7}>
      <View
        style={{
          ...styles.button,
          backgroundColor: backgroundColor,
        }}
      >
        <AppText style={{ color: color }}>{children}</AppText>
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
