import React from "react";

import { CollectionTraits } from "@/services/models/types";
import Listings from "@/components/collection/main/listings/Listings";
import LeftPanel from "@/components/collection/main/leftPanel/LeftPanel";

type MainProps = {
  collectionSlug: string;
  collectionTraits: CollectionTraits | null;
  error: string | null;
  isLoading: boolean;
};

const Main: React.FC<MainProps> = ({ collectionSlug, collectionTraits, error, isLoading }) => {
  return (
    <main className="flex justify-between flex-row flex-1 font-jockey h-[calc(100dvh-149px)]">
      {/* STATUS & TRAITS  */}
      <LeftPanel collectionTraits={collectionTraits} error={error} isLoading={isLoading} />
      {/* LISTINGS  */}
      <Listings />
      {/* ACTIVITY  */}
      <div className="max-w-[400px] 2xl:max-w-[420px] min-w-[350px] flex-1 bg-yellow-400 flex-shrink">ACTIVITY</div>
    </main>
  );
};

export default Main;
