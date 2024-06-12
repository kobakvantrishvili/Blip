import { fetchNftEvents } from "@/services/external/fetchNftEvents";

interface FetchResult {
  status: number;
  data?: any[];
  error?: string;
}

const fetchAllEvents = async (eventType: string, collectionSlug: string, after: number, before: number): Promise<FetchResult> => {
  let allEvents: any[] = [];
  let next: string | undefined;

  try {
    do {
      const response = await fetchNftEvents(collectionSlug, eventType, after, before, undefined, next);
      const data = await response.json();
      if (!response.ok) return { status: response.status, error: data };

      allEvents = allEvents.concat(data.asset_events);
      next = data.next;
    } while (next);

    return { status: 200, data: allEvents };
  } catch (error) {
    if (error instanceof Error) {
      return { status: 500, error: error.message };
    } else {
      return { status: 500, error: "An unknown error occurred" };
    }
  }
};

export default fetchAllEvents;
