"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { BsCopy, BsTwitterX, BsInstagram, BsDiscord, BsGlobe2 } from "react-icons/bs";
import { FaSailboat } from "react-icons/fa6";
import { FiCheck } from "react-icons/fi";
import { LiaEthereum } from "react-icons/lia";
import { MdOutlineQueryStats, MdFilterList } from "react-icons/md";

import { handleCopy } from "@/utils/handleCopy";
import { NftCollection, NftCollectionStats } from "@/services/models/types";
import Link from "@/components/shared/Link";
import Button from "@/components/shared/Button";
import Stat from "@/components/about/Stat";
import useNftCollectionStats from "@/hooks/useNftCollectionStats";
import useNftCollection from "@/hooks/useNftCollection";
import useNftCollectionTopBid from "@/hooks/useNftCollectionTopBid";
import useMediaQuery from "@/hooks/useMediaQuery";
import OpenSeaClient from "@/client/openseaClient";

const About = () => {
  const [collection, setCollection] = useState<NftCollection | null>(null);
  const [collectionStats, setCollectionStats] = useState<NftCollectionStats | null>(null);
  const [collectionTopBid, setCollectionTopBid] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const collectionSlug = "momoguro-holoself";

  const floorPrice = collectionStats?.total?.floor_price_symbol === "ETH" ? collectionStats?.total?.floor_price : undefined;
  const topBid = collectionTopBid;
  const oneDayVolume = collectionStats?.intervals?.find((x) => x.interval === "one_day")?.volume;
  const sevenDayVolume = collectionStats?.intervals?.find((x) => x.interval === "seven_day")?.volume;
  const oneDayVolumeChange = collectionStats?.intervals?.find((x) => x.interval === "one_day")?.volume_change;
  const sevenDayVolumeChange = collectionStats?.intervals?.find((x) => x.interval === "seven_day")?.volume_change;
  const oneDayVolumeChangePrecent = oneDayVolumeChange ? oneDayVolumeChange * 100 : undefined;
  const sevenDayVolumeChangePrecent = sevenDayVolumeChange ? sevenDayVolumeChange * 100 : undefined;
  const totalVolume = collectionStats?.total.volume;
  const royalty = collection?.fees?.find((x) => x.required)?.fee;
  const owners = collectionStats?.total?.num_owners;
  const totalSupply = collection?.total_supply;
  const ownershipPercentage = totalSupply && owners ? Math.round((owners / totalSupply) * 100) : undefined;

  const isAboveLargeScreens = useMediaQuery("(min-width: 1024px)");

  const fetchNftCollectionData = useCallback(async () => {
    try {
      const [collectionData, collectionStatsData, collectionTopBid] = await Promise.all([
        useNftCollection(collectionSlug),
        useNftCollectionStats(collectionSlug),
        useNftCollectionTopBid(collectionSlug),
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

  useEffect(() => {
    fetchNftCollectionData();
    const openSeaClient = new OpenSeaClient({ collectionSlug });
    let debounceTimer: NodeJS.Timeout | null = null;

    const handleItemListed = async () => {
      await useNftCollectionStats(collectionSlug).then(setCollectionStats);
    };

    const handleItemSold = async () => {
      await useNftCollectionStats(collectionSlug).then(setCollectionStats);
    };

    const handleCollectionOffer = async () => {
      if (debounceTimer) return;
      await useNftCollectionTopBid(collectionSlug).then(setCollectionTopBid);

      debounceTimer = setTimeout(async () => {
        debounceTimer = null;
      }, 10000);
    };

    openSeaClient.subscribe("item_listed", handleItemListed);
    openSeaClient.subscribe("item_sold", handleItemSold);
    openSeaClient.subscribe("collection_offer", () => (debounceTimer === null ? handleCollectionOffer() : () => {}));
    openSeaClient.connect();

    return () => {
      openSeaClient.unsubscribe("item_listed");
      openSeaClient.unsubscribe("item_sold");
      openSeaClient.unsubscribe("collection_offer");

      openSeaClient.disconnect();

      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [collectionSlug, fetchNftCollectionData]);

  const getVolumeChangeColor = (volumeChange: number | undefined): string => {
    if (volumeChange) {
      if (volumeChange > 0) {
        return "text-shadow-custom text-highlight-green";
      } else if (volumeChange < 0) {
        return "text-shadow-custom text-highlight-red";
      } else {
        return "text-text-primary";
      }
    }
    return "text-text-primary";
  };

  return (
    <div className="mt-16 border-b border-dark-border">
      {!error && (
        <div className="flex justify-between items-center gap-4 px-6 h-[84px] w-full font-jockey">
          <div className={`flex w-auto lg:w-1/5 items-center justify-start gap-4 ${isLoading ? "blur" : ""}`}>
            <Image
              src={collection?.image_url || "/default-image.jpg"}
              alt={`NFT Collection ${collection?.name}'s Image`}
              width={56}
              height={56}
              className="w-14 h-14 rounded-full object-cover"
            />
            <div className="flex flex-col justify-center gap-2 w-3/4 h-auto relative bottom-1">
              <p className="text-2xl tracking-widest overflow-hidden whitespace-nowrap overflow-ellipsis">
                {collection?.name ?? "Collection Name"}
              </p>
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
          {isAboveLargeScreens ? (
            <div className={`flex flex-1 items-center justify-end gap-2 ${isLoading ? "blur" : ""}`}>
              <Stat name="FLOOR PRICE" value={floorPrice?.toLocaleString(undefined, { maximumFractionDigits: 4 })} icon={LiaEthereum} />
              <Stat name="TOP BID" value={topBid?.toLocaleString(undefined, { maximumFractionDigits: 4 })} icon={LiaEthereum} />
              <Stat
                name="1D CHANGE"
                value={oneDayVolumeChangePrecent?.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                suffix="%"
                className={`${getVolumeChangeColor(oneDayVolumeChangePrecent)}`}
              />
              <Stat
                name="7D CHANGE"
                value={sevenDayVolumeChangePrecent?.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                suffix="%"
                className={`${getVolumeChangeColor(sevenDayVolumeChangePrecent)}`}
              />
              <Stat name="1D VOLUME" value={oneDayVolume?.toLocaleString(undefined, { maximumFractionDigits: 2 })} icon={LiaEthereum} />
              <Stat name="7D VOLUME" value={sevenDayVolume?.toLocaleString(undefined, { maximumFractionDigits: 2 })} icon={LiaEthereum} />
              <Stat name="TOTAL VOLUME" value={totalVolume?.toLocaleString(undefined, { maximumFractionDigits: 2 })} icon={LiaEthereum} />
              <Stat name="OWNERS" value={owners?.toLocaleString()} suffix={`${"\u00A0".repeat(2)}(${ownershipPercentage}%)`} />
              <Stat name="SUPPLY" value={totalSupply?.toLocaleString()} />
              <Stat name="ROYALTY" value={royalty?.toLocaleString()} suffix="%" />
            </div>
          ) : (
            <div className={`flex flex-1 items-center justify-end gap-2 ${isLoading ? "blur" : ""}`}>
              <Button className="border p-1 text-text-secondary border-dark-border hover:text-text-primary hover:border-text-primary">
                <MdFilterList className=" text-2xl" />
              </Button>
              <Button className="border p-1 text-text-secondary border-dark-border hover:text-text-primary hover:border-text-primary">
                <MdOutlineQueryStats className=" text-2xl" />
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default About;
