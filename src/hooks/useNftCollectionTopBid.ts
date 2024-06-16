const useNftCollectionTopBid = async (collectionSlug: string): Promise<number> => {
  const response = await fetch(`/api/getNftCollectionTopBid?collectionSlug=${collectionSlug}`);
  if (!response.ok) {
    throw new Error("Failed to fetch collection top bid");
  }
  const data: number = await response.json();
  console.log(`Retrieved Collection Top Bid at ${new Date()}`);
  return data;
};

export default useNftCollectionTopBid;
