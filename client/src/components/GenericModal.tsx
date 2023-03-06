import { UseModalReturn } from "~/hooks";
import { SvgIcon } from "~/components";

export const Modal = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="fixed inset-0 w-screen h-screen flex
        bg-black bg-opacity-30 backdrop-blur-sm 
        transition duration-150 ease-in-out"
    >
      <div className="w-1/2 self-center mx-auto">
        <div className="flex flex-col bg-white rounded-md">{children}</div>
      </div>
    </div>
  );
};

interface ModalHeaderProps extends UseModalReturn {
  title: string;
}

const ModalHeader = (props: ModalHeaderProps): JSX.Element => {
  return (
    <div className="flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200">
      <h5 className="text-xl font-medium leading-normal text-gray-800">
        {props.title}
      </h5>
      <button
        type="button"
        className="border-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75"
        aria-label="Close"
        onClick={props.onHide}
      >
        <SvgIcon aria-hidden icon="ri-close-fill" width={30} height={30} />
      </button>
    </div>
  );
};

const ModalBody = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

interface ModalFooterProps extends UseModalReturn {
  onSave: () => void;
}

const ModalFooter = (props: ModalFooterProps) => {
  return (
    <div className="flex flex-shrink-0 flex-wrap items-center justify-between p-4 border-t border-gray-200">
      <button
        type="button"
        className="px-6 py-2.5
                text-white font-medium text-xs leading-tight uppercase
                bg-gray-600 shadow-md rounded
                hover:bg-gray-700 hover:shadow-lg
                focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0
                active:bg-gray-800 active:shadow-lg
                transition duration-150 ease-in-out"
        onClick={props.onHide}
      >
        Close
      </button>
      <button
        type="button"
        className="px-6 py-2.5
              text-white font-medium text-xs leading-tight uppercase
              bg-blue-600 shadow-md rounded
              hover:bg-blue-700 hover:shadow-lg
              focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
              active:bg-blue-800 active:shadow-lg
              transition duration-150 ease-in-out"
        onClick={props.onSave}
      >
        Save changes
      </button>
    </div>
  );
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
