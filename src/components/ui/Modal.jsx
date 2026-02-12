import { useEffect } from 'react';

export default function Modal({ isOpen, onClose, title, children, maxWidth = 'max-w-md' }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-deep/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={`bg-warm-white rounded-card shadow-2xl w-full ${maxWidth} p-6 relative`}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="mb-4 pb-4 border-b border-deep/10">
            <h2 className="text-2xl font-serif text-deep">{title}</h2>
          </div>
        )}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-rose/10 text-muted hover:text-rose transition-colors"
          aria-label="Close modal"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
