// component js

import { useState, useContext } from "react";
import SubComment from "./components/SubComment";
import ReplyContainer from "./components/ReplyContainer";
import UserContext from "./components/UserContext";
import UserReply from "./components/UserReply";
export default function App({ comment }) {
  let [score, setScore] = useState(comment.score);
  const [replies, setReplies] = useState(comment.replies);
  const [iswrite, setWrite] = useState(false);
  const { user } = useContext(UserContext);
  //  console.log(score,replies)
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
            <div className="user">{comment.user.username}</div>
            <div className="date">{comment.createdAt}</div>
          </div>
          <div className="content">{comment.content}</div>
          <div className="btn-container">
            <button
              className="reply"
              onClick={() => {
                console.log(iswrite);
                setWrite(true);
              }}
            >
              Reply
            </button>
          </div>
        </div>
        {iswrite ? (
          <ReplyContainer
            id={comment.id}
            setWrite={setWrite}
            iswrite={iswrite}
            replies={replies}
            setReply={setReplies}
          />
        ) : null}
      </div>

      {replies.length === 0 ? null : (
        <div className="replies">
          {replies.map((reply, i) => {
            if (reply.user.username === user.username) {
              return (
                <UserReply
                  key={i}
                  id={comment.id}
                  reply={reply}
                  replies={replies}
                  setReply={setReplies}
                />
              );
            }
            return (
              <SubComment
                key={i}
                id={comment.id}
                reply={reply}
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
