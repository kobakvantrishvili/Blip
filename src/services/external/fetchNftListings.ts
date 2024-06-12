export const fetchNftListings = async (collectionSlug: string, limit: number, next?: string) => {
  const params = new URLSearchParams({
    limit: limit.toString(),
    ...(next && { next }),
    //If next is truthy, { next } is spread into the new object, effectively adding a next property.
    //If next is falsy, false is spread, which results in no properties being added.
    //so if we supply next, we are adding a new property to params.
  });
  const apiKey = process.env.NEXT_PUBLIC_OPENSEA_API_KEY || "";
  const url = `https://api.opensea.io/api/v2/listings/collection/${collectionSlug}/best?${params}`;
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
    throw new Error("Failed to fetch NFT listings");
  }
};
