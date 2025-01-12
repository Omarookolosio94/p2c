import { cx } from "../utilities/helpers";
import Button from "./html/Button";

interface ModalProps {
  onClose?: () => void;
  children?: React.ReactNode;
  header?: string;
  instruction?: string;
  boxStyle?: string;
  bodyStyle?: string;
  useRouteClose?: boolean;
  showClose?: boolean;
  showHeaderClose?: boolean;
  closeBtnStyle?: string;
}

function Modal({
  onClose = () => {},
  children = <div />,
  header = "",
  instruction = "",
  boxStyle = "",
  bodyStyle = "",
  showClose = true,
  showHeaderClose = true,
  closeBtnStyle = "",
}: ModalProps) {
  const closeModal = () => {
    onClose();
  };

  return (
    <div
      className={cx(
        "no-scrollbar overlay fixed left-0 top-0 z-40 h-[100%] w-[100%] overflow-auto bg-blue-600 bg-opacity-10 py-[40px] backdrop-blur-sm backdrop-filter",
        boxStyle,
      )}
      style={{ minHeight: "100%", zIndex: 1000 }}
    >
      <div
        className={cx(
          "mx-auto w-full max-w-md rounded-sm bg-white p-3 shadow-sm md:p-8",
          bodyStyle,
        )}
      >
        <div className="flex items-start justify-between">
          <div>
            {header && (
              <p className="font-medium leading-none text-gray-600">{header}</p>
            )}
            {instruction && <p className="font-light text-xs text-gray-600">{instruction}</p>}
          </div>

          {showHeaderClose && (
            <button onClick={() => closeModal()}>
              <span className="iconify text-4xl text-gray-600 la--window-close"></span>
            </button>
          )}
        </div>
        <div className="mt-10">
          {children}

          {showClose && (
            <div
              className={cx("flex items-center justify-center", closeBtnStyle)}
            >
              <Button
                onClick={() => closeModal()}
                className="mt-8 font-medium w-full border !bg-gray-100 !text-black"
              >
                Close
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
