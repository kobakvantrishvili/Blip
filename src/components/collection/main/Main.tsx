import React from "react";

import { CollectionTraits, NftListing } from "@/services/models/types";
import Listings from "@/components/collection/main/listings/Listings";
import LeftPanel from "@/components/collection/main/leftPanel/LeftPanel";
import useMediaQuery from "@/hooks/useMediaQuery";

type MainProps = {
  collectionSlug: string;
  collectionTraits: CollectionTraits | null;
  collectionListings: NftListing[] | null;
  error: string | null;
  isLoading: boolean;
};

const Main: React.FC<MainProps> = ({ collectionSlug, collectionTraits, collectionListings, error, isLoading }) => {
  const isAboveLargeScreens = useMediaQuery("(min-width: 1024px)");

  return isAboveLargeScreens ? (
    <main className="flex justify-between flex-row flex-1 font-jockey overflow-x-auto h-full">
      {/* STATUS & TRAITS  */}
      <LeftPanel collectionTraits={collectionTraits} error={error} isLoading={isLoading} />
      {/* LISTINGS  */}
      <div className="flex flex-1 overflow-x-auto">
        <Listings collectionSlug={collectionSlug} collectionListings={collectionListings} isLoading={isLoading} />
      </div>
      {/* ACTIVITY  */}
      <div className="min-w-[350px] w-1/50 border-l border-dark-border">
        <div className={`px-3 py-6`}>
          <div className="flex flex-col gap-3 px-3">
            <h2 className="text-sm tracking-widest">ACTIVITY</h2>
            <div className="flex flex-col gap-1"></div>
          </div>
        </div>
      </div>
    </main>
  ) : (
    <Listings collectionSlug={collectionSlug} collectionListings={collectionListings} isLoading={isLoading} />
  );
};

export default Main;
