import NftCollectionListingsService from "@/services/NftCollectionListingsService";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Check if the request method is POST
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  // Extract parameters from the request body
  const { hash, chain, fulfillerAddress, collectionSlug, contractAddress } = req.body;

  // Validate the input parameters
  if (typeof hash !== "string" || !hash) {
    res.status(400).json({ error: "Invalid listing hash" });
    return;
  }
  if (typeof chain !== "string" || !chain) {
    res.status(400).json({ error: "Invalid chain" });
    return;
  }
  if (typeof fulfillerAddress !== "string" || !fulfillerAddress) {
    res.status(400).json({ error: "Invalid fulfiller address" });
    return;
  }
  if (typeof collectionSlug !== "string" || !collectionSlug) {
    res.status(400).json({ error: "Invalid collection slug" });
    return;
  }
  if (typeof contractAddress !== "string" || !contractAddress) {
    res.status(400).json({ error: "Invalid contract address" });
    return;
  }

  try {
    const nftListingsService = new NftCollectionListingsService(collectionSlug, contractAddress);

    const { status, data, error } = await nftListingsService.fulfillListing(hash, chain, fulfillerAddress);

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
