import { NextApiResponse } from "next";
import { NftCollectionStats } from "@/services/models/types";
import { fetchNftCollectionStats } from "@/services/external/fetchNftCollectionStats";
import NftSalesService from "@/services/NftSalesService";

class NftCollectionService {
  private collectionSlug: string;

  constructor(collectionSlug: string) {
    this.collectionSlug = collectionSlug;
  }

  public async getNftCollectionStats(): Promise<any> {
    const now = Math.floor(Date.now() / 1000); // Current time in Unix seconds
    const oneDay = 24 * 60 * 60;
    const oneWeek = 7 * oneDay;

    const lastDayStart = now - 2 * oneDay;
    const lastDayEnd = now - oneDay;
    const lastWeekStart = now - 2 * oneWeek;
    const lastWeekEnd = now - oneWeek;
    try {
      const statsResponse = await fetchNftCollectionStats(this.collectionSlug);
      const statsData = await statsResponse.json();
      if (statsResponse.status !== 200) {
        return { status: statsResponse.status, error: statsData };
      }

      const nftSalesService = new NftSalesService(this.collectionSlug);
      const oneDayVolumeChangeResponse = await nftSalesService.calculateSalesVolumeChange(lastDayStart, lastDayEnd, lastDayEnd, now);
      const sevenDayVolumeChangeResponse = await nftSalesService.calculateSalesVolumeChange(lastWeekStart, lastWeekEnd, lastWeekEnd, now);

      if (oneDayVolumeChangeResponse.status !== 200) {
        return { status: oneDayVolumeChangeResponse.status, error: oneDayVolumeChangeResponse.error };
      }
      if (sevenDayVolumeChangeResponse.status !== 200) {
        return { status: sevenDayVolumeChangeResponse.status, error: sevenDayVolumeChangeResponse.error };
      }

      const oneDayVolumeChange = oneDayVolumeChangeResponse.data!;
      const sevenDayVolumeChange = sevenDayVolumeChangeResponse.data!;

      return { status: 200, data: { oneDayVolumeChange, sevenDayVolumeChange, statsData } };
    } catch (error) {
      return { status: 500, error: "An unknown error occurred" };
    }
  }
}

export default NftCollectionService;
