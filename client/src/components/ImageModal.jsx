import React from 'react';
import { X } from 'lucide-react';

export const ImageModal = ({ imageUrl, onClose }) => {
  if (!imageUrl) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative max-w-3xl w-full bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white hover:bg-neutral-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="p-4 flex justify-center bg-black">
          <img
            src={imageUrl}
            alt="Complaint Attachment"
            className="max-h-[80vh] w-auto object-contain rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
