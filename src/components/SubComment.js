// component js

import { useState } from "react";
import ReplyContainer from "./ReplyContainer";
export default function App({ id, reply, replies, setReply }) {
  let [score, setScore] = useState(reply.score);
  const [iswrite, setWrite] = useState(false);

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
            <div className="user">{reply.user.username}</div>
            <div className="date">{reply.createdAt}</div>
          </div>
          <div className="content">{reply.content}</div>
          <div className="btn-container">
            <button
              className="reply"
              onClick={() => {
                setWrite(true);
              }}
            >
              Reply
            </button>
          </div>
        </div>
      </div>
      {iswrite ? (
        <ReplyContainer
          id={id}
          setWrite={setWrite}
          iswrite={iswrite}
          replies={replies}
          setReply={setReply}
        />
      ) : null}
    </div>
  );
}
