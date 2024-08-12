import NftCollectionListingsService from "@/services/NftCollectionListingsService";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { collectionSlug, contractAddress, limit = "100", orderType, next } = req.query;

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
  if (typeof contractAddress !== "string") {
    res.status(400).json({ error: "Invalid contract address" });
    return;
  }

  const parsedLimit = parseInt(limit, 10);
  const chosenOrderType = parseInt(orderType, 10);

  try {
    const nftListingsService = new NftCollectionListingsService(collectionSlug, contractAddress);
    const { status, data, error } = await nftListingsService.getNftListingsDetails(chosenOrderType, parsedLimit, next as string);

    if (status === 200) {
      res.status(200).json(data);
    } else {
      res.status(status).json({ error });
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};
