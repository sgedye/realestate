import { UseModalReturn } from "../hooks/useModal";
import { SvgIcon } from "./SvgIcons";

interface EditPropertyModalProps extends UseModalReturn {
  propertyId: string;
}

export const EditPropertyModal = (
  props: EditPropertyModalProps
): JSX.Element | null => {
  if (!props.show || !props.propertyId) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm w-screen h-screen flex"
      tabIndex={-1}
    >
      <div className="w-1/2 h-96 self-center mx-auto">
        <div className="w-full h-full flex flex-col bg-white rounded-md">
          <div className="flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200">
            <h5 className="text-xl font-medium leading-normal text-gray-800">
              Editing Property - {props.propertyId}
            </h5>
            <button
              type="button"
              className="border-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75"
              aria-label="Close"
              onClick={props.onHide}
            >
              <SvgIcon
                aria-hidden
                icon="ri-close-fill"
                width={30}
                height={30}
              />
            </button>
          </div>
          <div className="flex flex-grow p-4">Modal body text goes here.</div>
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
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
