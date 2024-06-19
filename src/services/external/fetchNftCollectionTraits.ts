export const fetchNftCollectionTraits = async (collectionSlug: string) => {
  const apiKey = process.env.NEXT_PUBLIC_OPENSEA_API_KEY || "";
  const url = `https://api.opensea.io/api/v2/traits/${collectionSlug}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-api-key": apiKey,
    },
  };

  try {
    const response = await fetch(url, options);
    return response;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch NFT collection traits");
  }
};
