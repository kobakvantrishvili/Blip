import fetchAllEvents from "@/services/utils/fetchAllEvents";
import { NftSaleEvent } from "@/services/models/types";

interface ServiceResponse<T> {
  status: number;
  data?: T;
  error?: string;
}

class NftCollectionSalesService {
  private readonly collectionSlug: string;
  private readonly saleEvent = "sale";

  constructor(collectionSlug: string) {
    this.collectionSlug = collectionSlug;
  }

  public async getSalesData(after: number, before: number): Promise<ServiceResponse<NftSaleEvent[]>> {
    try {
      const result = await fetchAllEvents(this.saleEvent, this.collectionSlug, after, before);
      if (result.status !== 200) {
        return { status: result.status, error: result.error };
      }
      return { status: 200, data: result.data };
    } catch (error) {
      if (error instanceof Error) {
        return { status: 500, error: error.message };
      } else {
        return { status: 500, error: "An unknown error occurred" };
      }
    }
  }

  public async calculateSalesVolume(after: number, before: number): Promise<ServiceResponse<{ volume: number }>> {
    try {
      const result = await fetchAllEvents(this.saleEvent, this.collectionSlug, after, before);
      if (result.status !== 200) {
        return { status: result.status, error: result.error };
      }

      const saleEvents: any[] = result.data || [];
      const salesVolume = saleEvents.reduce((total, event) => {
        const validSymbols = ["ETH", "WETH"];
        if (!validSymbols.includes(event.payment.symbol)) return total;
        const price = Number(event.payment.quantity) / 10 ** event.payment.decimals;
        //console.log(`${total} + ${price} => ID : ${event.nft.identifier}`);
        return total + price;
      }, 0);

      return {
        status: 200,
        data: {
          volume: salesVolume,
        },
      };
    } catch (error) {
      if (error instanceof Error) {
        return { status: 500, error: error.message };
      } else {
        return { status: 500, error: "An unknown error occurred" };
      }
    }
  }

  public async calculateSalesVolumeChange(from1: number, to1: number, from2: number, to2: number): Promise<ServiceResponse<{ change: string }>> {
    try {
      const volumeResults = await Promise.all([this.calculateSalesVolume(from1, to1), this.calculateSalesVolume(from2, to2)]);
      const hasError = volumeResults.some((result) => result.status !== 200);
      if (hasError) {
        const errorResponse = volumeResults.find((result) => result.status !== 200);
        return { status: errorResponse?.status ?? 500, error: errorResponse?.error ?? "Failed to calculate sales volume" };
      }
      const [volume1Result, volume2Result] = volumeResults.map((result) => result.data?.volume || 0);
      const change = volume1Result !== 0 ? ((volume2Result - volume1Result) / volume1Result) * 100 : 0;

      return {
        status: 200,
        data: {
          change: change.toFixed(2),
        },
      };
    } catch (error) {
      if (error instanceof Error) {
        return { status: 500, error: error.message };
      } else {
        return { status: 500, error: "An unknown error occurred" };
      }
    }
  }
}

export default NftCollectionSalesService;
