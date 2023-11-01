import type { ScrapedPropertyType } from "@shared/types";

interface PropertyDetailsProps extends ScrapedPropertyType {}

export const PropertyDetails = (props: PropertyDetailsProps) => {
  const mapAddress = props.address.replaceAll(" ", "%20");

  return (
    <div className="flex gap-4 p-4">
      <div>
        <p>{(props.description || "").slice(0, 999)}</p>
        <br />
        {props.property_history && <p style={{fontSize: "1.25rem", lineHeight: 1.5, whiteSpace: "pre"}}>{props.property_history.slice(0, 999)}</p>}
      </div>
      {/* <div className="-mr-4">
        <iframe
          width={400}
          height={400}
          src={`https://maps.google.com/maps?q=${mapAddress}&z=13&output=embed`}
        ></iframe>
      </div> */}
    </div>
  );
};
