interface ModalProps {
  children: React.ReactNode;
  onClose: (show: boolean) => void;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({ children, onClose, className }) => {
  return (
    <>
      <div
        className={`absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-medium-blue
          shadow-lg px-5 py-8 rounded-md z-[10001] ${className}`}
      >
        <button
          className="absolute top-2 right-3 text-red-400 text-lg hover:text-red-500 transition"
          onClick={() => onClose(false)}
        >
          ✖
        </button>
        {children}
      </div>
      <div
        className="absolute left-0 top-0 w-screen h-screen bg-black opacity-40 z-[10000]"
        onClick={() => onClose(false)}
      />
    </>
  );
};

export default Modal;
