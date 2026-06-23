import React from 'react';

export const Toast = ({ message, onComplete }) => {
  React.useEffect(() => {
    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return <div className="toast">{message}</div>;
};

export const ToastStack = ({ toasts, onRemoveToast }) => {
  return (
    <div className="toast-stack">
      {toasts.map((toast, idx) => (
        <Toast
          key={toast.id}
          message={toast.message}
          onComplete={() => onRemoveToast(toast.id)}
        />
      ))}
    </div>
  );
};
