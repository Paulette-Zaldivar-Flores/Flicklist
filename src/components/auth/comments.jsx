import React, { useState } from 'react';
import { getDatabase, ref, push, set } from 'firebase/database';
import './comments.css';

function Comments({ movieId, comments }) {
  const [comment, setComment] = useState("");

  const createComment = () => {
    const database = getDatabase();
    const commentsRef = ref(database, `comments/${movieId}`);

    const newCommentRef = push(commentsRef);

    const newComment = {
      content: comment,
      createdAt: new Date().toISOString(),
    };

    set(newCommentRef, newComment);

    setComment("");

    return newCommentRef;
  };

  return (
    <div>
      <div>
      <button className = "commentsbutton" onClick={createComment}> Add A Comment
          </button>
          <input className = "commentsinput mx-5" value={comment} onChange={(e) => setComment(e.target.value)}></input>
          </div>
          <div>
        <h5>Comments:</h5>
        {comments && Object.values(comments).map((comment) => (
          <p key={comment.createdAt}>{comment.content}</p>
        ))}
      </div>
    </div>
  );
}

export default Comments;
