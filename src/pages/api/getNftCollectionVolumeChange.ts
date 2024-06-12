import { NextApiRequest, NextApiResponse } from "next";
import NftSalesService from "@/services/NftCollectionSalesService";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { collectionSlug, from1, to1, from2, to2 } = req.query;

  if (typeof collectionSlug !== "string") {
    res.status(400).json({ error: "Invalid collection slug" });
    return;
  }

  try {
    const nftSalesService = new NftSalesService(collectionSlug as string);
    const {
      status,
      data: volumeChanges,
      error,
    } = await nftSalesService.calculateSalesVolumeChange(
      parseInt(from1 as string),
      parseInt(to1 as string),
      parseInt(from2 as string),
      parseInt(to2 as string)
    );
    if (status === 200) {
      res.status(200).json(volumeChanges);
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
