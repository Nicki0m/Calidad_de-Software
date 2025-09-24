import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isDisabled?: boolean;
}

export default function CustomButton({ isDisabled, ...props }: Props) {
  return (
    <button
      {...props}
      disabled={isDisabled}
      className={`px-4 py-2 rounded text-white 
                  ${isDisabled
                    ? "bg-gray-400 dark:bg-gray-600"
                    : "bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                  }
                  ${props.className || ""}`}
    />
  );
}
