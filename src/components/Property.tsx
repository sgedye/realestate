import { SvgIcon } from "./SvgIcons";

export interface PropertyProps {
  "web-scraper-order": string;
  "web-scraper-start-url": string;
  link: string;
  "link-href": string;
  address: string;
  bedrooms?: string;
  bathrooms?: string;
  carbays?: string;
  type?: string;
  title?: string;
  "image-src"?: string;
  subtitle?: string;
  description?: string;
  building_size?: string;
  property_id: string;
}

export const Property = (props: PropertyProps) => {
  const mapAddress = props.address.replaceAll(" ", "%20");
  const propertyBaseUrl = "https://www.realestate.com.au/property/";
  const propertyPrefix = /^\d+\/\d+/.test(props.address) ? "unit-" : "";
  const propertyAddressUrl = props.address
    .toLowerCase()
    .replaceAll(/[, \/]+/g, "-")
    .replace("road", "rd")
    .replace("street", "st")
    .replace("parade", "pde")
    .replace("place", "pl")
    .replace("avenue", "ave")
    .replace("terrace", "tce");

  const showConfirmDelete = (id: number) => {
    console.log("deleting property id: ", id);
  };

  return (
    <article className="flex flex-col lg:flex-row bg-gray-400 gap-2 overflow-hidden rounded-lg mb-6">
      <img
        src={props["image-src"]}
        alt={props.address}
        className=""
        width={400}
        height={200}
      />
      <div className="flex flex-col grow gap-2 text-left p-4">
        <h1 className="text-xl">
          {props.type} - {props.title}
        </h1>
        <h2>{props.subtitle}</h2>
        <h3>{props.address}</h3>
        <div className="flex flex-row gap-2">
          <div aria-label={`${props.bedrooms} bedrooms`}>
            <span className="text-xl">{props.bedrooms || "?"}</span>
            <SvgIcon
              aria-hidden
              icon="pi-bed"
              width={20}
              height={20}
              className="text-white inline-block ml-1"
              fill="#fff"
            />
          </div>
          <div aria-label={`${props.bathrooms} bathrooms`}>
            <span className="text-xl">{props.bathrooms || "?"}</span>
            <SvgIcon
              aria-hidden
              icon="pi-bath"
              width={20}
              height={20}
              className="text-white inline-block ml-1"
              fill="#fff"
            />
          </div>
          <div aria-label={`${props.carbays} carbays`}>
            <span className="text-xl">{props.carbays || "?"}</span>
            <SvgIcon
              aria-hidden
              icon="pi-car"
              width={20}
              height={20}
              className="text-white inline-block ml-1"
              fill="#fff"
            />
          </div>
          <div aria-label={`${props.carbays} carbays`}>
            <span className="text-xl">{props.carbays || "?"}</span>
            <SvgIcon
              aria-hidden
              icon="pi-property"
              width={20}
              height={20}
              className="text-white inline-block ml-1"
            />
          </div>
        </div>
        <div className="flex flex-row gap-4 mt-auto">
          <div>
            <a
              href={props["link-href"]}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-center px-4 py-2 space-x-3 text-sm border rounded-lg dark:text-gray-200 dark:border-gray-200
            hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              View property
            </a>
          </div>
          <div>
            <a
              href={propertyBaseUrl + propertyPrefix + propertyAddressUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-center px-4 py-2 space-x-3 text-sm border rounded-lg dark:text-gray-200 dark:border-gray-200
 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Link to past sales
            </a>
          </div>
          <div className="ml-auto">
            <button
              className="px-4 py-2 space-x-3 text-sm border rounded-lg dark:text-red-200 dark:border-red-200
 hover:bg-red-100 dark:hover:bg-red-700"
              onClick={() => showConfirmDelete(Number(props.property_id))}
            >
              Remove from list
            </button>
          </div>
        </div>
      </div>
      <div className="">
        {/* <iframe
          width={400}
          height={400}
          src={`https://maps.google.com/maps?q=${mapAddress}&z=13&output=embed`}
        ></iframe> */}
      </div>      
    </article>
  );
};

