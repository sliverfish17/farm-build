import React from "react";
import { PostType } from "../types/Post";

interface PostProps extends PostType {
  onDelete: (id: string) => void;
}

export const Post: React.FC<PostProps> = ({ title, content, id, onDelete }) => {
  return (
    <div className="post-container" id={id} style={{ position: "relative" }}>
      <h2 className="post-title">{title}</h2>
      <p className="post-content">{content}</p>
      <button onClick={() => onDelete(id)} className="delete-button">
        Delete
      </button>
    </div>
  );
};
