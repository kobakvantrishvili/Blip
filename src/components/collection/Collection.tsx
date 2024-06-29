"use client";

import React, { useState, useEffect } from "react";
import About from "@/components/collection/about/About";
import Main from "@/components/collection/main/Main";
import useNftCollection from "@/hooks/useNftCollection";
import useNftCollectionStats from "@/hooks/useNftCollectionStats";
import useNftCollectionTopBid from "@/hooks/useNftCollectionTopBid";
import useNftCollectionTraits from "@/hooks/useNftCollectionTraits";
import { NftCollection, NftCollectionStats, CollectionTraits } from "@/services/models/types";

const Collection: React.FC = () => {
  const collectionSlug = "momoguro-holoself";

  const [collection, setCollection] = useState<NftCollection | null>(null);
  const [collectionStats, setCollectionStats] = useState<NftCollectionStats | null>(null);
  const [collectionTopBid, setCollectionTopBid] = useState<number | null>(null);
  const [collectionTraits, setCollectionTraits] = useState<CollectionTraits | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [collectionData, collectionStatsData, collectionTopBidData, collectionTraitsData] = await Promise.all([
          useNftCollection(collectionSlug),
          useNftCollectionStats(collectionSlug),
          useNftCollectionTopBid(collectionSlug),
          useNftCollectionTraits(collectionSlug),
        ]);

        setCollection(collectionData);
        setCollectionStats(collectionStatsData);
        setCollectionTopBid(collectionTopBidData);
        setCollectionTraits(collectionTraitsData);

        setError(null);
      } catch (error) {
        console.error("Error fetching NFT data:", error);
        setError("Failed to fetch NFT Collection data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [collectionSlug]);

  return (
    <div className="h-full">
      <About
        collectionSlug={collectionSlug}
        collection={collection}
        collectionStats={collectionStats}
        collectionTopBid={collectionTopBid}
        setCollectionStats={setCollectionStats}
        setCollectionTopBid={setCollectionTopBid}
        error={error}
        isLoading={isLoading}
      />
      <div className="flex flex-1">
        <Main collectionSlug={collectionSlug} collectionTraits={collectionTraits} error={error} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Collection;
