import React from "react";

export const ErrorMessage = ({ errorMessage }) => {
  return (
    <div className="error">
      <p>{errorMessage} 😪</p>
    </div>
  );
};
