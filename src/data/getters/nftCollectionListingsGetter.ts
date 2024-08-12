import { NftListing } from "@/services/models/types";

const nftCollectionListingsGetter = async (
  collectionSlug: string,
  contractAddress: string,
  limit: string = "50",
  orderType: number,
  next?: string
): Promise<NftListing[]> => {
  const params = new URLSearchParams({
    collectionSlug,
    contractAddress,
    limit: limit.toString(),
    orderType: orderType.toString(),
    ...(next && { next }),
  });

  const response = await fetch(`/api/getNftCollectionListings?${params}`);
  if (!response.ok) {
    throw new Error("Failed to fetch NFT listings");
  }

  const data: NftListing[] = await response.json();
  console.log(`Retrieved NFT listings at ${new Date()}`);

  return data;
};

export default nftCollectionListingsGetter;
