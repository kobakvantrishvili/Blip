export const fulfillNftListing = async (hash: string, fulfillerAddress: string, chain?: string) => {
  const apiKey = process.env.NEXT_PUBLIC_OPENSEA_API_KEY || "";
  const url = `https://api.opensea.io/api/v2/listings/fulfillment_data`;

  const body = {
    listing: {
      hash: hash,
      chain: chain || "ethereum",
      fulfiller: fulfillerAddress,
    },
  };

  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    },
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(url, options);

    return response;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fulfill NFT listing");
  }
};
