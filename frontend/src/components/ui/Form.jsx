import React from "react";

export function Form({ children, onSubmit, className = "" }) {
  return (
    <form
      onSubmit={onSubmit}
      className={`space-y-4 bg-white p-6 rounded-2xl shadow-md border ${className}`}
    >
      {children}
    </form>
  );
}