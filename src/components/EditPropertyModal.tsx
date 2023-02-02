import { useEffect, useRef } from "react";
import { Modal } from ".";
import { UseModalReturn } from "../hooks/useModal";

interface EditPropertyModalProps extends UseModalReturn {
  propertyId: string;
}

export const EditPropertyModal = (
  props: EditPropertyModalProps
): JSX.Element | null => {
  const modalTitle = `Editing Property - ${props.propertyId}`;
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => firstInputRef.current?.focus(), []);

  return (
    <Modal>
      <Modal.Header title={modalTitle} {...props} />
      <Modal.Body>
        {inputArray.map((n, idx) => (
          <div key={idx} className="flex flex-col col-span-1">
            <label htmlFor={n} className="text-gray-600">
              {n}
            </label>
            <input
              type="text"
              id={n + "123"}
              name={n + "123"}
              ref={idx === 0 ? firstInputRef : null}
              placeholder="input field"
              className="mb-2 p-2 rounded-md"
            />
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer onSave={() => console.log("saving data...")} {...props} />
    </Modal>
  );
};

const inputArray = [
  "address",
  "imageSrc",
  "title",
  "subtitle",
  "beds",
  "bathrooms",
  "carbays",
  "dateAdded",
  "askingPrice",
  "lastSoldDate",
  "lastSoldPrice",
  "strataFees",
  "groupOf",
  "land",
  "floorArea",
  "yearBuilt",
  "description",
  "initialThoughts",
];
