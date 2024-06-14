"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { BsCopy, BsTwitterX, BsInstagram, BsDiscord, BsGlobe2 } from "react-icons/bs";
import { FaSailboat } from "react-icons/fa6";
import { FiCheck } from "react-icons/fi";
import { LiaEthereum } from "react-icons/lia";

import { handleCopy } from "@/utils/handleCopy";
import { NftCollection, NftCollectionStats } from "@/services/models/types";
import Link from "@/components/shared/Link";
import Button from "@/components/shared/Button";
import Stat from "@/components/about/Stat";
import { openseaClient } from "@/client/openseaClient";

const About = () => {
  const [collection, setCollection] = useState<NftCollection | null>(null);
  const [collectionStats, setCollectionStats] = useState<NftCollectionStats | null>(null);
  const [collectionTopBid, setCollectionTopBid] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const collectionSlug = "lilpudgys";

  const floorPrice = collectionStats?.total?.floor_price_symbol === "ETH" ? collectionStats?.total?.floor_price : undefined;
  const topBid = collectionTopBid;
  const oneDayVolume = collectionStats?.intervals?.find((x) => x.interval === "one_day")?.volume;
  const sevenDayVolume = collectionStats?.intervals?.find((x) => x.interval === "seven_day")?.volume;
  const oneDayVolumeChange = (collectionStats?.intervals?.find((x) => x.interval === "one_day")?.volume_change ?? 0) * 100;
  const sevenDayVolumeChange = (collectionStats?.intervals?.find((x) => x.interval === "seven_day")?.volume_change ?? 0) * 100;
  const totalVolume = collectionStats?.total.volume;
  const royalty = collection?.fees?.find((x) => x.required)?.fee;
  const owners = collectionStats?.total?.num_owners ?? 0;
  const totalSupply = collection?.total_supply ?? 0;
  const ownershipPercentage = Math.round((totalSupply !== 0 ? owners / totalSupply : 0) * 100);

  const fetchNftCollectionData = useCallback(async () => {
    try {
      const [collectionData, collectionStatsData, collectionTopBid] = await Promise.all([
        fetchNftCollection(),
        fetchNftCollectionStats(),
        fetchNftCollectionTopBid(),
      ]);
      setCollection(collectionData);
      setCollectionStats(collectionStatsData);
      setCollectionTopBid(collectionTopBid);

      setError(null);
    } catch (error) {
      console.error("Error fetching NFT data:", error);
      setError("Failed to fetch NFT Collection data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchNftCollection = async (): Promise<NftCollection> => {
    const response = await fetch(`/api/getNftCollection?collectionSlug=${collectionSlug}`);
    if (!response.ok) {
      throw new Error("Failed to fetch collection data");
    }
    const data: NftCollection = await response.json();
    console.log(`Retrieved Collection Info at ${new Date()}`);
    return data;
  };

  const fetchNftCollectionStats = async (): Promise<NftCollectionStats> => {
    const response = await fetch(`/api/getNftCollectionStats?collectionSlug=${collectionSlug}`);
    if (!response.ok) {
      throw new Error("Failed to fetch collection stats");
    }
    const data: NftCollectionStats = await response.json();
    console.log(`Retrieved Collection Stats at ${new Date()}`);
    return data;
  };

  const fetchNftCollectionTopBid = async (): Promise<number> => {
    const response = await fetch(`/api/getNftCollectionTopBid?collectionSlug=${collectionSlug}`);
    if (!response.ok) {
      throw new Error("Failed to fetch collection top bid");
    }
    const data: number = await response.json();
    console.log(`Retrieved Collection Top Bid at ${new Date()}`);
    return data;
  };

  useEffect(() => {
    fetchNftCollectionData();
    let debounceTimer: NodeJS.Timeout | null = null;

    const handleItemListed = async () => {
      console.log("Item listed");
      await fetchNftCollectionStats().then(setCollectionStats);
    };

    const handleItemSold = async () => {
      console.log("Item sold");
      await fetchNftCollectionStats().then(setCollectionStats);
    };

    const handleCollectionOfferMade = async () => {
      console.log("Collection offer made");
      if (debounceTimer) return;
      await fetchNftCollectionTopBid().then(setCollectionTopBid);

      debounceTimer = setTimeout(async () => {
        debounceTimer = null;
      }, 10000);
    };

    const unsubscribeItemSold = openseaClient?.onItemSold(collectionSlug, handleItemSold);
    const unsubscribeItemListed = openseaClient?.onItemListed(collectionSlug, handleItemListed);
    const unsubscribeCollectionOffer = openseaClient?.onCollectionOffer(collectionSlug, () =>
      debounceTimer === null ? handleCollectionOfferMade() : () => {}
    );

    return () => {
      unsubscribeItemSold?.();
      unsubscribeItemListed?.();
      unsubscribeCollectionOffer?.();
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [collectionSlug, fetchNftCollectionData]);

  const getVolumeChangeColor = (volumeChange: number): string => {
    if (volumeChange > 0) {
      return "text-shadow-custom text-highlight-green";
    } else if (volumeChange < 0) {
      return "text-shadow-custom text-highlight-red";
    } else {
      return "text-text-primary";
    }
  };

  return (
    <div className="mt-16 border-b border-dark-border">
      {!error && (
        <div className="flex items-center gap-2 px-6 h-[84px] w-full font-jockey">
          <div className={`flex 2xl:w-1/4 w-1/5 items-center justify-start gap-4 ${isLoading ? "blur" : ""}`}>
            <Image
              src={collection?.image_url || "/default-image.jpg"}
              alt={`NFT Collection ${collection?.name}'s Image`}
              width={56}
              height={56}
              className="w-14 h-14 rounded-full object-cover"
            />
            <div className="flex flex-col gap-2 w-3/4">
              <p className="text-2xl tracking-widest overflow-hidden whitespace-nowrap overflow-ellipsis">{collection?.name ?? "Collection Name"}</p>
              <div className="flex flex-row flex-start gap-[10px]">
                <Button
                  onClick={() =>
                    handleCopy({
                      address: collection?.contracts[0].address,
                      setIsCopied,
                      setIsDisabled: setIsButtonDisabled,
                    })
                  }
                  className={`text-text-secondary hover:text-text-primary text-l ${isButtonDisabled && "disabled-class"}`}
                >
                  {isCopied ? <FiCheck /> : <BsCopy />}
                </Button>
                {collection?.twitter_username && (
                  <Link
                    target="_blank"
                    href={`https://twitter.com/${collection?.twitter_username}`}
                    className="text-text-secondary hover:text-text-primary text-l"
                  >
                    <BsTwitterX />
                  </Link>
                )}
                {collection?.instagram_username && (
                  <Link
                    target="_blank"
                    href={`https://www.instagram.com/${collection?.instagram_username}`}
                    className="text-text-secondary hover:text-text-primary text-l"
                  >
                    <BsInstagram />
                  </Link>
                )}
                {collection?.discord_url && (
                  <Link target="_blank" href={`${collection?.discord_url}`} className="text-text-secondary hover:text-text-primary text-l">
                    <BsDiscord />
                  </Link>
                )}
                {collection?.project_url && (
                  <Link target="_blank" href={`${collection?.project_url}`} className="text-text-secondary hover:text-text-primary text-l">
                    <BsGlobe2 />
                  </Link>
                )}
                {collection?.opensea_url && (
                  <Link target="_blank" href={`${collection?.opensea_url}`} className="text-text-secondary hover:text-text-primary text-l">
                    <FaSailboat />
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className={`flex flex-1 items-center justify-end ${isLoading ? "blur" : ""}`}>
            <Stat name="FLOOR PRICE" icon={LiaEthereum}>
              {floorPrice?.toLocaleString(undefined, { maximumFractionDigits: 4 })}
            </Stat>
            <Stat name="TOP BID" icon={LiaEthereum}>
              {topBid?.toLocaleString(undefined, { maximumFractionDigits: 4 })}
            </Stat>
            <Stat name="1D CHANGE" className={`${getVolumeChangeColor(oneDayVolumeChange)}`}>
              {`${oneDayVolumeChange.toLocaleString(undefined, { maximumFractionDigits: 2 })}%`}
            </Stat>
            <Stat name="7D CHANGE" className={`${getVolumeChangeColor(sevenDayVolumeChange)}`}>
              {`${sevenDayVolumeChange.toLocaleString(undefined, { maximumFractionDigits: 2 })}%`}
            </Stat>
            <Stat name="1D VOLUME" icon={LiaEthereum}>
              {oneDayVolume?.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </Stat>
            <Stat name="7D VOLUME" icon={LiaEthereum}>
              {sevenDayVolume?.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </Stat>
            <Stat name="TOTAL VOLUME" icon={LiaEthereum}>
              {totalVolume?.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </Stat>
            <Stat name="OWNERS">{`${owners.toLocaleString()}${"\u00A0".repeat(2)}(${ownershipPercentage}%)`}</Stat>
            <Stat name="SUPPLY">{totalSupply.toLocaleString()}</Stat>
            <Stat name="ROYALTY">{`${royalty ?? "-"}%`}</Stat>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
