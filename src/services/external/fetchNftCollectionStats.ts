export const fetchNftCollectionStats = async (collectionSlug: string, apiKey: string) => {
  const url = `https://api.opensea.io/api/v2/collections/${collectionSlug}/stats`;
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
    throw new Error("Failed to fetch collection stats");
  }
};
