import { CollectionTraits } from "@/services/models/types";

const useNftCollectionTraits = async (collectionSlug: string): Promise<any> => {
  const response = await fetch(`/api/getNftCollectionTraits?collectionSlug=${collectionSlug}`);
  if (!response.ok) {
    throw new Error("Failed to fetch collection traits");
  }
  const data: CollectionTraits = await response.json();
  console.log(`Retrieved Collection traits at ${new Date()}`);

  return data;
};

export default useNftCollectionTraits;
