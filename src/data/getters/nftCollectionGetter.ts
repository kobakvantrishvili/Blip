import { NftCollection } from "@/services/models/types";

const nftCollectionGetter = async (collectionSlug: string): Promise<NftCollection> => {
  const response = await fetch(`/api/getNftCollection?collectionSlug=${collectionSlug}`);
  if (!response.ok) {
    throw new Error("Failed to fetch collection data");
  }
  const data: NftCollection = await response.json();
  console.log(`Retrieved Collection Info at ${new Date()}`);
  return data;
};

export default nftCollectionGetter;
