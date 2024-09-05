import { ChangeEvent } from "react";

export const TextArea = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) => {
  return (
    <textarea
      value={value}
      className="custom-input"
      onChange={onChange}
      required
      rows={5}
    />
  );
};
