import React from "react";

export function Input({ label, ...props }) {
  return (
    <div className="mb-4">
      {label && <label className="block mb-1 font-semibold">{label}</label>}
      <input
        {...props}
        className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring focus:ring-blue-300"
      />
    </div>
  );
}