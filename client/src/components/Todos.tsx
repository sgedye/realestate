export const Todos = (): JSX.Element => {
  return (
    <section className="border p-4 bg-gray-500 rounded-lg mb-6">
      <h1 className="font-bold">TO Dos:</h1>
      <ul className="list-disc pl-6">
        <li className="text-lg">
          Fix client types -- use from shared.
        </li>
        <li className="text-lg">
          Look into performing CRUD on userData and store in a JSON file
          locally.
        </li>
        <li className="text-lg">Create a merged object of scrapedData & userData.</li>
        <hr className="my-2" />
        <li className="text-sm">
          Looking into creating an edit view to add/updated properties.
        </li>
        <li className="text-sm">
          Look into creating a map view to see all locations.
        </li>
        <li className="text-sm">
          Look into creating a download page to download property infomation.
        </li>
        <li className="text-sm">
          Create a "$" filter to toggle sold properties.
        </li>
        <li className="text-sm">
          Create a visited filter to toggle sold properties.
        </li>
      </ul>
    </section>
  );
};
