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
    <main className="flex justify-between flex-row flex-1 font-jockey overflow-x-auto h-[calc(100dvh-149px)]">
      {/* STATUS & TRAITS  */}
      <LeftPanel collectionTraits={collectionTraits} error={error} isLoading={isLoading} />
      {/* LISTINGS  */}
      <div className="flex flex-1 overflow-x-auto">
        <Listings collectionSlug={collectionSlug} collectionListings={collectionListings} />
      </div>
      {/* ACTIVITY  */}
      <div className="min-w-[350px] w-1/5 bg-yellow-400">ACTIVITY</div>
    </main>
  ) : (
    <Listings collectionSlug={collectionSlug} collectionListings={collectionListings} />
  );
};

export default Main;
