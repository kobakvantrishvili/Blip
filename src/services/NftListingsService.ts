import { NftListing } from "@/services/models/types";
import { fetchNftListings } from "@/services/external/fetchNftListings";

interface ServiceResponse<T> {
  status: number;
  data?: T;
  error?: string;
}

class NftListingsService {
  private collectionSlug: string;

  constructor(collectionSlug: string) {
    this.collectionSlug = collectionSlug;
  }

  public async getNftListingsByType(orderType: number, limit: number, next?: string): Promise<ServiceResponse<NftListing[]>> {
    try {
      const response = await fetchNftListings(this.collectionSlug, limit, next);
      const data = await response.json();

      if (!response.ok) {
        return { status: response.status, error: data };
      }

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

      return { status: 200, data: listings };
    } catch (error) {
      return { status: 500, error: "Internal server error. Please open a support ticket so OpenSea can investigate." };
    }
  }
}

export default NftListingsService;
