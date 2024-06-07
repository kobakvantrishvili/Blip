import { NextApiRequest, NextApiResponse } from "next";

const fetchNftCollection = async (collectionSlug: string, apiKey: string) => {
  const url = `https://api.opensea.io/api/v2/collections/${collectionSlug}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-api-key": apiKey,
    },
  };

  try {
    const response = await fetch(url, options);
    return response;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch NFT Collection");
  }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { collectionSlug } = req.query;

  if (!collectionSlug || typeof collectionSlug !== "string") {
    res.status(400).json({ error: "Invalid collection slug" });
    return;
  }

  const apiKey = process.env.NEXT_PUBLIC_OPENSEA_API_KEY || "";

  try {
    const response = await fetchNftCollection(collectionSlug, apiKey);
    const data = await response.json();

    if (response.status === 200) {
      res.status(200).json(data);
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
