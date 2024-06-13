import NftCollectionInfoService from "@/services/NftCollectionInfoService";
import { fetchNftCollectionStats } from "@/services/external/fetchNftCollectionStats";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { collectionSlug } = req.query;

  if (!collectionSlug || typeof collectionSlug !== "string") {
    res.status(400).json({ error: "Invalid collection slug" });
    return;
  }

  try {
    const nftCollectionInfoService = new NftCollectionInfoService(collectionSlug);
    const { status, data, error } = await nftCollectionInfoService.getNftCollectionStats();

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
