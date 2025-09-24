import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function CustomInput(props: Props) {
  return (
    <input
      {...props}
      className={`border px-3 py-2 rounded w-full 
                  bg-white text-black 
                  dark:bg-slate-800 dark:text-white 
                  dark:border-slate-700 
                  ${props.className || ""}`}
    />
  );
}
+9 