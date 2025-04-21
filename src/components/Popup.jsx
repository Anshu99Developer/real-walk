import React from 'react';

export default function Popup({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  console.log(isOpen)

  return (
    <div className="popup-box fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md mx-4 relative p-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
        >
          &times;
        </button>

        {/* Title */}
        {title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}

        {/* Content */}
        <div className="text-gray-700">{children}</div>
      </div>
    </div>
  );
}
