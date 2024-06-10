import { NftListing } from "@/services/models/types";

const processNftListings = (data: any, orderType: number) => {
  const listings: NftListing[] = [];
  const seenTokens = new Set<string>();

  data.listings.forEach((listing: any) => {
    const { price, protocol_data } = listing;

    if (protocol_data.parameters.orderType === orderType) {
      const identifierOrCriteria = protocol_data.parameters.offer[0].identifierOrCriteria;

      if (!seenTokens.has(identifierOrCriteria)) {
        const processedListing: NftListing = {
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

export default processNftListings;
