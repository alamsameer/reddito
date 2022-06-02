import { useContext, useState } from "react";
import UserContext from "./UserContext";
export default function AddComment() {
  const [content, setContent] = useState("Add comment");
  const { state, user, dispatch } = useContext(UserContext);
  const addComment = () => {
    const toAdd = {
      id: unique(),
      content: content,
      createdAt: Date.now(),
      score: Math.floor(Math.random() * 100),
      user,
      replies: []
    };
    if (content.length > 0) {
      dispatch({ type: "addComment", payload: toAdd });
    }
  };
  function unique() {
    const chooseme = ["a", "t", "b", "k", "1", "5", "7", "A"];
    var unique = "";
    for (let i = 0; i < chooseme.length; i++) {
      const rd = Math.floor(Math.random() * chooseme.length);
      unique += chooseme[rd];
    }
    return unique;
  }
  return (
    <div className="add-comment">
      <figure></figure>
      <div>
        <textarea
          value={content}
          name="textarea"
          rows="5"
          cols="50"
          onChange={(e) => {
            setContent(e.target.value);
          }}
        ></textarea>
      </div>
      <div className="btn-container">
        <button onClick={addComment}>Reply</button>
      </div>
    </div>
  );
}
