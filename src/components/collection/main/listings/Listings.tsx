import SearchBar from "@/components/shared/SearchBar";
import { FiLayers } from "react-icons/fi";

const Listings: React.FC = () => {
  return (
    <div className="flex flex-1 flex-col h-full w-full px-6">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row justify-start items-center gap-5">
          <div className="flex flex-row gap-2">
            <FiLayers className="text-2xl text-text-secondary" />
            <p className="text-text-secondary tracking-wider">ITEMS</p>
          </div>
          <div className="flex flex-row gap-2">
            <FiLayers className="text-2xl text-text-secondary" />
            <p className="text-text-secondary tracking-wider">ITEMS</p>
          </div>
        </div>
        <SearchBar barWidth="w-16" className="border rounded border-dark-border h-8 p-2" />
      </div>
    </div>
  );
};

export default Listings;
