import { fetchNftCollectionStats } from "@/services/external/fetchNftCollectionStats";
import NftSalesService from "@/services/NftCollectionSalesService";

class NftCollectionInfoService {
  private collectionSlug: string;

  constructor(collectionSlug: string) {
    this.collectionSlug = collectionSlug;
  }

  public async getNftCollectionVolumeChange(): Promise<any> {
    const now = Math.floor(Date.now() / 1000); // Current time in Unix seconds
    const oneDay = 24 * 60 * 60;
    const oneWeek = 7 * oneDay;

    const lastDayStart = now - 2 * oneDay;
    const lastDayEnd = now - oneDay;
    const lastWeekStart = now - 2 * oneWeek;
    const lastWeekEnd = now - oneWeek;
    try {
      const response = await fetchNftCollectionStats(this.collectionSlug);
      const data = await response.json();
      if (response.status !== 200) {
        return { status: response.status, error: data };
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

      return { status: 200, data: { oneDayVolumeChange, sevenDayVolumeChange, statsData: data } };
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
