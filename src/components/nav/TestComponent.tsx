import React, { useEffect } from "react";

const TestComponent = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getNftListings?collectionSlug=pudgypenguins&orderType=0");
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="absolute top-40">Fetching NFT Listings...</h1>
      {/* Add any UI elements or components if needed */}
    </div>
  );
};

export default TestComponent;
