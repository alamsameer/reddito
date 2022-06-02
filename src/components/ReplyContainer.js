import { useState, useContext } from "react";
import UserContext from "./UserContext";
export default function ReplyContainer({
  id,
  iswrite,
  setWrite,
  replies,
  setReply
}) {
  let [content, setContent] = useState("Write something here notable ...");
  const { user } = useContext(UserContext);

  const replyContent = (e) => {
    setContent(e.target.value);
  };
  const addReply = () => {
    console.log(id);
    if (content.length > 0) {
      const toAdd = { user: { ...user }, id, content, score: 0 };
      console.log("repllly container");
      const newReply = replies.unshift(toAdd);
      console.log(newReply);
    }
    // setReply(newReply);
  };
  return (
    <div className="add-comment-container">
      <figure className="currentUser-img"></figure>
      <div className="input-container">
        {/* <textarea  onChange={replyContent} /> */}
        <textarea
          value={content}
          name="textarea"
          rows="5"
          cols="50"
          onChange={replyContent}
        ></textarea>
      </div>
      <button
        onClick={() => {
          setWrite(false);
          addReply();
        }}
      >
        Reply
      </button>
    </div>
  );
}
