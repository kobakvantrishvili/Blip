import SearchBar from "@/components/shared/SearchBar";
import { FiLayers } from "react-icons/fi";
import { PiGavel } from "react-icons/pi";
import { MdOutlinePeopleAlt } from "react-icons/md";
import Tab from "@/components/collection/main/listings/Tab";

const Listings: React.FC = () => {
  return (
    <div className="flex flex-1 flex-col h-full w-full px-6 py-6">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row justify-start items-center gap-5">
          <Tab text="ITEMS" Icon={FiLayers} />
          <Tab text="BIDS" Icon={PiGavel} />
          <Tab text="HOLDERS" Icon={MdOutlinePeopleAlt} />
        </div>
        <SearchBar barWidth="w-14" className="border rounded border-dark-border h-8 p-2" placeholder="Item ID" />
      </div>
    </div>
  );
};

export default Listings;
