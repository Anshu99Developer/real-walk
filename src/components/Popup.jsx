import React from 'react';

export default function Popup({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;
  return (
    <div className="popup-box fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <span className='bg-golden opacity-90 w-full h-full absolute top-0 left-0'></span>
      <div className="w-full max-w-md mx-4 relative ">
        {/* Title */}
        {title && <h2 className="text-2xl font-bold mb-4 text-center uppercase text-raisinBlack">{title}</h2>}

        {/* Content */}
        <div className="text-gray-700">{children}</div>

        {/* Back Button */}
        <div className="mt-6 text-center">
          <button
            onClick={onClose}
            className="lg:text-base text-sm bg-raisinBlack text-golden border border-raisinBlack px-4 py-2 rounded-lg hover:bg-transparent font-semibold hover:text-raisinBlack transition-all"
          >
            Back to the World
          </button>
        </div>
      </div>
    </div>
  );
}