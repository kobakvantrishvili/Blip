import { GoTasklist } from "react-icons/go";
import PropertyBar from "@/components/main/parameters/PropertyBar";
import useNftCollectionTraits from "@/hooks/useNftCollectionTraits";
import { useEffect, useState } from "react";
import { CollectionTraits } from "@/services/models/types";
import CheckboxItem from "./CheckBoxItem";
import Button from "@/components/shared/Button";

interface SelectedTrait {
  category: string;
  type: string;
}

const Traits = () => {
  const collectionSlug = "lilpudgys";

  const [collectionTraits, setCollectionTraits] = useState<CollectionTraits | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [selectedTraits, setSelectedTraits] = useState<SelectedTrait[]>([]);

  useEffect(() => {
    const fetchNftCollectionTraits = async () => {
      try {
        const collectionTraitsData = await useNftCollectionTraits(collectionSlug);
        setCollectionTraits(collectionTraitsData);

        setError(null);
      } catch (error) {
        console.error("Error fetching NFT Collection traits:", error);
        setError("Failed to fetch NFT Collection Traits. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNftCollectionTraits();
  }, [collectionSlug]);

  const handlePropertyBarClick = (category: string) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  const handleCheckboxChange = (category: string, type: string, checked: boolean) => {
    if (checked) {
      setSelectedTraits([...selectedTraits, { category, type }]);
    } else {
      setSelectedTraits(selectedTraits.filter((trait) => !(trait.category === category && trait.type === type)));
    }
  };

  const isCheckboxChecked = (category: string, type: string) => {
    return selectedTraits.some((trait) => trait.type === type && trait.category === category);
  };

  const isCategorySelected = (category: string) => {
    return selectedTraits.some((trait) => trait.category === category);
  };

  const clearSelectedTraits = () => {
    setSelectedTraits([]);
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex flex-row items-center justify-between px-3">
        <div className="flex flex-row items-center gap-2">
          <GoTasklist className="text-3xl text-text-secondary" />
          <div className=" text-text-primary text-lg">TRAITS</div>
        </div>
        {selectedTraits.length > 0 && (
          <Button className="text-tertiary-accent text-base text-shadow-custom" onClick={clearSelectedTraits}>
            RESET
          </Button>
        )}
      </div>
      <div className="flex flex-col gap-1 overflow-y-auto scrollbar-hide">
        {collectionTraits &&
          Object.keys(collectionTraits.counts).map((category) => (
            <div key={category} className="flex flex-col gap-[2px]">
              <PropertyBar
                name={category}
                isOpen={openCategory === category}
                textColor={`${isCategorySelected(category) && "text-primary-accent"}`}
                onClick={() => handlePropertyBarClick(category)}
              />
              {openCategory === category && (
                <div className="max-h-60 overflow-y-auto ">
                  {Object.entries(collectionTraits.counts[category]).map(([type, count]) => (
                    <CheckboxItem
                      key={type}
                      type={type}
                      count={count}
                      category={category}
                      onChange={handleCheckboxChange}
                      isChecked={isCheckboxChecked(category, type)}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Traits;
