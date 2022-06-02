// component js

import { useState, useContext } from "react";
import SubComment from "./components/SubComment";
import UserContext from "./components/UserContext";
import UserReply from "./components/UserReply";
export default function UserComment({ comment }) {
  let [score, setScore] = useState(comment.score);
  const [replies, setReplies] = useState(comment.replies);
  const [content, setContent] = useState(comment.content);
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
      type: "delete",
      payload: { username: user.username, id: comment.id }
    });
  };
  const editUserComment = () => {
    setEdit(true);
  };
  const updateContent = () => {
    dispatch({
      type: "edit",
      payload: { user: user.username, content: content, id: comment.id }
    });
    setEdit(false);
  };

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
              {comment.user.username}
              <span>you</span>
            </div>
            <div className="date">{comment.createdAt}</div>
          </div>
          {isEdit ? (
            <div className="edit-content">
              <textarea
                value={content}
                name="textarea"
                rows="5"
                cols="50"
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              ></textarea>
              <button onClick={updateContent}>Update</button>
            </div>
          ) : (
            <div className="content">{comment.content}</div>
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

      {replies.length === 0 ? null : (
        <div className="replies" style={{ paddingLeft: "12px" }}>
          {replies.map((comment, i) => {
            if (comment.user.username === user.username) {
              return (
                <UserReply
                  key={i}
                  id={comment.id}
                  comment={comment}
                  replies={replies}
                  setReply={setReplies}
                />
              );
            }
            return (
              <SubComment
                key={i}
                id={comment.id}
                comment={comment}
                replies={replies}
                setReply={setReplies}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
