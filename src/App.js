import "./styles.css";
import AllComments from "./AllComments";
import UserContext from "./components/UserContext";
import data from "./data.json";
import AddComment from "./components/AddComment";
import { useState, useReducer } from "react";

export default function App() {
  const intialState = data.comments;
  const [state, dispatch] = useReducer(reducer, intialState);

  //  initia state

  //  reducer
  function reducer(state, action) {
    switch (action.type) {
      case "delete":
        return state.filter((comment) => {
          if (comment.id != action.payload.id) {
            return true;
          }
          return false;
        });

      case "addComment":
        return [...state, action.payload];
      case "edit":
        return state.map((comment) => {
          if (comment.id === action.payload.id) {
            comment.content = action.payload.content;
          }
          return comment;
        });
      case "subDelete":
        return state;
      case "subEdit":
        return state;
      default:
        console.log("just got default error ");
    }
  }
  // useReducer
  const user = data.currentUser;
  return (
    <UserContext.Provider value={{ state, dispatch, user }}>
      <AllComments />
      <AddComment />
    </UserContext.Provider>
  );
}
