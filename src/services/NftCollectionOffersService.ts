import { fetchNftCollectionOffers } from "@/services/external/fetchNftCollectionOffers";

interface ServiceResponse<T> {
  status: number;
  data?: T;
  error?: string;
}

class NftCollectionOffersService {
  private collectionSlug: string;

  constructor(collectionSlug: string) {
    this.collectionSlug = collectionSlug;
  }

  public async getTopBid(): Promise<ServiceResponse<number>> {
    try {
      const response = await fetchNftCollectionOffers(this.collectionSlug);
      const data = await response.json();
      if (!response.ok) {
        return { status: response.status, error: data };
      }

      let topBid = 0;

      for (let i = 0; i < data.offers.length; i++) {
        const offer = data.offers[i];
        if (offer.price.currency === "WETH" || offer.price.currency === "ETH") {
          const priceValue = Number(offer.price.value) / 10 ** offer.price.decimals;
          topBid = priceValue;
          break;
        }
      }

      return { status: 200, data: topBid };
    } catch (error) {
      if (error instanceof Error) {
        return { status: 500, error: error.message };
      } else {
        return { status: 500, error: "An unknown error occurred" };
      }
    }
  }
}

export default NftCollectionOffersService;
