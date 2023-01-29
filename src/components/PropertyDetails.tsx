import type { ScrapedPropertyType } from "../types";

interface PropertyDetailsProps extends ScrapedPropertyType {}

export const PropertyDetails = (props: PropertyDetailsProps) => {
  return <div className="p-4">{(props.description || "").slice(0, 999)}</div>;
}