import React from "react";

const Button = ({
  type = "button",
  onClick,
  children,
  className,
  disabled,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-lg text-white font-semibold transition duration-300 ease-in-out ${
        disabled
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-500 hover:bg-blue-600"
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
