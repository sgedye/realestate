import { useEffect, useRef, useState } from "react";

import { Modal } from ".";
import { UseModalReturn } from "../hooks/useModal";

import {
  ExtendedScrapedPropertyType,
  FavoriteLevelEnum,
  ScrapedPropertyType,
} from "../types";

interface EditPropertyModalProps extends UseModalReturn {
  property: ExtendedScrapedPropertyType;
}

export const EditPropertyModal = (
  props: EditPropertyModalProps
): JSX.Element | null => {
  const modalTitle = `Editing Property - ${props.property.property_id}`;

  const formRef = useRef<HTMLFormElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => firstInputRef.current?.focus(), []);

  const [values, setValues] = useState<ExtendedScrapedPropertyType>({
    ...props.property,
    favouriteLevel: props.property.favouriteLevel || FavoriteLevelEnum.None,
  });

  const propertyFields = Object.keys(props.property)
    .map((key) => {
      if (ignoreList.includes(key)) {
        return ["", undefined];
      }
      return [key, props.property[key as keyof ScrapedPropertyType]];
    })
    .filter((n) => !!n[0]) as string[][];

  const mergedPropertyFields = [...propertyFields, ...addList];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitting form...", e.target);
  };

  return (
    <Modal>
      <Modal.Header title={modalTitle} {...props} />
      <Modal.Body>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-4 p-4"
        >
          {mergedPropertyFields.map(([key], idx) => {
            if (key === "initialThoughts") {
              return (
                <div key={idx} className="flex flex-col col-span-2">
                  <label htmlFor={key} className="text-gray-600">
                    {key}
                  </label>
                  <textarea
                    id={key}
                    name={key}
                    rows={3}
                    className="mb-2 p-2 rounded-md"
                    value={values[key as keyof ScrapedPropertyType] || ""}
                    onChange={(e) => {
                      setValues((prev) => ({
                        ...prev,
                        [key]: e.target.value,
                      }));
                    }}
                  />
                </div>
              );
            } else {
              return (
                <div key={idx} className="flex flex-col col-span-1">
                  <label htmlFor={key} className="text-gray-600">
                    {key}
                  </label>
                  <input
                    type="text"
                    id={key}
                    name={key}
                    ref={idx === 0 ? firstInputRef : null}
                    placeholder={key}
                    className="mb-2 p-2 rounded-md"
                    value={values[key as keyof ScrapedPropertyType] || ""}
                    onChange={(e) => {
                      setValues((prev) => ({
                        ...prev,
                        [key]: e.target.value,
                      }));
                    }}
                  />
                </div>
              );
            }
          })}
        </form>
      </Modal.Body>
      <Modal.Footer
        onSave={() => {
          console.log("saving data..asdf.", values);

          if (formRef.current) {
            console.log(formRef.current);
            // formRef.current.submit();
          }
        }}
        {...props}
      />
    </Modal>
  );
};

const ignoreList = [
  "web-scraper-order",
  "web-scraper-start-url",
  "link",
  "link-href",
  "image-src",
  "property_id",
  "favouriteLevel",
];

const addList = [
  "dateAdded",
  "askingPrice",
  "lastSoldDate",
  "lastSoldPrice",
  "strataFees",
  "groupOf",
  "land",
  "floorArea",
  "yearBuilt",
  "initialThoughts",
].map((n) => [n, ""]);
