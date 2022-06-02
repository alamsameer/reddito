import { useState, useContext } from "react";
import UserContext from "./UserContext";

export default function UserReply({ id, reply, replies, setReply }) {
  let [score, setScore] = useState(reply.score);
  // const [replies, setReplies] = useState(reply.replies);
  const [content, setContent] = useState(reply.content);
  const [isEdit, setEdit] = useState(false);
  const { user, dispatch } = useContext(UserContext);
  const EvalScore = (e) => {
    const sign = e.target.className;
    switch (sign) {
      case "plus":
        setScore(++score);
        break;
      case "minus":
        setScore(--score);
        break;
      default:
        null;
    }
  };
  const deleteUserComment = () => {
    dispatch({
      type: "subDelete",
      payload: { username: user.username, id: id }
    });
  };
  const editUserComment = () => {
    setEdit(true);
  };
  const updateContent = () => {
    dispatch({
      type: "subEdit",
      payload: { user: user.username, content: content, id }
    });
    setEdit(false);
  };
  console.log("am user reply");
  return (
    <div className="container">
      <div className="comment-container">
        <div className="comment">
          <div className="score-container">
            <button className="plus" onClick={EvalScore}>
              +
            </button>
            <div className="score">{score}</div>
            <button className="minus" onClick={EvalScore}>
              -
            </button>
          </div>
          <div className="user-container">
            <div className="user">
              {reply.user.username}
              <span>You</span>
            </div>
            <div className="date">{reply.createdAt}</div>
          </div>
          {isEdit ? (
            <div className="edit-content">
              <textarea
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              />
              <button onClick={updateContent}>Update</button>
            </div>
          ) : (
            <div className="content">{reply.content}</div>
          )}
          <div className="user-btn-container btn-container">
            <button className="deleteBtn" onClick={deleteUserComment}>
              Delete
            </button>
            <button className="reply" onClick={editUserComment}>
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
