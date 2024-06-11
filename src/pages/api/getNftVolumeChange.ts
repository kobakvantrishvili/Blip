// pages/api/getNftVolumeChange.ts
import { fetchNftEvents } from "@/services/external/fetchNftEvents";
import { calculateNftSalesVolume } from "@/services/calculateNftSalesVolume";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { collectionSlug } = req.query;

  if (typeof collectionSlug !== "string") {
    res.status(400).json({ error: "Invalid collection slug" });
    return;
  }

  const apiKey = process.env.NEXT_PUBLIC_OPENSEA_API_KEY || "";
  const now = Math.floor(Date.now() / 1000); // Current time in Unix seconds
  const oneDay = 24 * 60 * 60; // One day in seconds
  const oneWeek = 7 * oneDay; // One week in seconds

  try {
    // Fetch last day's sales
    const lastDayStart = now - 2 * oneDay;
    const lastDayEnd = now - oneDay;
    const lastDayEvents = await fetchAllEvents(collectionSlug, apiKey, lastDayStart, lastDayEnd);

    // Fetch last week's sales
    const lastWeekStart = now - 2 * oneWeek;
    const lastWeekEnd = now - oneWeek;
    const lastWeekEvents = await fetchAllEvents(collectionSlug, apiKey, lastWeekStart, lastWeekEnd);

    // Fetch current day's sales
    const currentDayEvents = await fetchAllEvents(collectionSlug, apiKey, lastDayEnd, now);

    // Fetch current week's sales
    const currentWeekEvents = await fetchAllEvents(collectionSlug, apiKey, lastWeekEnd, now);

    const lastDayVolume = calculateNftSalesVolume(lastDayEvents);
    const lastWeekVolume = calculateNftSalesVolume(lastWeekEvents);
    const currentDayVolume = calculateNftSalesVolume(currentDayEvents);
    const currentWeekVolume = calculateNftSalesVolume(currentWeekEvents);

    const oneDayChange = lastDayVolume ? ((currentDayVolume - lastDayVolume) / lastDayVolume) * 100 : 0;
    const sevenDayChange = lastWeekVolume ? ((currentWeekVolume - lastWeekVolume) / lastWeekVolume) * 100 : 0;

    res.status(200).json({
      oneDayChange: oneDayChange.toFixed(2) + "%",
      sevenDayChange: sevenDayChange.toFixed(2) + "%",
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

const fetchAllEvents = async (collectionSlug: string, apiKey: string, after: number, before: number) => {
  let allEvents: any[] = [];
  let next: number | undefined;

  do {
    const response = await fetchNftEvents(collectionSlug, "sale", apiKey, after, before, next);
    const data = await response.json();
    allEvents = allEvents.concat(data.asset_events);
    next = data.next;
  } while (next);

  return allEvents;
};
