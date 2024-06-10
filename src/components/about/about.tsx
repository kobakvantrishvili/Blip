"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { BsCopy, BsTwitterX, BsInstagram, BsDiscord, BsGlobe2 } from "react-icons/bs";
import { FiCheck } from "react-icons/fi";
import { LiaEthereum } from "react-icons/lia";

import Link from "@/components/shared/Link";
import { handleCopy } from "@/utils/handleCopy";
import Button from "@/components/shared/Button";
import { openseaClient } from "@/services/openseaClient";
import { NftCollection, NftCollectionStats } from "@/services/models/types";
import Stat from "@/components/about/Stat";

const About = () => {
  const [collection, setCollection] = useState<NftCollection | null>(null);
  const [collectionStats, setCollectionStats] = useState<NftCollectionStats | null>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  var collectionSlug: string = "pudgypenguins";
  var floorPrice = collectionStats?.total.floor_price ?? "-";
  var topBid: any = "-";
  var oneDayVolume = collectionStats?.intervals?.find((x) => x.interval === "one_day")?.volume ?? "-";
  var sevenDayVolume = collectionStats?.intervals?.find((x) => x.interval === "seven_day")?.volume ?? "-";
  var totalVolume = collectionStats?.total.volume ?? "-";
  var owners = collectionStats?.total?.num_owners ?? 0;
  var royalty = collection?.fees?.find((x) => x.required == true)?.fee ?? "-";
  var totalSupply = collection?.total_supply ?? 0;
  var ownershipPercentage = Math.round((totalSupply != 0 ? owners / totalSupply : 0) * 100);

  useEffect(() => {
    fetchNftCollection();
    fetchNftCollectionStats();

    const unsubscribeItemListed = openseaClient?.onItemListed(collectionSlug, async () => await fetchNftCollectionStats());
    const unsubscribeItemSold = openseaClient?.onItemSold(collectionSlug, async () => await fetchNftCollectionStats());
    //const unsubscribeCollectionOffer = openseaClient?.onCollectionOffer(collectionSlug, async () => await fetchNftCollectionStats());

    return () => {
      unsubscribeItemListed?.();
      unsubscribeItemSold?.();
      //unsubscribeCollectionOffer?.();
    };
  }, [collectionSlug, openseaClient]);

  const fetchNftCollection = async () => {
    try {
      const response = await fetch(`/api/getNftCollection?collectionSlug=${collectionSlug}`);
      const data: NftCollection = await response.json();
      setCollection(data);
    } catch (error) {
      console.error("Error fetching NFT collection data:", error);
    }
  };

  const fetchNftCollectionStats = async () => {
    try {
      const response = await fetch(`/api/getNftCollectionStats?collectionSlug=${collectionSlug}`);
      const data: NftCollectionStats = await response.json();
      setCollectionStats(data);
    } catch (error) {
      console.error("Error fetching NFT collection stats data:", error);
    }
  };

  return (
    <div className={`flex items-center mt-16 top-16 px-6 border-b border-dark-border h-[84px] w-full gap-2 font-jockey`}>
      {/* TITLE LAYOUT */}
      <div className={`flex w-1/4 items-center justify-start gap-4`}>
        <Image
          src={collection?.image_url || "/default-image.jpg"}
          alt={`NFT Collection ${collection?.name}'s Image`}
          width={56}
          height={56}
          className="w-14 h-14 rounded-full object-cover"
        />
        <div className={`flex flex-col gap-2 w-3/4`}>
          <p className={`text-2xl tracking-widest overflow-hidden whitespace-nowrap overflow-ellipsis`}>{collection?.name}</p>
          <div className={`flex flex-row flex-start gap-[10px]`}>
            <Button
              onClick={() =>
                handleCopy({
                  address: collection?.contracts[0].address,
                  setIsCopied,
                  setIsDisabled: setIsButtonDisabled,
                })
              }
              className={`text-text-secondary  hover:text-text-primary text-l ${isButtonDisabled && "disabled-class"}`}
            >
              {isCopied ? <FiCheck /> : <BsCopy />}
            </Button>
            {collection?.twitter_username && (
              <Link
                target="_blank"
                href={`https://twitter.com/${collection?.twitter_username}`}
                className={`text-text-secondary  hover:text-text-primary text-l`}
              >
                <BsTwitterX />
              </Link>
            )}
            {collection?.instagram_username && (
              <Link
                target="_blank"
                href={`https://www.instagram.com/${collection?.instagram_username}`}
                className={`text-text-secondary  hover:text-text-primary text-l`}
              >
                <BsInstagram />
              </Link>
            )}
            {collection?.discord_url && (
              <Link target="_blank" href={`${collection?.discord_url}`} className={`text-text-secondary  hover:text-text-primary text-l`}>
                <BsDiscord />
              </Link>
            )}
            {collection?.project_url && (
              <Link target="_blank" href={`${collection?.project_url}`} className={`text-text-secondary  hover:text-text-primary text-l`}>
                <BsGlobe2 />
              </Link>
            )}
          </div>
        </div>
      </div>
      {/* STATS LAYOUT */}
      <div className={`flex flex-1 items-center justify-end`}>
        <Stat name="FLOOR PRICE" stat={floorPrice.toLocaleString(undefined, { maximumFractionDigits: 2 })} icon={LiaEthereum} />
        <Stat name="TOP BID" stat={topBid.toLocaleString(undefined, { maximumFractionDigits: 2 })} icon={LiaEthereum} />
        <Stat name={`1D CHANGE`} stat="-%" />
        <Stat name={`7D CHANGE`} stat="-%" />
        <Stat name={`1D VOLUME`} stat={oneDayVolume.toLocaleString(undefined, { maximumFractionDigits: 2 })} icon={LiaEthereum} />
        <Stat name={`7D VOLUME`} stat={sevenDayVolume.toLocaleString(undefined, { maximumFractionDigits: 2 })} icon={LiaEthereum} />
        <Stat name="TOTAL VOLUME" stat={totalVolume.toLocaleString(undefined, { maximumFractionDigits: 2 })} icon={LiaEthereum} />
        <Stat name="OWNERS" stat={`${owners}${"\u00A0".repeat(2)}(${ownershipPercentage}%)`} />
        <Stat name="SUPPLY" stat={totalSupply.toLocaleString(undefined, { maximumFractionDigits: 2 })} />
        <Stat name="ROYALTY" stat={`${royalty}%`} />
      </div>
    </div>
  );
};

export default About;
