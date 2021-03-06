import React, { useReducer } from "react";
import { ScreenContext } from "./screenContext";
import { screenReducer } from "./screenReducer";
import { CHANGE_SCREEN } from "../types";

export const ScreenState = ({ children }) => {
  const [state, dispatch] = useReducer(screenReducer, null); //второй параметр (null)-это начальное значение state
  const change_screen = (id) => dispatch({ type: CHANGE_SCREEN, payload: id });

  return (
    <ScreenContext.Provider value={{ todoId: state, change_screen }}>
      {children}
    </ScreenContext.Provider>
  );
};
