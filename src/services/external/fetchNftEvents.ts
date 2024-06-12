export const fetchNftEvents = async (collectionSlug: string, eventType: string, after: number, before: number, limit?: number, next?: string) => {
  const params = new URLSearchParams({
    event_type: eventType,
    after: after.toString(),
    before: before.toString(),
    limit: limit ? limit.toString() : "50",
    ...(next && { next }),
  });

  const apiKey = process.env.NEXT_PUBLIC_OPENSEA_API_KEY || "";
  const url = `https://api.opensea.io/api/v2/events/collection/${collectionSlug}?${params}`;
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
    throw new Error(`Failed to fetch NFT ${eventType} events`);
  }
};
