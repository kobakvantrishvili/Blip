import { fetchNftListings } from "@/services/external/fetchNftListings";
import processNftListings from "@/services/processNftListings";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { collectionSlug, limit = "100", next, orderType } = req.query;

  if (typeof collectionSlug !== "string") {
    res.status(400).json({ error: "Invalid collection slug" });
    return;
  }
  if (typeof limit !== "string") {
    res.status(400).json({ error: "Invalid limit" });
    return;
  }
  if (typeof orderType !== "string" || ![0, 2].includes(Number(orderType))) {
    res.status(400).json({ error: "Invalid order type" });
    return;
  }

  const apiKey = process.env.NEXT_PUBLIC_OPENSEA_API_KEY || "";
  const parsedLimit = parseInt(limit, 10);
  const chosenOrderType = parseInt(orderType, 10);

  try {
    const response = await fetchNftListings(collectionSlug, apiKey, parsedLimit, next as string);
    const data = await response.json();

    if (response.status === 200) {
      res.status(200).json(processNftListings(data, chosenOrderType));
    } else {
      res.status(response.status).json({ error: data });
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};
