import React, { useState } from "react";
import { Input } from "./Input";
import { TextArea } from "./TextArea";

interface BlogFormProps {
  onAddPost: (title: string, content: string) => void;
}

export const BlogForm: React.FC<BlogFormProps> = ({ onAddPost }) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const resetForm = () => {
    setTitle("");
    setContent("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (title.trim().length > 0 && content.trim().length > 0) {
      onAddPost(title.trim(), content.trim());
      resetForm();
    } else {
      alert("Title and content cannot be empty!");
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h1>Create a Blog Post</h1>
      <div className="input-block">
        <label>Title</label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className="input-block">
        <label>Content</label>
        <TextArea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button type="submit" className="form-submit">
        Add Post
      </button>
    </form>
  );
};
