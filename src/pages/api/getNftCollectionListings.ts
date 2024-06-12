import NftListingsService from "@/services/NftCollectionListingsService";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { collectionSlug, limit = "100", orderType, next } = req.query;

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

  const parsedLimit = parseInt(limit, 10);
  const chosenOrderType = parseInt(orderType, 10);

  try {
    const nftListingsService = new NftListingsService(collectionSlug);
    const { status, data, error } = await nftListingsService.getNftListingsByType(chosenOrderType, parsedLimit, next as string);

    if (status === 200) {
      res.status(200).json(data);
    } else {
      res.status(status).json({ error });
    }
  } catch (err) {
    res.status(500).json({ error: "An unknown error occurred" });
  }
};
