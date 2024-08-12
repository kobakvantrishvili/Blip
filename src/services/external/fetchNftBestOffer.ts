export const fetchNftBestOffer = async (collectionSlug: string, id: string) => {
  const apiKey = process.env.NEXT_PUBLIC_OPENSEA_API_KEY || "";
  const url = `https://api.opensea.io/api/v2/offers/collection/${collectionSlug}/nfts/${id}/best`;
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
    throw new Error("Failed to Nft's Best Offer");
  }
};
