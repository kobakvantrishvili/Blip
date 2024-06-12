import NftCollectionOffersService from "@/services/NftCollectionOffersService";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { collectionSlug } = req.query;

  if (typeof collectionSlug !== "string") {
    res.status(400).json({ error: "Invalid collection slug" });
    return;
  }

  try {
    const nftCollectionOffersService = new NftCollectionOffersService(collectionSlug);
    const { status, data, error } = await nftCollectionOffersService.getTopBid();

    if (status === 200) {
      res.status(200).json(data);
    } else {
      res.status(status).json({ error });
    }
  } catch (err) {
    res.status(500).json({ error: "An unknown error occurred" });
  }
};
