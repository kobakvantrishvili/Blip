import { NftCollectionStats } from "@/services/models/types";

const useNftCollectionStats = async (collectionSlug: string): Promise<NftCollectionStats> => {
  const response = await fetch(`/api/getNftCollectionStats?collectionSlug=${collectionSlug}`);
  if (!response.ok) {
    throw new Error("Failed to fetch collection stats");
  }
  const data: NftCollectionStats = await response.json();
  console.log(`Retrieved Collection Stats at ${new Date()}`);
  return data;
};

export default useNftCollectionStats;
