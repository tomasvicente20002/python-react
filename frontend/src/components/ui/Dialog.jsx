import React from "react";

// Componente principal Dialog (wrapper que controla visibilidade)
export function Dialog({ open, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      {children}
    </div>
  );
}

// Componente para disparar o diálogo (botão externo opcional)
export function DialogTrigger({ children, onClick }) {
  return (
    <button onClick={onClick} className="bg-blue-500 text-white px-4 py-2 rounded">
      {children}
    </button>
  );
}

// Conteúdo da janela de diálogo
export function DialogContent({ children, onClose }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md relative">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-black"
      >
        ×
      </button>
      {children}
    </div>
  );
}

// Header opcional
export function DialogHeader({ children }) {
  return <div className="mb-4">{children}</div>;
}

// Título
export function DialogTitle({ children }) {
  return <h2 className="text-xl font-bold">{children}</h2>;
}
