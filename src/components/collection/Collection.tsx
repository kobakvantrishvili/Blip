"use client";

import React, { useState, useEffect } from "react";
import About from "@/components/collection/about/About";
import Main from "@/components/collection/main/Main";
import nftCollectionGetter from "@/data/getters/nftCollectionGetter";
import nftCollectionStatsGetter from "@/data/getters/nftCollectionStatsGetter";
import nftCollectionTopBidGetter from "@/data/getters/nftCollectionTopBidGetter";
import nftCollectionTraitsGetter from "@/data/getters/nftCollectionTraitsGetter";
import nftCollectionListingsGetter from "@/data/getters/nftCollectionListingsGetter";
import { NftCollection, NftCollectionStats, CollectionTraits, NftListing } from "@/services/models/types";

interface CollectionProps {
  searchQuery: string; // Receive search query from Page.tsx
}

const Collection: React.FC<CollectionProps> = ({ searchQuery }) => {
  //const collectionSlug = "mutant-ape-yacht-club";
  const [collectionSlug, setCollectionSlug] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const [collection, setCollection] = useState<NftCollection | null>(null);
  const [collectionStats, setCollectionStats] = useState<NftCollectionStats | null>(null);
  const [collectionTopBid, setCollectionTopBid] = useState<number | null>(null);
  const [collectionTraits, setCollectionTraits] = useState<CollectionTraits | null>(null);
  const [collectionListings, setCollectionListings] = useState<NftListing[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  enum OrderType {
    BUY_NOW = 0,
    AUCTION = 1,
    OFFER = 2,
  }

  useEffect(() => {
    if (searchQuery) {
      setCollectionSlug(searchQuery.trim());
      setIsLoading(true);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (!collectionSlug) return;

    const fetchData = async () => {
      try {
        const collectionData = await nftCollectionGetter(collectionSlug);
        setCollection(collectionData);

        if (collectionData?.contracts?.length > 0) {
          setContractAddress(collectionData.contracts[0].address);
        } else {
          setContractAddress("");
        }
      } catch (error) {
        console.error("Error fetching NFT data:", error);
        setError("Failed to fetch NFT Collection data. Please try again later.");
      }
    };

    fetchData();
  }, [collectionSlug]);

  useEffect(() => {
    if (!collectionSlug) return;
    const fetchData = async () => {
      try {
        const [collectionStatsData, collectionTopBidData, collectionTraitsData, collectionListingsData] = await Promise.all([
          nftCollectionStatsGetter(collectionSlug),
          nftCollectionTopBidGetter(collectionSlug),
          nftCollectionTraitsGetter(collectionSlug),
          nftCollectionListingsGetter(collectionSlug, contractAddress, "50", OrderType.BUY_NOW),
        ]);

        setCollectionStats(collectionStatsData);
        setCollectionTopBid(collectionTopBidData);
        setCollectionTraits(collectionTraitsData);
        setCollectionListings(collectionListingsData);

        setError(null);
      } catch (error) {
        console.error("Error fetching NFT data:", error);
        setError("Failed to fetch NFT Collection data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [collectionSlug, contractAddress]);

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
      <div className="flex flex-1 h-[calc(100dvh-149px)]">
        <Main
          collectionSlug={collectionSlug}
          collectionTraits={collectionTraits}
          collectionListings={collectionListings}
          error={error}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default Collection;
