export const fetchNftTokenList = async (contract: string, tokenIds: string[]): Promise<Response> => {
  const apiKey = process.env.NEXT_PUBLIC_SIMPLEHASH_API_KEY || "";
  const baseUrl = "https://api.simplehash.com/api/v0/nfts/assets";

  const nftIds = tokenIds.map((id) => `ethereum.${contract}.${id}`).join(",");
  const url = `${baseUrl}?nft_ids=${encodeURIComponent(nftIds)}`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "X-API-KEY": apiKey,
    },
  };

  try {
    const response = await fetch(url, options);
    return response;
  } catch (err) {
    console.error("Error fetching NFT token list:", err);
    throw new Error("Failed to fetch NFT token list");
  }
};
