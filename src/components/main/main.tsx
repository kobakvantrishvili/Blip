"use client";

import Parameters from "@/components/main/parameters/Parameters";

const Main = () => {
  return (
    <main className="flex justify-between flex-row flex-1 font-jockey h-[calc(100dvh-149px)]">
      {/* TRAITS  */}
      <Parameters />
      {/* LISTINGS  */}
      <div className="flex-1 bg-orange-400">LISTINGS</div>
      {/* ACTIVITY  */}
      <div className="max-w-[390px] 2xl:max-w-[420px] min-w-[350px] flex-1 bg-yellow-400 flex-shrink">ACTIVITY</div>
    </main>
  );
};

export default Main;
