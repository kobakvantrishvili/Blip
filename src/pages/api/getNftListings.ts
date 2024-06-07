import { NextApiRequest, NextApiResponse } from "next";

type Listing = {
  order_hash: string;
  chain: string;
  type: string;
  price: {
    currency: string;
    value: number;
  };
  offer: {
    itemType: number;
    token: string;
    identifierOrCriteria: string;
  }[];
  offerer: string;
  startTime: string;
  endTime: string;
};

const fetchNftListings = async (collectionSlug: string, apiKey: string, limit: number, next?: string) => {
  const params = new URLSearchParams({
    limit: limit.toString(),
    ...(next && { next }),
    //If next is truthy, { next } is spread into the new object, effectively adding a next property.
    //If next is falsy, false is spread, which results in no properties being added.
    //so if we supply next, we are adding a new property to params.
  });

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-api-key": apiKey,
    },
  };

  const url = `https://api.opensea.io/api/v2/listings/collection/${collectionSlug}/best?${params}`;

  try {
    const response = await fetch(url, options);
    return response;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch NFT listings");
  }
};

const processNftListings = (data: any, orderType: number) => {
  const listings: Listing[] = [];
  const seenTokens = new Set<string>();

  data.listings.forEach((listing: any) => {
    const { price, protocol_data } = listing;

    if (protocol_data.parameters.orderType === orderType) {
      const identifierOrCriteria = protocol_data.parameters.offer[0].identifierOrCriteria;

      if (!seenTokens.has(identifierOrCriteria)) {
        const processedListing: Listing = {
          order_hash: listing.order_hash,
          chain: listing.chain,
          type: listing.type,
          price: {
            currency: price.current.currency,
            value: Number(price.current.value) / 10 ** price.current.decimals,
          },
          offerer: protocol_data.parameters.offerer,
          offer: protocol_data.parameters.offer,
          startTime: protocol_data.parameters.startTime,
          endTime: protocol_data.parameters.endTime,
        };

        listings.push(processedListing);
        seenTokens.add(identifierOrCriteria);
      }
    }
  });

  return listings;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { collectionSlug, limit = "100", next, orderType } = req.query;

  if (typeof collectionSlug !== "string") {
    res.status(400).json({ error: "Invalid collection slug" });
    return;
  }
  if (typeof limit !== "string") {
    res.status(400).json({ error: "Invalid limit" });
    return;
  }
  if (typeof orderType !== "string" || ![0, 2].includes(Number(orderType))) {
    res.status(400).json({ error: "Invalid order type" });
    return;
  }

  const apiKey = process.env.NEXT_PUBLIC_OPENSEA_API_KEY || "";
  const parsedLimit = parseInt(limit, 10);
  const chosenOrderType = parseInt(orderType, 10);

  try {
    const response = await fetchNftListings(collectionSlug, apiKey, parsedLimit, next as string);

    if (response.status === 200) {
      const data = await response.json();
      res.status(200).json(processNftListings(data, chosenOrderType));
    } else {
      res.status(response.status).json({ error: response.statusText });
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};
