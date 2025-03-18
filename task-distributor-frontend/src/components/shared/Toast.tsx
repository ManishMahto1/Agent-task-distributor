import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import React from 'react';

type ToastType = 'success' | 'error';

interface ToastProps {
  type: ToastType;
  message: string;
  onClose: () => void;
}

const toastVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 50 },
};

const getToastStyles = (type: ToastType) => {
  if (type === 'success') {
    return 'bg-green-100 text-green-800 border-green-300';
  } else {
    return 'bg-red-100 text-red-800 border-red-300';
  }
};

const Toast: React.FC<ToastProps> = ({ type, message, onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={toastVariants}
        transition={{ duration: 0.3 }}
        className={`fixed bottom-4 right-4 z-50 px-4 py-3 border rounded-xl shadow-lg flex items-center justify-between gap-3 max-w-xs w-full ${getToastStyles(type)}`}
      >
        <p className="text-sm font-medium">{message}</p>
        <button onClick={onClose}>
          <X className="w-4 h-4" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default Toast;
