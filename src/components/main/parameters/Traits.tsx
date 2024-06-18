import { GoTasklist } from "react-icons/go";
import PropertyBar from "@/components/main/parameters/PropertyBar";

const Traits = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center gap-2 px-3">
        <GoTasklist className="text-3xl text-text-secondary" />
        <div className=" text-text-primary text-lg"> TRAITS</div>
      </div>
      <div className="flex flex-col gap-2">
        <PropertyBar name="BACKGROUND" isOpen={false} />
      </div>
    </div>
  );
};

export default Traits;
