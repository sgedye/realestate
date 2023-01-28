import townhouses from "./data/townhouses.json";
import { Property } from "./components";

function App() {
  return (
    <div className="container mx-auto my-8">
      <div className="border p-4 text-center bg-gray-500 rounded-lg mb-6">
        TO DO - Add in a search / filter here.
      </div>
      {townhouses.map((n) => (
        <Property key={n.property_id} {...n} />
      ))}
    </div>
  );
}

export default App;
