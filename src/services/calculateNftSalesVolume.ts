// services/processNftEvents.ts
import { NftSaleEvent } from "@/services/models/types"; // Ensure this type matches the event data structure

export const calculateNftSalesVolume = (events: any[]): number => {
  let totalVolume = 0;

  events.forEach((event: NftSaleEvent) => {
    const quantity = parseFloat(event.payment.quantity) / 10 ** event.payment.decimals;
    totalVolume += quantity;
  });

  return totalVolume;
};
