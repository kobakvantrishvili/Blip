import { NftListing, NftToken } from "@/services/models/types";
import { fetchNftListings } from "@/services/external/fetchNftListings";
import { fetchNftTokenList } from "@/services/external/fetchNftTokenList";
import { fulfillNftListing } from "@/services/external/fulfillNftListing";

interface ServiceResponse<T> {
  status: number;
  data?: T;
  error?: string;
}

class NftCollectionListingsService {
  private collectionSlug: string;
  private contractAddress: string;

  constructor(collectionSlug: string, contractAddress: string) {
    this.collectionSlug = collectionSlug;
    this.contractAddress = contractAddress;
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
              offer: protocol_data.parameters.offer,
              offerer: protocol_data.parameters.offerer,
              startTime: protocol_data.parameters.startTime,
              endTime: protocol_data.parameters.endTime,
              orderType: protocol_data.parameters.orderType,
            };

            listings.push(processedListing);
            seenTokens.add(identifierOrCriteria);
          }
        }
      });

      return { status: 200, data: listings };
    } catch (error) {
      if (error instanceof Error) {
        return { status: 500, error: error.message };
      } else {
        return { status: 500, error: "An unknown error occurred" };
      }
    }
  }

  public async getNftListingsDetails(orderType: number, limit: number, next?: string): Promise<ServiceResponse<NftListing[]>> {
    try {
      // Fetch NFT listings
      const listingsResponse = await fetchNftListings(this.collectionSlug, limit, next);
      const listingsData = await listingsResponse.json();

      if (!listingsResponse.ok) {
        return { status: listingsResponse.status, error: listingsData };
      }

      // Fetch NFT tokens
      const tokenIds = listingsData.listings.map((listing: any) => listing.protocol_data.parameters.offer[0].identifierOrCriteria);
      const tokensResponse = await fetchNftTokenList(this.contractAddress, tokenIds);
      const tokensData = await tokensResponse.json();

      if (!tokensResponse.ok) {
        return { status: tokensResponse.status, error: tokensData };
      }

      // Map tokens by their id for quick lookup
      const tokensMap: Record<string, NftToken> = {};
      tokensData.nfts.forEach((token: NftToken) => {
        tokensMap[token.token_id] = token;
      });

      // Combine listings with their corresponding token data
      const combinedListings: NftListing[] = [];
      const seenTokens = new Set<string>();

      listingsData.listings.forEach((listing: any) => {
        const { price, protocol_data } = listing;
        const identifierOrCriteria = protocol_data.parameters.offer[0].identifierOrCriteria;

        if (protocol_data.parameters.orderType === orderType && !seenTokens.has(identifierOrCriteria)) {
          const token = tokensMap[identifierOrCriteria];
          if (token) {
            const processedListing: NftListing = {
              order_hash: listing.order_hash,
              chain: listing.chain,
              type: listing.type,
              price: {
                currency: price.current.currency,
                value: Number(price.current.value) / 10 ** price.current.decimals,
              },
              offer: protocol_data.parameters.offer,
              offerer: protocol_data.parameters.offerer,
              startTime: protocol_data.parameters.startTime,
              endTime: protocol_data.parameters.endTime,
              orderType: protocol_data.parameters.orderType,
              token,
            };

            combinedListings.push(processedListing);
            seenTokens.add(identifierOrCriteria);
          }
        }
      });

      return { status: 200, data: combinedListings };
    } catch (error) {
      if (error instanceof Error) {
        return { status: 500, error: error.message };
      } else {
        return { status: 500, error: "An unknown error occurred" };
      }
    }
  }

  public async fulfillListing(hash: string, chain: string, fulfillerAddress: string): Promise<ServiceResponse<any>> {
    try {
      const response = await fulfillNftListing(hash, chain, fulfillerAddress);
      const data = await response.json();

      if (!response.ok) {
        return { status: response.status, error: data };
      }

      return { status: 200, data }; // Return the data from the fulfillment response
    } catch (error) {
      if (error instanceof Error) {
        return { status: 500, error: error.message };
      } else {
        return { status: 500, error: "An unknown error occurred" };
      }
    }
  }
}

export default NftCollectionListingsService;
