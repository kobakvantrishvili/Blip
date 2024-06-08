"use client";

import { useEffect, useState } from "react";
import { BsCopy, BsTwitterX, BsInstagram, BsDiscord } from "react-icons/bs";
import { MdOutlineWebAsset } from "react-icons/md";
import { FiCheck } from "react-icons/fi";
import Link from "@/components/shared/Link";
import { handleCopy } from "@/utils/handleCopy";
import Button from "@/components/shared/Button";
import openseaClient from "@/services/openseaClient";
import { NftCollection, NftCollectionStats } from "@/services/models/types";

const About = () => {
  const [collection, setCollection] = useState<NftCollection | null>(null);
  const [collectionStats, setCollectionStats] = useState<NftCollectionStats | null>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    fetchNftCollection();
    fetchNftCollectionStats();

    const unsubscribeItemListed = openseaClient.onItemListed(
      "pudgypenguins",
      async () => await fetchNftCollectionStats()
    );
    const unsubscribeItemSold = openseaClient.onItemSold("pudgypenguins", async () => await fetchNftCollectionStats());
    const unsubscribeCollectionOffer = openseaClient.onCollectionOffer(
      "pudgypenguins",
      async () => await fetchNftCollectionStats()
    );

    return () => {
      unsubscribeItemListed();
      unsubscribeItemSold();
      unsubscribeCollectionOffer();
    };
  }, []);

  const fetchNftCollection = async () => {
    try {
      const response = await fetch("/api/getNftCollection?collectionSlug=pudgypenguins");
      const data: NftCollection = await response.json();
      setCollection(data);
    } catch (error) {
      console.error("Error fetching NFT collection data:", error);
    }
  };

  const fetchNftCollectionStats = async () => {
    try {
      const response = await fetch("/api/getNftCollectionStats?collectionSlug=pudgypenguins");
      const data: NftCollectionStats = await response.json();
      setCollectionStats(data);
    } catch (error) {
      console.error("Error fetching NFT collection stats data:", error);
    }
  };

  return (
    <div className={`flex items-center mt-16 top-16 px-6 border-b border-dark-border h-[84px] w-full`}>
      {/* TITLE LAYOUT */}
      <div className={`flex items-center justify-start gap-4`}>
        {collection?.image_url && (
          <img src={collection?.image_url} alt="NFT Collection" className="w-14 h-14 rounded-full" />
        )}
        <div className={`flex flex-col gap-2`}>
          <p className={`text-2xl font-jockey tracking-widest`}>{collection?.name}</p>
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
            <Link
              target="_blank"
              href={`https://twitter.com/${collection?.twitter_username}`}
              className={`text-text-secondary  hover:text-text-primary text-l`}
            >
              <BsTwitterX />
            </Link>
            <Link
              target="_blank"
              href={`https://www.instagram.com/${collection?.instagram_username}`}
              className={`text-text-secondary  hover:text-text-primary text-l`}
            >
              <BsInstagram />
            </Link>
            <Link
              target="_blank"
              href={`${collection?.discord_url}`}
              className={`text-text-secondary  hover:text-text-primary text-l`}
            >
              <BsDiscord />
            </Link>
            <Link
              target="_blank"
              href={`${collection?.project_url}`}
              className={`text-text-secondary  hover:text-text-primary text-l`}
            >
              <MdOutlineWebAsset />
            </Link>
          </div>
        </div>
      </div>
      {/* STATS LAYOUT */}
      <div className={`flex items-center justify-end flex-1`}>
        <div className={`flex flex-col justify-center`}>
          <p className={`text-base font-jockey text-text-secondary`}>FLOOR PRICE</p>
          <div className={`text-lg font-jockey text-text-primary`}>{collectionStats?.total.floor_price} eth</div>
        </div>
      </div>
    </div>
  );
};

export default About;
