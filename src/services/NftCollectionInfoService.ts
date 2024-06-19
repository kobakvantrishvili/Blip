import { fetchNftCollection } from "@/services/external/fetchNftCollection";
import { fetchNftCollectionStats } from "@/services/external/fetchNftCollectionStats";
import { CollectionTraits, NftCollection, NftCollectionStats } from "@/services/models/types";
import { fetchNftCollectionTraits } from "@/services/external/fetchNftCollectionTraits";

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

  public async getNftCollectionTraits(): Promise<ServiceResponse<CollectionTraits>> {
    try {
      const response = await fetchNftCollectionTraits(this.collectionSlug);
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
}

export default NftCollectionInfoService;
