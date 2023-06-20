import React, { useState } from 'react';
import { getDatabase, ref, push, set } from 'firebase/database';

function CreateComment() {
  const [comment, setComment] = useState("");

  const createComment = () => {
    const database = getDatabase();
    const commentsRef = ref(database, 'comments'); // Assuming 'comments' is the path to the comments collection in your database

    // Generate a unique key for the new comment using push()
    const newCommentRef = push(commentsRef);

    // Create the new comment object
    const newComment = {
      content: comment,
      createdAt: new Date().toISOString(),
    };

    // Save the new comment to the database
    set(newCommentRef, newComment);

    // Reset the comment state variable
    setComment("");

    return newCommentRef;
  };

  return (
    <div>
      <textarea value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
      <button onClick={createComment}>Create Comment</button>
    </div>
  );
}

export default CreateComment;
