import { ChangeEvent } from "react";

export const Input = ({
  value,
  onChange,
  type = "text",
}: {
  value: string;
  type?: "number" | "text" | "password";
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <input
      type={type}
      value={value}
      className="custom-input"
      onChange={onChange}
      required
    />
  );
};
