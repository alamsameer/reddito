import { useContext } from "react";
import UserContext from "./components/UserContext";
import UserComment from "./UserComment";
import Comment from "./Comment";

export default function AllComment() {
  const { state, user } = useContext(UserContext);

  console.log(state, "a");
  return (
    <div className="AllComment">
      {state.map((comment, i) => {
        if (comment.user.username === user.username) {
          console.log(comment.content, "acomment");
          return <UserComment key={i} comment={comment} />;
        }
        return <Comment key={i} comment={comment} />;
      })}
    </div>
  );
}
