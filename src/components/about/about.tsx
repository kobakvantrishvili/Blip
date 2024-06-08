"use client";

import { useEffect, useState } from "react";
import { BsCopy, BsTwitterX, BsInstagram, BsDiscord } from "react-icons/bs";
import { MdOutlineWebAsset } from "react-icons/md";
import { FiCheck } from "react-icons/fi";
import Link from "@/components/shared/Link";
import { handleCopy } from "@/utils/handleCopy";
import DropdownMenuItem from "@/components/shared/dropDownMenu/DropDownMenuItem";
import Button from "@/components/shared/Button";

type NftCollection = {
  image_url: string;
  name: string;
  contracts: { address: string }[];
  twitter_username: string;
  instagram_username: string;
  discord_url: string;
  project_url: string;
};

const About = () => {
  const [data, setData] = useState<NftCollection | null>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const fetchNftCollection = async () => {
      try {
        const response = await fetch("/api/getNftCollection?collectionSlug=pudgypenguins");
        const data: NftCollection = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching NFT collection data:", error);
      }
    };

    fetchNftCollection();
  }, []);

  return (
    <div className={`flex items-center mt-16 top-16 px-6 border-b border-dark-border h-[84px] w-full`}>
      {/* TITLE LAYOUT */}
      <div className={`flex items-center justify-start gap-4`}>
        {data?.image_url && <img src={data?.image_url} alt="NFT Collection" className="w-14 h-14 rounded-full" />}
        <div className={`flex flex-col gap-2`}>
          <p className={`text-2xl font-jockey tracking-widest`}>{data?.name}</p>
          <div className={`flex flex-row flex-start gap-[10px]`}>
            <Button
              onClick={() =>
                handleCopy({ address: data?.contracts[0].address, setIsCopied, setIsDisabled: setIsButtonDisabled })
              }
              className={`text-text-secondary  hover:text-text-primary text-l ${isButtonDisabled && "disabled-class"}`}
            >
              {isCopied ? <FiCheck /> : <BsCopy />}
            </Button>
            <Link
              target="_blank"
              href={`https://twitter.com/${data?.twitter_username}`}
              className={`text-text-secondary  hover:text-text-primary text-l`}
            >
              <BsTwitterX />
            </Link>
            <Link
              target="_blank"
              href={`https://www.instagram.com/${data?.instagram_username}`}
              className={`text-text-secondary  hover:text-text-primary text-l`}
            >
              <BsInstagram />
            </Link>
            <Link
              target="_blank"
              href={`${data?.discord_url}`}
              className={`text-text-secondary  hover:text-text-primary text-l`}
            >
              <BsDiscord />
            </Link>
            <Link
              target="_blank"
              href={`${data?.project_url}`}
              className={`text-text-secondary  hover:text-text-primary text-l`}
            >
              <MdOutlineWebAsset />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
