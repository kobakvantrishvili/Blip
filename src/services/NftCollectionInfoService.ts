import { fetchNftCollection } from "@/services/external/fetchNftCollection";
import { fetchNftCollectionStats } from "@/services/external/fetchNftCollectionStats";
import { NftCollection, NftCollectionStats } from "@/services/models/types";
import { fetchNftCollectionOffers } from "@/services/external/fetchNftCollectionOffers";
import NftCollectionOffersService from "@/services/NftCollectionOffersService";

interface ServiceResponse<T> {
  status: number;
  data?: T;
  error?: string;
}

class NftCollectionInfoService {
  private collectionSlug: string;

  constructor(collectionSlug: string) {
    this.collectionSlug = collectionSlug;
  }

  public async getNftCollectionInfo(): Promise<ServiceResponse<NftCollection>> {
    try {
      const response = await fetchNftCollection(this.collectionSlug);
      const data = await response.json();

      if (!response.ok) {
        return { status: response.status, error: data };
      }

      return { status: 200, data };
    } catch (error) {
      if (error instanceof Error) {
        return { status: 500, error: error.message };
      } else {
        return { status: 500, error: "An unknown error occurred" };
      }
    }
  }

  public async getNftCollectionStats(): Promise<ServiceResponse<NftCollectionStats>> {
    try {
      const response = await fetchNftCollectionStats(this.collectionSlug);
      const data = await response.json();

      if (!response.ok) {
        return { status: response.status, error: data };
      }

      return { status: 200, data };
    } catch (error) {
      if (error instanceof Error) {
        return { status: 500, error: error.message };
      } else {
        return { status: 500, error: "An unknown error occurred" };
      }
    }
  }

  public async getNftCollectionStatsAndTopBid(): Promise<ServiceResponse<NftCollectionStats>> {
    try {
      const nftCollectionOffersService = new NftCollectionOffersService(this.collectionSlug);
      const [statsResponse, offersResponse] = await Promise.all([fetchNftCollectionStats(this.collectionSlug), nftCollectionOffersService.getTopBid()]);

      if (!statsResponse.ok) {
        const errorData = await statsResponse.json();
        return { status: statsResponse.status, error: errorData.message || "Failed to fetch collection stats" };
      }

      if (offersResponse.status !== 200) {
        return { status: offersResponse.status, error: offersResponse.error || "Failed to retrieve collection's best offer" };
      }

      const statsData: NftCollectionStats = await statsResponse.json();
      const topBid = offersResponse.data ?? 0;

      statsData.total.best_offer = topBid;

      return { status: 200, data: statsData };
    } catch (error) {
      if (error instanceof Error) {
        return { status: 500, error: error.message };
      } else {
        return { status: 500, error: "An unknown error occurred" };
      }
    }
  }
}

export default NftCollectionInfoService;
