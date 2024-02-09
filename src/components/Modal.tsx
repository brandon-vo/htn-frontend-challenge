interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <>
      <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-medium-blue shadow-lg min-w-[400px] px-5 py-8 rounded-md z-[10001]">
        {children}
      </div>
      <div
        className="absolute left-0 top-0 w-screen h-screen bg-black opacity-40 z-[10000]"
        onClick={() => onClose()}
      />
    </>
  );
};

export default Modal;
