import React, { useState } from 'react';
import { getDatabase, ref, push, set } from 'firebase/database';

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
        <textarea value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
        <button onClick={createComment}>Create Comment</button>
      </div>
      <div>
        <h4>Comments:</h4>
        {comments && Object.values(comments).map((comment) => (
          <p key={comment.createdAt}>{comment.content}</p>
        ))}
      </div>
    </div>
  );
}

export default Comments;
